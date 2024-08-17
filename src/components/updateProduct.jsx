import React, { useContext, useState, useEffect } from 'react';
import { apiContext } from '../context/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
  const { id } = useParams(); // Get the product ID from URL params
  const { updateProduct, getProductById } = useContext(apiContext);
  const navigate = useNavigate();

  // State to hold product data
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  // Fetch product details when the component mounts
  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProductById(id);
        setProduct({
          name: fetchedProduct.name,
          quantity: fetchedProduct.quantity,
          price: fetchedProduct.price
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    fetchProduct();
  }, [id, getProductById]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product); // Update the product with the new data
      navigate('/'); // Navigate to the home page or another appropriate page after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-white text-center'>Update Product</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='ID' className='text-white'>ID</label>
        <input
          type='text'
          id='ID'
          className='mt-2 me-2 bar bg-white rounded-2'
          value={id} 
          disabled
        />
        <hr />
        <label htmlFor='name' className='text-white'>Name</label>
        <input
          type='text'
          id='name'
          className='mt-2 me-2 bar bg-white rounded-2'
          value={product.name}
          onChange={handleChange}
          placeholder='Name'
        />
        <hr />
        <label htmlFor='quantity' className='text-white'>Quantity</label>
        <input
          type='number'
          id='quantity'
          className='mt-2 me-2 bar bg-white rounded-2'
          value={product.quantity}
          onChange={handleChange}
          placeholder='Quantity'
        />
        <hr />
        <label htmlFor='price' className='text-white'>Price</label>
        <input
          type='text'
          id='price'
          className='mt-2 me-2 bar bg-white rounded-2'
          value={product.price}
          onChange={handleChange}
          placeholder='Price'
        />
        <hr />
        <button type='submit' className='btn btn-primary'>Update</button>
      </form>
    </div>
  );
}
