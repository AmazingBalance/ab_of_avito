#import
import psycopg2
import random
import string

#connection to DB
def create_connection(db_name, db_user, db_password, db_host, db_port):
    connection = None
    try:
        connection = psycopg2.connect(
            database=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
        )
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return connection



"""def create_database(connection, query):
    connection.autocommit = True
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Query executed successfully")
    except OperationalError as e:
        print(f"The error '{e}' occurred")

create_database_query = "CREATE DATABASE shmel_base"
create_database(connection, create_database_query)""" #creating DB



#connection to shmel_base
connection = create_connection(
    "название бд", "postgres", "пароль", "127.0.0.1", "5432"
)


#create and delete DB/ Male notes
def execute_query(connection, query):
    connection.autocommit = True
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Query executed successfully")
    except OperationalError as e:
        print(f"The error '{e}' occurred")




#reading 
def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except OperationalError as e:
        print(f"The error '{e}' occurred")



#key generarion
def key_generate():
    v = []
    numb = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    pas_min = 5
    pas_max = 15
    for i in range(pas_min, pas_max):
        v.append(i) #count letters
    count = random.choice(v)
    password = ""
    for i in range(count):
        password = password + str(random.choice(string.ascii_lowercase))
    for i in range(20 - count):
        password = password + str(random.choice(numb))
    return password



#generation pass
def pass_generate():
    v = []
    numb = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    spetz = ["!", "@", "$", ";", "%", "^", ":", "&", "*", "(", ")", "-", "+", "?", "_", "+",]
    pas_min = 15
    pas_max = 25
    for i in range(pas_min, pas_max):
        v.append(i)
    count = random.choice(v)
    q = 0
    password = ""
    for i in range(count):
        h = random.choice([1, 2, 3]) 
        if q > 5 and h == 3:
            h = random.choice([1, 2]) 
        if h == 1:
            password = password + str(random.choice(string.ascii_letters))
        if h == 2:
            password = password + str(random.choice(numb))
        if h == 3:
            password = password + str(random.choice(spetz))
            q = q + 1
    return password

   #for creating table      
create_users_table = """
CREATE TABLE IF NOT EXISTS shmel_table (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL, 
  pass TEXT NOT NULL
)
"""

execute_query(connection, create_users_table)


#for DELETE table
#create_users_table = """
#DROP TABLE shmel_table
#"""

#execute_query(connection, create_users_table)


#add
users = [
    (key_generate(), pass_generate()),
]


user_records = ", ".join(["%s"] * len(users))

insert_query = (
    f"INSERT INTO shmel_table (key, pass) VALUES {user_records}"
)

connection.autocommit = True
cursor = connection.cursor()
cursor.execute(insert_query, users)



#read
select_users = "SELECT * FROM shmel_table"
users = execute_read_query(connection, select_users)

for user in users:
    print(user)


#delete
#delete_comment = "DELETE FROM shmel_table WHERE id = 1"
#execute_query(connection, delete_comment)

