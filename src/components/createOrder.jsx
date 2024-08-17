import React, { useContext, useState } from 'react';
import { apiContext } from '../context/api';
import toast from 'react-hot-toast';

export default function CreateOrder() {
  const { createOrder } = useContext(apiContext);
  const [items, setItems] = useState([{ ID: '', quantity: '' }]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
   // console.log(newItems);
   // console.log(index);
   // console.log(field);
    
    
  };
  function convertIdAndQuantityToNumbers(array) {
    return array.map(obj => {
        return {
            ...obj,
            ID: Number(obj.ID),  // Convert `id` to a number
            quantity: Number(obj.quantity)  // Convert `quantity` to a number
        };
    });
}



  const addItem = () => {
    setItems([...items, { ID: '', quantity: '' }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const validateItems = () => {
    return items.every(item =>
      item.ID.trim() !== '' && !isNaN(Number(item.quantity)) && Number(item.quantity) > 0
    );
  };

  async function createMyOrder(e) {
    e.preventDefault(); // Prevent page reload

    if (!validateItems()) {
      setError('Please ensure all items have a valid ID and quantity.');
      return;
    }

    // Convert quantity to number and ensure ID is a string
  /*   const processedItems = items.map(item => ({
      ID: item.ID.trim(), // Ensure ID is a trimmed string
      quantity: Number(item.quantity) // Ensure quantity is a number
    })); */

    try {
      const result = convertIdAndQuantityToNumbers(items);

      await createOrder({ items: result });
      setError(null);
      setSuccess(true);
      toast.success('Order created successfully!', { duration: 1500, position: 'top-center' });

      // Clear the input fields
      setItems([{ ID: '', quantity: '' }]);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setSuccess(false);
      toast.error('Error creating order', { duration: 1500, position: 'top-center' });
      console.error('Error creating order:', error);
    }
  }
 // console.log(items);
  

 //console.log(result);
  return (
    <>
      <h1 className='text-white text-center'>Create Order</h1>
      <div className='container max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg'>
        {error && (
          <div className='bg-red-500 bg-danger text-white p-3 mb-4 rounded'>
            {error}
          </div>
        )}
        {success && (
          <div className='bg-info text-white p-3 mb-4 rounded'>
            Order created successfully!
          </div>
        )}

        <form onSubmit={createMyOrder} className='space-y-6'>
          {items  .map((item, index) => (
            <div key={index} className='grid grid-cols-12 gap-4 items-end'>
              <div className='col-span-5'>
                <label htmlFor={`ID-${index}`} className='block text-white font-medium'>ID</label>
                <input
                  type='text'
                  id={`ID-${index}`}
                  className='mt-2 p-2 bg-white rounded'
                  value={item.ID}
                  onChange={(e) => handleItemChange(index, 'ID', e.target.value)}
                />
              </div>
              <div className='col-span-5'>
                <label htmlFor={`quantity-${index}`} className='block text-white font-medium'>Quantity</label>
                <input
                  type='number'
                  id={`quantity-${index}`}
                  className='mt-2 p-2 bg-white rounded'
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </div>
              <div className='col-span-2 flex justify-end'>
                <button
                  type='button'
                  onClick={() => removeItem(index)}
                  className='btn btn-danger'
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className='flex justify-between items-center'>
            <button
              type='button'
              onClick={addItem}
              className='btn btn-light me-5'
            >
              Add Item
            </button>
            <button
              type='submit'
              className='btn btn-info'
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
