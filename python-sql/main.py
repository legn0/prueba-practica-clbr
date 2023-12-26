from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import sqlite3
import json

conn = sqlite3.connect("database/Mercados.db")

c = conn.cursor()
#Queries
#Pregunta 1:
get_data_query = "SELECT Product.Name AS Name, Product.Ean AS Ean, Product.SKU AS SKU, min(Price.discount_price) AS Price, Product.market_name AS Market FROM Product INNER JOIN Price on Product.SKU = Price.SKU WHERE Price.active=1 GROUP BY Product.SKU HAVING min(Price.discount_price);"



app = Flask("prueba-backend")
api = Api(app)
CORS(app)

class BackendMercados(Resource):
    def get(self):
        conn = sqlite3.connect("database/Mercados.db")
        c = conn.cursor()
        c.execute(get_data_query)
        conn.commit()
        
        eans = {}
        result = []
        finished = False
        while not finished:
            row = c.fetchone()
            if row == None:
                finished = True
            else:
                ean = row[1]
                if row[1] not in eans:
                    eans[ean] = dict()
                    eans[ean]["Name"] = row[0]
                    eans[ean]["qry_data"] = list()
                    eans[ean]["availability"] = 0
                    eans[ean]["price_range"] = []
                eans[ean]["qry_data"].append({"SKU":row[2], "Price":row[3], "Market":row[4]})
                eans[ean]["availability"] += 1
                if eans[ean]["price_range"] == []:
                    eans[ean]["price_range"] = [row[3], row[3]]
                elif row[3] > eans[ean]["price_range"][0]:
                    eans[ean]["price_range"][0] = row[3]
                elif row[3] < eans[ean]["price_range"][1]:
                    eans[ean]["price_range"][1] = row[3]
                
                result.append({ean: eans[ean]})
        conn.close()


        return jsonify({"data": result})






api.add_resource(BackendMercados, "/precios")

if __name__ == "__main__":
    app.run(debug=True)
    conn.close()