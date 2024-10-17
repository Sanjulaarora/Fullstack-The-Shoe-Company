import React, { Suspense } from 'react';
import Search from '../components/Search';
import Recommended from '../components/Recommended';

const Products = React.lazy(() => import('../components/Products'));

const Collections = () => {
  return (
    <section id="collections" className="grow">
      <Search />
      <Recommended />
      <Suspense fallback={<div>Loading...</div>}>
        <Products />   
      </Suspense>
    </section>
  )
}

export default Collections;