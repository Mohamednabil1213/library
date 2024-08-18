import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { apiContext } from '../context/api';

export default function OrderDetails() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [error , setError] = useState(false)
  const { id } = useParams();
  const { getAllOrders, deleteOrder } = useContext(apiContext);
  
  const { data } = useQuery('getAllOrders', getAllOrders);
  const orders = data?.data.data.orders;
  useEffect(() => {

    getAllOrders()
  }, [data])

  async function deleteMyOrder(orderId) {
    try {
      await deleteOrder(orderId);
      queryClient.invalidateQueries('getAllOrder');
      navigate('/allorders');
    } catch (error) {
      setError(true)
    }
  
  }

  return (
    <div className="container">
      <div className="flex justify-center">
      {error && (
          <div className='bg-red-500 bg-danger text-white p-3 mb-4 rounded'>
            product not found
          </div>
        )}
        {orders ? (
          orders
            .filter((order) => order._id === id)
            .map((order, index) => (
              <div key={index} className="text-center position-relative p-0 m-0">
                <Link to={'/allorders'} className='position-absolute top-1 start-0 btn btn-outline-danger'>
                  <i className='close fa-solid fa-close'></i>
                </Link>

                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4">
                    <h2 className="text-xl font-bold mb-2 text-white">Item ID: {item.ID}</h2>
                    <h2 className="text-xl font-bold mb-2 text-white">Item Name: {item.product.name}</h2>
                    <h2 className="text-xl font-bold mb-2 text-white">Price: {item.total}</h2>
                    <h2 className="text-xl font-bold mb-2 text-white">Quantity: {item.quantity}</h2>
                  </div>
                ))}

                <h2 className="text-xl font-bold mb-2 text-white">Total Amount: {order.totalAmount}</h2>
                <h2 className="text-xl font-bold mb-2 text-white">Order Date: {new Date(order.orderDate).toLocaleString()}</h2>

                <Link to={`/updateorder/${order._id}`} className='btn text-black me-5 btn-info'>Update</Link>
                <button className='btn btn-danger' onClick={() => deleteMyOrder(order._id)}>Delete</button>
              </div>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
