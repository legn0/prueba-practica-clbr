import { useEffect, useState } from "react";
import Producto from "./components/producto";



function App() {



//   const results = {
//     "data": [
//         {
//             "VER000": {
//                 "Name": "Tomate",
//                 "qry_data": [
//                     {
//                         "SKU": "FER111",
//                         "Price": 1100,
//                         "Market": "Feria"
//                     },
//                     {
//                         "SKU": "SUP111",
//                         "Price": 1600,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 2,
//                 "price_range": [
//                     1600,
//                     1100
//                 ]
//             }
//         },
//         {
//             "VER011": {
//                 "Name": "Lechuga",
//                 "qry_data": [
//                     {
//                         "SKU": "FER122",
//                         "Price": 990,
//                         "Market": "Feria"
//                     },
//                     {
//                         "SKU": "SUP122",
//                         "Price": 1000,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 2,
//                 "price_range": [
//                     1000,
//                     990
//                 ]
//             }
//         },
//         {
//             "FRT123": {
//                 "Name": "Empanada",
//                 "qry_data": [
//                     {
//                         "SKU": "FER211",
//                         "Price": 1500,
//                         "Market": "Feria"
//                     }
//                 ],
//                 "availability": 1,
//                 "price_range": [
//                     1500,
//                     1500
//                 ]
//             }
//         },
//         {
//             "PES000": {
//                 "Name": "Reineta",
//                 "qry_data": [
//                     {
//                         "SKU": "FER311",
//                         "Price": 6100,
//                         "Market": "Feria"
//                     },
//                     {
//                         "SKU": "SUP311",
//                         "Price": 6200,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 2,
//                 "price_range": [
//                     6200,
//                     6100
//                 ]
//             }
//         },
//         {
//             "MAS000": {
//                 "Name": "Pan",
//                 "qry_data": [
//                     {
//                         "SKU": "FER411",
//                         "Price": 1090,
//                         "Market": "Spermercado"
//                     }
//                 ],
//                 "availability": 1,
//                 "price_range": [
//                     1090,
//                     1090
//                 ]
//             }
//         },
//         {
//             "VER000": {
//                 "Name": "Tomate",
//                 "qry_data": [
//                     {
//                         "SKU": "FER111",
//                         "Price": 1100,
//                         "Market": "Feria"
//                     },
//                     {
//                         "SKU": "SUP111",
//                         "Price": 1600,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 2,
//                 "price_range": [
//                     1600,
//                     1100
//                 ]
//             }
//         },
//         {
//             "VER011": {
//                 "Name": "Lechuga",
//                 "qry_data": [
//                     {
//                         "SKU": "FER122",
//                         "Price": 990,
//                         "Market": "Feria"
//                     },
//                     {
//                         "SKU": "SUP122",
//                         "Price": 1000,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 2,
//                 "price_range": [
//                     1000,
//                     990
//                 ]
//             }
//         },
//         {
//             "TEC000": {
//                 "Name": "iPhone",
//                 "qry_data": [
//                     {
//                         "SKU": "SUP211",
//                         "Price": 750000,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 1,
//                 "price_range": [
//                     750000,
//                     750000
//                 ]
//             }
//         },
//         {
//             "PES000": {
//                 "Name": "Reineta",
//                 "qry_data": [
//                     {
//                         "SKU": "FER311",
//                         "Price": 6100,
//                         "Market": "Feria"
//                     },
//                     {
//                         "SKU": "SUP311",
//                         "Price": 6200,
//                         "Market": "Supermercado"
//                     }
//                 ],
//                 "availability": 2,
//                 "price_range": [
//                     6200,
//                     6100
//                 ]
//             }
//         }
//     ]
// };
 const [search, setSearch]= useState('')

  const [result, setResult] = useState([])


  const getData = async () => { 

    const res = await fetch("http://127.0.0.1:5000/precios")
    const data = await res.json();
    setResult(data.data)
    }

useEffect(()=>{
  getData()
},[])
const [data, setData] = useState(result)
useEffect(()=>{ 
  setData(result)

    let filtered = result.filter((ean)=>{
      return search.toLowerCase()==='' ? false : !Object.values(ean)[0]["Name"].toLowerCase().includes(search.toLowerCase())
    })

      let index = 0;
    const timer = setInterval(() => {
      setData((data) => {
        const newdata = [...data];
        if (filtered.length > 0){
          const itemToRemove = newdata.findIndex(item => Object.values(item)[0].Name === Object.values(filtered[index-1])[0].Name);
          console.log(newdata)
          console.log(filtered)
          console.log(filtered[index])
          if (itemToRemove !== -1) {
            newdata.splice(itemToRemove, 1);
          }
        }
      
        return newdata;
      });
      if (filtered.length === 0 || index === filtered.length-1) {
        clearInterval(timer)
      }
      index++;
    }, 1000);
    return () => {
      clearInterval(timer);
      index=0;}
    
}, [search]);



  return (
    <div>
      <input type="text" onChange={(e) => {
      setSearch(e.target.value)}}/>
      <h2>Productos</h2>
      
      {
        data.map((ean) => {
          let values = Object.values(ean)[0]
          
          return (
          <Producto name={values["Name"]} max_price={values["price_range"][0]} min_price={values["price_range"][1]} availability={values["availability"]}/>
        )})
      }


    </div>
  );
}

export default App;
