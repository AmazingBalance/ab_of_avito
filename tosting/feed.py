from sqlite3 import connect
from random import randint

add = 5000

while add:
    with connect("db/ddos_me.db") as con:
        cur = con.cursor()

        cat = 100 + randint(3, 100)
        loc = randint(1, 99)
        pri = randint(0, 420) + randint(0, 420) / 100

        print("Adding: ", cat, loc, pri)

        cur.execute(
            f"UPDATE data SET price = :prc WHERE category={cat} AND location={loc}", {
                "prc": pri,
            })
        con.commit()

    add -= 1
