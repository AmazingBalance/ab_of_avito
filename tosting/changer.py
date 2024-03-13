from datetime import datetime
from sqlite3 import connect
from random import randint
from time import sleep


def insert_new():
    with connect("db/ddos_me.db") as con:
        cur = con.cursor()

        cur.execute("INSERT INTO data VALUES (:category, :location, :price)", {
            "category": 102,
            "location": 40,
            "price": 192.99,
        })
        con.commit()


def update_old():
    with connect("db/ddos_me.db") as con:
        cur = con.cursor()

        n = randint(0, 9) + 20

        cur.execute(f"UPDATE data SET price = :pri WHERE category=102 AND location={n}", {
            "pri": 69.69 * randint(1, 9),
        })

        con.commit()


while 1:
    sleep(0.005)

    try:
        update_old()
    except Exception as e:
        i = 0
        with open("logging_ddos_ch.txt", "a+") as file:
            file.write(str(datetime.now()) + " [ERROR]: " + e)
