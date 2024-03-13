package modules

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// Matrix row; json ready
type Row struct {
	Category int     `json:"category"`
	Location int     `json:"location"`
	Price    float64 `json:"price"`
}

// The database with buffering
type DB struct {
	sql  *sql.DB
	stmt *sql.Stmt
	buf  []Row
}

// Create new row I suppose. :P
func NewRow(category int, location int, price float64) Row {
	return Row{
		Category: category,
		Location: location,
		Price:    price,
	}
}

// Prepare SQL spells to cast
const schemaMatrix string = "CREATE TABLE IF NOT EXISTS matrix (category INTEGER, location INTEGER, price REAL)"
const insertMatrix string = "INSERT INTO matrix (category, location, price) VALUES (?, ?, ?, ?)"
const selectorMatrix string = "SELECT * FROM matrix WHERE category=? AND location=?"

func Selector(dbFileName string, category int, location int) (Row, error) {
	var row Row

	db, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		return row, err
	}

	stmt, err := db.Prepare(selectorMatrix)
	if err != nil {
		log.Fatal("Error preparing statements for sql query.")
		return row, err
	}

	err = stmt.QueryRow(category, location).Scan(&row.Category, &row.Location, &row.Price)
	if err != nil {
		return row, err
	}

	return row, nil
}

// Create new SQLite DB; SQLite for testing
func NewDB(dbFileName string) (*DB, error) {
	sqlDB, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		return nil, err
	}

	if _, err = sqlDB.Exec(schemaMatrix); err != nil {
		return nil, err
	}

	stmt, err := sqlDB.Prepare(insertMatrix)
	if err != nil {
		// sql.ErrNoRows is handled not here
		return nil, err
	}

	db := DB{
		sql:  sqlDB,
		stmt: stmt,
		buf:  make([]Row, 0, 1024),
	}

	return &db, nil
}

// Add row to buffer or if buffer is near full add to database
func (db *DB) Add(row Row) error {
	if len(db.buf) == cap(db.buf) {
		return errors.New("Buffer overflow.")
	}

	db.buf = append(db.buf, row)
	if len(db.buf) == cap(db.buf) {
		if err := db.Flush(); err != nil {
			return fmt.Errorf("Unable to flush data: %s", err)
		}
	}

	return nil
}

// When buffer is close to ready - drop all data into database
func (db *DB) Flush() error {

	tx, err := db.sql.Begin()
	if err != nil {
		return err
	}

	for _, row := range db.buf {
		_, err := tx.Stmt(db.stmt).Exec(row.Category, row.Location, row.Price)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	db.buf = db.buf[:0]
	return tx.Commit()
}

// Close things
func (db *DB) Close() error {
	defer func() {
		db.stmt.Close()
		db.sql.Close()
	}()

	if err := db.Flush(); err != nil {
		return err
	}

	return nil
}
