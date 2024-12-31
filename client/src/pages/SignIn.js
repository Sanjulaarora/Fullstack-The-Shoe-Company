import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    email:"",
    password:""
  });
  const { setUser } = useContext(AppContext);
  const history = useHistory();

  const addSignInData = (e) => {
    const {name, value} = e.target;
    setSignInData(() => {
      return {
        ...signInData,
        [name]:value
      }
    })
  }

  const signInUser = async(e) => {
    e.preventDefault();
    const { email, password } = signInData;

    const res = await fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();
    //console.log(data);
    if(res.status === 400 || !data) {
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
      toast.success("You are Logged In 🔓!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setSignInData({...signInData, email:"", password:""});
      setUser(true);
      history.push("/collections");
    }
  }

  return (
    <section className="flex justify-center px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
      <div className="h-80 w-80 p-2 mt-44 border-2 border-solid border-white rounded-lg">
        <form method="POST" className="flex flex-col justify-center space-y-2 p-2">
          <h1 className="text-2xl font-bold">Sign-In</h1>
          <div className="flex flex-col p-2">
            <label className="font-semibold" htmlFor="email">Email</label>
            <input 
              className="rounded-lg p-1 text-black" 
              type="text" 
              placeholder="Enter Email"
              value={signInData.email}
              onChange={addSignInData}
              name="email" 
              id="email"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold" htmlFor="password">Password</label>
            <input 
              className="rounded-lg p-1 text-black" 
              type="password" 
              placeholder="At least 6 character"
              value={signInData.password}
              onChange={addSignInData} 
              name="password" 
              id="password"
            />
          </div>
          <button 
            className="w-20 h-8 bg-gray-600 rounded-lg font-semibold mx-auto"
            onClick={signInUser}
            disabled={!signInData.email || !signInData.password}
          >
            Sign-In
          </button>
          <div className="flex mx-auto">
            <p className="mt-2 font-semibold">Do Not Have an Account ?</p>
            <Link to="/sign-up" className="text-gray-500 m-2 font-semibold">Sign-Up</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SignIn;