import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    passwordAgain: ""
  });
  const history = useHistory();

  const addSignUpData = (e) => {
    const { name, value } = e.target;
    setSignUpData(() => {
      return {
        ...signUpData,
        [name]: value
      }
    })
  };

  const signUpUser = async(e) => {
    e.preventDefault();
    const {name, number, email, password, passwordAgain} = signUpData;

    const res = await fetch("/postUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, number, email, password, passwordAgain
      })
    });

    const data = await res.json();
    //console.log(data);
    if(res.status === 422 || !data) {
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
      toast.success("SignUp Successfull!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setSignUpData({...signUpData, name:"", number:"", email:"", password:"", passwordAgain: ""});
      history.push("/sign-in");
    }
    
  }

  return (
    <section className="flex justify-center px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
      <div className="h-[490px] w-[490px] p-2 mt-44 border-2 border-solid border-white rounded-lg">
        <form method="POST" className="flex flex-col justify-center p-2">
          <h1 className="text-2xl font-bold">Sign-Up</h1>
          <div className="flex flex-col p-2">
            <label className="font-semibold" htmlFor="name">Your Name</label>
            <input 
              className="rounded-lg p-1 text-black" 
              type="text" 
              placeholder="Enter Your Name"
              value={signUpData.name}
              onChange={addSignUpData}
              name="name" 
              id="name"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold" htmlFor="number">Phone Number</label>
            <input 
              className="rounded-lg p-1 text-black" 
              type="number" 
              placeholder="Enter Phone Number"
              value={signUpData.number}
              onChange={addSignUpData}
              name="number" 
              id="number"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold" htmlFor="email">Email</label>
            <input 
              className="rounded-lg p-1 text-black" 
              type="text" 
              placeholder="Enter Email"
              value={signUpData.email}
              onChange={addSignUpData}
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
              value={signUpData.password}
              onChange={addSignUpData}
              name="password" 
              id="password"
            />
          </div>
          <div className="flex flex-col p-2">
            <label className="font-semibold" htmlFor="passwordAgain">Password Again</label>
            <input 
              className="rounded-lg p-1 text-black" 
              type="password" 
              placeholder="Enter Password Again"
              value={signUpData.passwordAgain}
              onChange={addSignUpData}
              name="passwordAgain" 
              id="passwordAgain"
            />
          </div>
          <button className="w-20 h-8 bg-gray-600 text-white rounded-lg font-semibold mx-auto" onClick={signUpUser}>Sign-Up</button>
          <div className="flex mx-auto">
            <p className="mt-2 font-semibold">Already Have Account ?</p>
            <Link to="/sign-in" className="text-gray-500 m-2 font-semibold">Sign-In</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SignUp;