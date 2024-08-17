import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/layout'
import Home from './components/Home';
import CreateProduct from './components/createProduct'
import UpdateProduct from './components/updateProduct'
import ProductDetails from './components/productDetails'
import AllOrders from './components/allorders'
import UpdateOrder from './components/updateOrder'
import CreateOrders from './components/createOrder'
import Orderdetails from './components/OrderDetalis'
import ApiContextProvider from './context/api'
import { QueryClient, QueryClientProvider } from 'react-query';
let routers = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: '/createproduct', element: <CreateProduct /> },
      { path: '/updateproduct/:id', element: <UpdateProduct /> },
      { path: '/productdetails/:id', element: <ProductDetails /> },
      { path: '/allorders', element: <AllOrders /> },
      { path: '/createorder', element: <CreateOrders /> },
      { path: '/updateorder/:id', element: <UpdateOrder /> },
      { path: '/orderdetails/:id', element: <Orderdetails /> },
    ]
  }
])
function App() {
  const myClient = new QueryClient()
  return <>
    <QueryClientProvider client={myClient}>
      <ApiContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </ApiContextProvider>


    </QueryClientProvider>




  </>
}

export default App;
