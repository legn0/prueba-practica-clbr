import sqlite3

conn = sqlite3.connect("database/Mercados.db")

crsr = conn.cursor()
# crsr.execute("""CREATE TABLE Product (
#              Name TEXT,
#              SKU TEXT,
#              Ean TEXT,
#              market_name TEXT
#              )""")
# crsr.execute("""CREATE TABLE Market(
#              Name TEXT
#              )""")
# crsr.execute("""CREATE TABLE Price (
#              normal_price INTEGER,
#              discount_price INTEGER,
#              active INTEGER,
#              create_date TEXT,
#              SKU TEXT
#              )""")

# crsr.execute("INSERT INTO Market VALUES ('Feria');")
# crsr.execute("INSERT INTO Market VALUES ('Supermercado');")

# crsr.execute("INSERT INTO Product VALUES ('Tomate', 'FER111', 'VER000', 'Feria')")
# crsr.execute("INSERT INTO Product VALUES ('Tomate', 'SUP111', 'VER000', 'Supermercado')")
# crsr.execute("INSERT INTO Product VALUES ('Empanada', 'FER211', 'FRT123', 'Feria')")
# crsr.execute("INSERT INTO Product VALUES ('iPhone', 'SUP211', 'TEC000', 'Supermercado')")
# crsr.execute("INSERT INTO Product VALUES ('Lechuga', 'FER122', 'VER011', 'Feria')")
# crsr.execute("INSERT INTO Product VALUES ('Lechuga', 'SUP122', 'VER011', 'Supermercado')")
# crsr.execute("INSERT INTO Product VALUES ('Reineta', 'FER311', 'PES000', 'Feria')")
# crsr.execute("INSERT INTO Product VALUES ('Reineta', 'SUP311', 'PES000', 'Supermercado')")
# crsr.execute("INSERT INTO Product VALUES ('Pan', 'FER411', 'MAS000', 'Spermercado')")

# crsr.execute("INSERT INTO Price VALUES (1100, 1100, 1, '2023-10-26','FER111')")
# crsr.execute("INSERT INTO Price VALUES (1700, 1600, 1, '2023-11-29','SUP111')")
# crsr.execute("INSERT INTO Price VALUES (1700, 1700, 0, '2023-10-24','SUP111')")
# crsr.execute("INSERT INTO Price VALUES (1500, 1500, 1, '2022-09-04','FER211')")
# crsr.execute("INSERT INTO Price VALUES (900000, 750000, 1, '2023-12-01','SUP211')")
# crsr.execute("INSERT INTO Price VALUES (900000, 900000, 0, '2023-04-01','SUP211')")
# crsr.execute("INSERT INTO Price VALUES (990, 990, 1, '2023-12-15','FER122')")
# crsr.execute("INSERT INTO Price VALUES (1000, 1000, 1, '2023-03-03','SUP122')")
# crsr.execute("INSERT INTO Price VALUES (6100, 6100, 1, '2023-12-22','FER311')")
# crsr.execute("INSERT INTO Price VALUES (8500, 6200, 1, '2023-12-18','SUP311')")
# crsr.execute("INSERT INTO Price VALUES (8500, 7600, 0, '2023-11-27','SUP311')")
# crsr.execute("INSERT INTO Price VALUES (8500, 8500, 0, '2023-04-09','SUP311')")
# crsr.execute("INSERT INTO Price VALUES (1090, 1090, 1, '2023-10-13','FER411')")

crsr.execute("SELECT Product.Name AS Name, Product.Ean AS Ean, Product.SKU AS SKU, min(Price.discount_price) AS Price, Product.market_name AS Market FROM Product INNER JOIN Price on Product.SKU = Price.SKU WHERE Price.active=1 GROUP BY Product.SKU HAVING min(Price.discount_price);")
print(crsr.fetchall())
conn.commit()
conn.close()
