import React from 'react';
import Home from '../components/Home';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const HomePage = () => {

  return (
    <div>
      <Home />
      <HowItWorks />
      <About />
      <Testimonials />
      <Contact />
    </div>
  )
}

export default HomePage;