import axios from "axios";
import { createContext } from "react";

export const apiContext = createContext();

export default function ApiContextProvider({ children }) {

   async function getAllproducts() {
      return axios.get(`https://kartak-demo-od0f.onrender.com/api/v1/products/getAllProducts`);
   }
   async function getAllOrders() {
      return axios.get(`https://kartak-demo-od0f.onrender.com/api/v1/orders/getAllOrders`);
   }

   async function getProductById(id) {
      try {
         const response = await axios.get(`https://kartak-demo-od0f.onrender.com/api/v1/products/getProduct/${id}`);
         return response.data; 
      } catch (error) {
         console.error("Error fetching product by ID:", error);
         throw error; 
      }
   }
   async function getOrderById(id) {
      try {
         const response = await axios.get(`https://kartak-demo-od0f.onrender.com/api/v1/orders/getOrder/${id}`);
         return response.data; 
      } catch (error) {
         console.error("Error fetching order by ID:", error);
         throw error; 
      }
   }

   async function deleteProduct(id) {
      try {
         await axios.delete(`https://kartak-demo-od0f.onrender.com/api/v1/products/deleteProduct/${id}`);
      } catch (error) {
         console.error("Error deleting product:", error);
         throw error;
      }
   }
   async function deleteOrder(id) {
      try {
         await axios.delete(`https://kartak-demo-od0f.onrender.com/api/v1/orders/deleteOrder/${id}`);
      } catch (error) {
         console.error("Error deleting product:", error);
         throw error;
      }
   }

   async function updateProduct(id, updatedData) {
      try {
         const response = await axios.patch(`https://kartak-demo-od0f.onrender.com/api/v1/products/updateProduct/${id}`, updatedData);
         return response.data;
      } catch (error) {
         console.error("Error updating product:", error);
         throw error;
      }
   }
   async function updateOrder(id, updatedData) {
      try {
         const response = await axios.patch(`https://kartak-demo-od0f.onrender.com/api/v1/orders/updateOrder/${id}`, updatedData);
         return response.data;
      } catch (error) {
         console.error("Error updating order:", error);
         throw error;
      }
   }
   async function createProduct(productData) {
      try {
         const response = await axios.post('https://kartak-demo-od0f.onrender.com/api/v1/products/createProduct' , productData)
         return response.data;

      } catch (error) {
         console.error("Error creating product:", error);
         throw error;
      }
      
   }
   async function createOrder(arr) {
      try {
         const response = await axios.post('https://kartak-demo-od0f.onrender.com/api/v1/orders/createOrder' , arr)
         return response.data;
      

      } catch (error) {
         console.error("Error creating product:", error);
         throw error;
      }
      
   }

async function dayAmount(date) {
   try {
      const response = await axios.get(`https://kartak-demo-od0f.onrender.com/api/v1/orders/total-amount/${date}`)
      return response.data;
   

   } catch (error) {
      console.error("Error creating product:", error);
      throw error;
   }
   
}

   return (
      <apiContext.Provider value={{ getAllproducts, deleteProduct, updateProduct, getProductById , updateOrder , createProduct , getAllOrders , getOrderById , deleteOrder , createOrder , dayAmount}}>
         {children}
      </apiContext.Provider>
   );
}
