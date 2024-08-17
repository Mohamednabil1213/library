import React, { useContext, useState, useEffect } from 'react';
import { apiContext } from '../context/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateOrder() {
  const { id } = useParams(); // Get the order ID from URL params
  const { getOrderById, updateOrder } = useContext(apiContext);
  const navigate = useNavigate();

  // State to hold order data
  const [order, setOrder] = useState({
    items: [{ ID: '', quantity: '' }]
  });

  // Fetch order details when the component mounts
  useEffect(() => {
    async function fetchOrder() {
      try {
        const fetchedOrder = await getOrderById(id);
        // Ensure fetchedOrder and items exist before setting state
        if (fetchedOrder && Array.isArray(fetchedOrder.items)) {
          setOrder({ items: fetchedOrder.items });
        } else {
          // Handle unexpected data format
          setOrder({ items: [{ ID: '', quantity: '' }] });
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        // Handle error case by setting an empty or default state
        setOrder({ items: [{ ID: '', quantity: '' }] });
      }
    }
    fetchOrder();
  }, [id, getOrderById]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const newItems = [...order.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setOrder({ items: newItems });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming updateOrder needs an object with items field
      await updateOrder(id, { items: order.items });
      navigate('/allorders'); // Navigate to the orders list or another appropriate page after update
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-white text-center'>Update Order</h1>

      <form onSubmit={handleSubmit}>
        {order.items && order.items.length > 0 ? (
          order.items.map((item, index) => (
            <div key={index}>
              <label htmlFor={`ID-${index}`} className='text-white'>ID</label>
              <input
                type='text'
                id={`ID-${index}`}
                className='mt-2 me-2 bar bg-white rounded-2'
                value={item.ID}
                onChange={(e) => handleChange(index, 'ID', e.target.value)}
                placeholder='ID'
              />
              <hr />
              <label htmlFor={`quantity-${index}`} className='text-white'>Quantity</label>
              <input
                type='number'
                id={`quantity-${index}`}
                className='mt-2 me-2 bar bg-white rounded-2'
                value={item.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                placeholder='Quantity'
              />
              <hr />
            </div>
          ))
        ) : (
          <p>No items to display</p>
        )}
        <button type='submit' className='btn btn-primary'>Update</button>
      </form>
    </div>
  );
}
