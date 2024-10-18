import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const Recommended = () => {
  const { handleClick } = useContext(AppContext);

  return (
    <section id="recommended" className="px-6 md:px-12 max-w-[1440px] mx-auto">
      <h1 className="text-sm lg:text-2xl font-bold ml-[130px] media450:ml-[250px] media830:ml-[340px]">Recommended</h1>
      <div className="flex ml-[130px] media450:ml-[250px] media830:ml-[340px]">
        <button 
          className="btn" 
          onClick={handleClick} 
          value="Adidas"
        > 
          Adidas 
        </button>

        <button 
          className="btn" 
          onClick={handleClick} 
          value="Nike"
        >
          Nike
        </button>

        <button 
          className="btn" 
          onClick={handleClick} 
          value="Puma"
        >
          Puma
        </button>
        
        <button 
          className="btn" 
          onClick={handleClick} 
          value="Vans"
        >
          Vans
        </button>
      </div>
    </section>
  )
}

export default Recommended;