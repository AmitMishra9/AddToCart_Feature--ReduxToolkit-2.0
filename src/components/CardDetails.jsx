import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { remove } from '../redux/CartSlice';
import { useNavigate, useParams } from 'react-router-dom';
function CardDetails() {
  const [data,setData]=useState([]);

  //console.log("data=>",data);
const cartItems = useSelector((state) => state.cart);
const dispatch= useDispatch();

const  navigete= useNavigate();

   
   const {id} = useParams();
   //console.log("id=>",id);

    const compare =()=>{
      let compareData= cartItems.filter((e)=>{
         return e.id==id
      });
      setData(compareData);
    }

    const handleRemove=(itemId)=>{
      console.log("gayab");
     dispatch(remove(itemId))
     navigete('/');
 }


  useEffect(()=>{
       compare();
  },[id])  


  return (

    <div className=" flex justify-center items-center min-h-screen ">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row">     

      {data.map((item,index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row"
          >
            {/* Left section for image */}
            <div className="md:w-1/2 md:mr-4 lg:mr-6 mb-4 md:mb-0">
              <div className="bg-gray-300 h-48 md:h-64 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.imgdata}
                  alt="image"
                />
              </div>
            </div>
            {/* Right section for details */}
            <div className="md:w-1/2">
              <h2 className="text-xl md:text-2xl font-bold mb-2">{item.name}</h2>
              <div className="mb-4">
                <p className="mb-1">
                  <span className="font-bold">Restaurant:</span> {item.rname}
                </p>
                <p className="mb-1">
                  <span className="font-bold">Price:</span> ${item.price}
                </p>
                <p className="mb-1">
                  <span className="font-bold">Dishes:</span> {item.address}
                </p>
                
              </div>
              <div className="flex items-center mb-2">
                <p className="font-bold mr-2">Rating:</p>
                <span className="bg-green-400 text-white p-1 rounded-md">{item.rating} &#9733;</span>
              </div>
              <p className="mb-4">
                <span className="font-bold">Order Review:</span> {item.orderReview}
              </p>
              <p>
                  <span className="font-bold">Total:</span> ${item.total}
                </p>
              
              <div className="flex items-center">
                <p className="font-bold mr-2">Remove:</p>
                <button onClick={() => handleRemove(item.id)} className="bg-red-400 text-white p-1 rounded-md cursor-pointer">🗑️</button>
              </div>

              <div className="bg-green-400 w-12 p-2 m-3">
              <span className='font-bold text-lg'>-</span>
               <span className='font-bold text-lg'>{item.qnty}</span>
              <span className='font-bold text-lg'>+</span>
           </div>
            </div>
          </div>
        ))} 
      
      </div>
    </div>
  );
}

export default CardDetails;