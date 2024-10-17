import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const SubTotalSidebar = () => {
  const { cart } = useSelector((state) => state.allCart);
  const [total, setTotal] =useState();
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.newPrice)*curr.quantity, 0));
  }, [cart]);
  
  return (
    <div>
      <section className="w-28 media450:w-56 media1025:w-96 mt-32 bg-slate-700 rounded-md p-4 text-left min-h-[400px] media450:min-h-screen">
        <p className="font-bold text-xs media450:text-lg media830:text-2xl">Subtotal ({cart.length}) Items</p>
        <div className="flex flex-col mt-7 media830:mt-10 space-y-7 media830:space-y-10">
          <p className="font-semibold text-[10px] media450:text-md media830:text-xl">Total: Rs.{total} </p>
          <button className="text-slate-700 font-extrabold media450:font-bold text-[6px] media450:text-sm media830:text-md bg-white h-8 media450:h-10 w-20 media450:w-40 media820:w-52 rounded-md mx-auto hover:scale-110" disabled> Proceed to Payment </button>
        </div>
      </section>
    </div>
  )
}

export default SubTotalSidebar;