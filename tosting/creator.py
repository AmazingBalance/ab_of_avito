from sqlite3 import connect

with connect("db/ddos_me.db") as cn:
    c = cn.cursor()
    c.execute(
        "CREATE TABLE IF NOT EXISTS data (category integer, location integer, price real)")
    cn.commit()


with connect("db/ddos_me.db") as cn:
    c = cn.cursor()
    for i in range(10):
        c.execute("INSERT INTO data VALUES (:category, :location, :price)", {
            "category": 102,
            "location": 20 + i,
            "price": 10.99 * (i + 1)
        })

    cn.commit()

with connect("db/ddos_me.db") as cn:
    c = cn.cursor()
    c.execute("SELECT *, oid FROM data")
    r = c.fetchall()
    print(r)

    cn.commit()
