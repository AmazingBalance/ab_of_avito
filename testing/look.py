from sqlite3 import connect

with connect("db/ddos_me.db") as con:
    cur = con.cursor()
    cur.execute("SELECT * FROM data")
    print(len(cur.fetchall()))
    con.commit()
