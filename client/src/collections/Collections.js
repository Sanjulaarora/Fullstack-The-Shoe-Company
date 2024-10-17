import React, { Suspense } from 'react';
import Search from './Search';
import Recommended from './Recommended';

const Products = React.lazy(() => import('./Products'));

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