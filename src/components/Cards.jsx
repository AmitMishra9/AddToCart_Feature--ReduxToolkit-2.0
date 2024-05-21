import React, { useState } from 'react'
import CardData from './CardData'
import {add} from '../redux/CartSlice'
import { useDispatch } from 'react-redux';

function Cards() {
const [data, setData] = useState(CardData);
const [cart, setCart] = useState([]);
  
  const dispatch=useDispatch()

  const handleAddToCart = (item) => {
      //console.log(item);
       dispatch(add(item));   
  };

  return (
    <div>
      <h1 className='bg-slate-950 text-fuchsia-100 text-center p-4'>Add To Cart Project</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 cursor-pointer'>
        {data.map((item, id) => (
          <div key={id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            <img src={item.imgdata} alt='imgdata' className='w-full h-48 object-cover' />
            <div className='p-4'>
            <h3 className='text-xl font-bold mb-4'>{item.rname}</h3>

            <h4 className='text-lg font-bold mb-2'>{item.rating}</h4>

              <h3 className='text-xl font-bold mb-4'>${item.price}</h3>
              <button
                onClick={() => handleAddToCart(item)}
                className='bg-fuchsia-600 text-white px-4 py-2 rounded-md hover:bg-fuchsia-700 transition-colors duration-300'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards