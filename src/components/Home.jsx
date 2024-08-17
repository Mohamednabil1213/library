import React, { useContext, useState, useEffect } from 'react';
import { apiContext } from '../context/api';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { MDBInputGroup } from 'mdb-react-ui-kit';
import { Table } from 'react-bootstrap';

export default function Home() {
  const queryClient = useQueryClient();
  const { getAllproducts, deleteProduct } = useContext(apiContext);
  const { isLoading, isError, data } = useQuery('getAllproducts', getAllproducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data?.data?.data?.products) {
      setFilteredProducts(data.data.data.products);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.data?.products) {
      const results = data.data.data.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, data]);

  async function deleteMyproduct(id) {
    try {
      await deleteProduct(id);
      queryClient.invalidateQueries('getAllproducts');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <>Loading...!</>;
  }

  if (isError) {
    return <>Error loading products.</>;
  }

  return (
    <div className='container'>
      <h1 className='text-center text-white'>All Products</h1>
      <MDBInputGroup className='d-flex justify-content-center w-100'>
        <input
          type='text'
          className='mt-2 me-2 bar bg-white rounded-2'
          placeholder='Search by Title'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className='btn btn-outline-info search text-white h-25 rounded-2'
        >
          <i className='icon fa-solid fa-search'></i>
        </button>
      </MDBInputGroup>
      <Table
        className='Table'
        responsive="sm"
        style={{ border: '1px solid black', borderCollapse: 'collapse' }}
        bordered hover
        variant="dark"
      >
        <thead>
          <tr>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>ID</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Title</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Quantity</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Price</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Details</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <tr key={item._id}>
                <td style={{ border: '1px solid black' }}>{item.ID}</td>
                <td style={{ border: '1px solid black' }}>{item.name}</td>
                <td style={{ border: '1px solid black' }}>{item.quantity}</td>
                <td style={{ border: '1px solid black' }}>{item.price}</td>
                <td className='text-center' style={{ border: '1px solid black' }}>
                  <Link to={`/productdetails/${item._id}`} className='text-white btn btn-outline-info'>Details</Link>
                </td>
                <td className='text-center' onClick={() => deleteMyproduct(item._id)} style={{ border: '1px solid black' }}>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6' className='text-center'>No products found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
