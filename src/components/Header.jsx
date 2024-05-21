import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { useSelector,useDispatch } from "react-redux";
import { remove } from '../redux/CartSlice';
function Header() {
  const items = useSelector((state) => state.cart);
  const dispatch= useDispatch() 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[price,setPrice]=useState(0);
  //console.log(price)
  
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRemove=(itemId)=>{
     console.log("remove from header");
     dispatch(remove(itemId))
  }


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const total =()=>{
      let price=0;
      items.map((itm, k)=>{
          price=itm.price+price
      });
     setPrice(price);

  }

  useEffect(()=>{
        total();
  },[total])


  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                My App
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-6 flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-gray-300 hover:text-white">
              <button
                className="text-xl"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                🛒
              </button>
              <span className="bg-red-500 text-white rounded-full px-2 py-1 absolute -top-140 -right-140 text-xs">
                {items.length}
              </span>
            </div>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              className:
                "bg-white rounded-lg shadow-lg max-w-sm border border-gray-200 divide-y divide-gray-200",
            }}
          >
            {items.length > 0 ? (
              <div className="p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {items.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between py-2 border-b last:border-none"
                    >
                      <div className="flex items-center">
                        <NavLink to={`/cart/${e.id}`} className="mr-4" onClick={handleClose}>
                          <img
                            src={e.imgdata}
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </NavLink>
                        <div>
                          <p className="font-semibold text-gray-800">{e.rname}</p>
                          <p className="text-gray-600">Price: ${e.price}</p>
                          <p className="text-gray-600">Quantity: {e.qunt}</p>
                        </div>
                      </div>
                      {/* Header part  popup  */ }
                      <button className="text-red-500 cursor-pointer" onClick={()=>handleRemove(e.id)}>🗑️</button>
                    </div>
                  ))}
                </div>
                <div className="py-4 text-right">
                  <p className="text-gray-800 font-semibold">Total: $300</p>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-between w-full mb-4">
                  <button
                    onClick={handleClose}
                    className="text-gray-800 font-bold hover:text-gray-600 cursor-pointer bg-yellow-100 p-2 rounded-full"
                  >
                    X
                  </button>
                </div>
                <p className="text-gray-500 mb-4 font-bold">Your Cart is Empty</p>
                <img
                  src="https://media.tenor.com/oIVdO9uv1lUAAAAi/money-shopping.gif"
                  alt="good"
                  className="w-20 h-15"
                />
              </div>
            )}
          </Menu>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Add to Cart
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="text-gray-300 hover:text-white">
              <button
                className="text-xl"
                id="mobile-basic-button"
                aria-controls={open ? "mobile-basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                🛒
              </button>
              <span className="bg-red-500 text-white rounded-full px-2 py-1 absolute -top-2 -right-2 text-xs">
                0
              </span>
            </div>
            <Menu
              id="mobile-basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "mobile-basic-button",
              }}
            >
              {/* Shopping cart */}
              <div className="p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-between w-full mb-4">
                  <i className="text-black font-bold hover:text-gray-700 cursor-pointer bg-yellow-100 p-2">
                    X
                  </i>
                </div>
                <p className="text-gray-500 mb-4 font-bold">
                  Your Cart is Empty
                </p>
                <img
                  src="https://media.tenor.com/oIVdO9uv1lUAAAAi/money-shopping.gif"
                  alt=" "
                  className="w-20 h-15"
                />
              </div>
            </Menu>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
