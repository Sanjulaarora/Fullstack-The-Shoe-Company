import React, { useContext } from 'react';
import img1 from '../images/shoe-company-logo.png';
import { FaCartShopping } from 'react-icons/fa6';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { cart } = useSelector((state) => state.allCart);
  const { user, setUser } = useContext(AppContext);
  const history = useHistory();

  const userSignOut = async() => {
    const res = await fetch("/sign-out", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });  
    
    const data = await res.json();
    console.log(data);

    if(res.status !== 201) {
    console.log("error");
    toast.error("Something went Wrong!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    } else {
    console.log("data valid");
    toast.success("Your are Signed Out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setUser(null);
    history.push("/");
    }
  };

  return (
    <header className="flex justify-between items-center px-8 media450:px-6 md:px-12 fixed w-full max-w-[1440px] mx-auto left-[50%] -translate-x-[50%] bg-black/70 backdrop-blur-sm z-10">
      <div>
        <Link to='/'><img className="w-20 media450:w-24 media830:w-32" src={img1} alt={"logo"} loading="lazy"/></Link>
        <p className="text-[10px] media830:text-sm -mt-5 media830:-mt-8">The Shoe Company</p>
      </div>
      <div className="flex text-[12px] lg:text-2xl font-bold">
        {
          !user && 
          <Link to='/sign-in'>
            <button className="media450:mr-4 hover:underline hover:scale-110">Login</button>
          </Link>
        }
        { 
          user &&
          <button className="media450:mr-4 hover:underline hover:scale-110" onClick={userSignOut}>Logout</button>
        }
        <Link to='/collections'>
          <button className="mr-2 media450:mr-4 hover:underline hover:scale-110">Collections</button>
        </Link> 
        {
          user &&
          <Link to='/cart'>
            <button className="flex mr-3 bg-slate-700 border-2 border-solid border-white rounded-lg w-6 media450:w-8 lg:w-12 p-[2px] media450:p-1 lg:p-[6px] text-[7px] media450:text-[10px] media830:text-xs hover:scale-110">
              <FaCartShopping className="text-md media450:text-xl mt-[1px] media450:mt-0 mr-[2px]"/> 
              {cart.length}
            </button> 
          </Link> 
        }
      </div>
    </header>
  )
}

export default Header;