import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiContext } from '../context/api';
import { useQuery , useQueryClient} from 'react-query';
import { useNavigate } from 'react-router-dom';


export default function ProductDetails() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { getAllproducts , deleteProduct} = useContext(apiContext);
  const { data } = useQuery('getAllproducts', getAllproducts);
  const products = data?.data.data.products;
  async function deleteMyproduct(id) {
    await deleteProduct(id);
      queryClient.invalidateQueries('getAllproducts');
       navigate('/')
  }

  return (
    <div className="container">
      <div className="flex justify-center">
        {products ? (
          products
            .filter((product) => product._id == id).map((product , index) => (
              <div key={index} className="text-center position-relative p-0 m-0">
                <Link to={'/'} className='position-absolute top-1 start-0 btn btn-outline-danger'>
                  <i className='close fa-solid fa-close'></i>
                </Link>
                <h2 className="text-2xl font-bold mb-2 text-white">ID: {product.ID}</h2>
                <h2 className="text-2xl font-bold mb-2 text-white">NAME: {product.name}</h2>
                <h2 className="text-2xl font-bold mb-2 text-white">PRICE: {product.price}</h2>
                <h2 className="text-2xl font-bold mb-2 text-white">QUANTITY: {product.quantity}</h2>
                <Link to={`/updateproduct/${product._id}`} className='btn text-black me-5 btn-info'>Update</Link>
                <button className='btn btn-danger' onClick={()=> deleteMyproduct(product._id)}>Delete</button>
              </div>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
