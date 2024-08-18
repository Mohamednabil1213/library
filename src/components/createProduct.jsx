import React, { useContext, useState } from 'react';
import { apiContext } from '../context/api';
import toast from 'react-hot-toast';

export default function CreateProduct() {
  const { createProduct } = useContext(apiContext);
  const [ID, setID] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(''); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false);

  async function createMyProduct(e) {
    e.preventDefault(); // Prevent page reload

    const productData = {
      ID,
      name,
      quantity,
      price
    };

    try {
      await createProduct(productData);
      setError(null); 
      setSuccess(true);
      toast.success('Product created successfully!', { duration: 1500, position: 'top-center' });

      // Clear the input fields
      setID('');
      setName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setSuccess(false);
      toast.error('Error creating product', { duration: 1500, position: 'top-center' });
      console.error('Error creating product:', error);
    }
  }

  return (
    <>
      <h1 className='text-white text-center'>Create Product</h1>
      <div className='container'>
        {error && (
          <div className='bg-danger text-white p-3 mt-3 rounded'>
            {error}
          </div>
        )}
        {success && (
          <div className='bg-success text-white p-3 mt-3 rounded'>
            Product created successfully!
          </div>
        )}

        <form onSubmit={createMyProduct}>
          <label htmlFor='ID' className='text-white d-block'>ID</label>
          <input
            type='text'
            id='ID'
            placeholder='ID'
            className='mt-2 me-2 bar bg-white rounded-2'
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <label htmlFor='name' className='text-white d-block'>Name</label>
          <input
            type='text'
            id='name'
            className='mt-2 me-0 bar bg-white rounded-2'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='quantity' className='text-white d-block'>Quantity</label>
          <input
            type='number'
            id='quantity'
            className='mt-2  me-2 bar bg-white rounded-2'
            placeholder='Quantity'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label htmlFor='price' className='text-white d-block'>Price</label>
          <input
            type='text'
            id='price'
            className='mt-2 me-2 bar bg-white rounded-2'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type='submit' className='btn btn-primary d-block mt-3'>Create</button>
        </form>
      </div>
    </>
  );
}
