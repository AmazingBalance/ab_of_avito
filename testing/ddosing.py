from sqlite3 import connect
from random import randint

from time import sleep
from datetime import datetime

i = 0
r = 0


def read(i):
    with connect("db/ddos_me.db") as cn:
        c = cn.cursor()

        n = 20 + randint(0, 9)
        c.execute(
            f"SELECT *,oid FROM data WHERE category=102 AND location={n}")
        r = c.fetchall()

        cn.commit()
    return i


while 1:
    sleep(0.001)

    try:
        i = read(i) + 1
        print(i)
    except Exception:
        i = 0
        r += 1
        with open("logging_ddos.txt", "w") as file:
            file.write(str(r))
