import React, { useContext, useState } from 'react';
import { apiContext } from '../context/api';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { MDBInputGroup } from 'mdb-react-ui-kit';
import { Table } from 'react-bootstrap';

export default function AllOrders() {
  const queryClient = useQueryClient();
  const { getAllOrders, deleteOrder, dayAmount } = useContext(apiContext);
  const { isLoading, isError, data } = useQuery('getAllOrders', getAllOrders);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [date, time] = dateTimeString.split('T');
    return `Date: ${date}  || Time: ${time.split('Z')[0]}`;
  };

  async function deleteMyOrder(id) {
    try {
      await deleteOrder(id);
      queryClient.invalidateQueries('getAllOrders');
      setError(null);
      setSuccess(true);
    } catch (error) {
      setError('Order not found');
      setSuccess(false);
    }
  }

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleFetchAmount = async () => {
    if (!inputDate) {
      setError('Please enter a valid date.');
      return;
    }

    try {
      const response = await dayAmount(inputDate);
      setTotalAmount(response.totalAmountOfDay); // Update with the totalAmountOfDay from response
      setError(null);
    } catch (error) {
      setError('Error fetching the total amount.');
    }
  };

  if (isLoading) {
    return <>Loading...!</>;
  }

  if (isError) {
    return <>Error loading orders.</>;
  }

  return (
    <div className='container'>
      <h1 className='text-center text-white'>All Orders</h1>
      {error && (
        <div className='bg-danger text-white p-3 mt-3 rounded'>
          {error}
        </div>
      )}
      {success && (
        <div className='bg-success text-white p-3 mt-3 rounded'>
          Deleted successfully!
        </div>
      )}
      {totalAmount !== null && (
        <div className='bg-info text-dark p-3 mt-3 rounded'>
          Total Amount for {inputDate}: {totalAmount}
        </div>
      )}
      <MDBInputGroup className='d-flex justify-content-center w-100'>
        <label htmlFor='dateInput' className='text-white mt-2'>Enter Date (YYYY-MM-DD):</label>
        <input
          id='dateInput'
          type='date'
          className='mt-2 me-2 bar bg-white rounded-2'
          value={inputDate}
          onChange={handleDateChange}
        />
        <button
          onClick={handleFetchAmount}
          className='btn btn-primary'
        >
          Fetch Amount
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
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Date</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Details</th>
            <th className='bg-black text-white' style={{ border: '1px solid white' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.data.orders?.map((item) => (
            <tr key={item._id}>
              <td style={{ border: '1px solid black' }}>{formatDateTime(item.orderDate)}</td>
              <td className='text-center' style={{ border: '1px solid black' }}>
                <Link to={`/orderdetails/${item._id}`} className='text-white btn btn-outline-info'>Details</Link>
              </td>
              <td className='text-center' onClick={() => deleteMyOrder(item._id)} style={{ border: '1px solid black' }}>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
