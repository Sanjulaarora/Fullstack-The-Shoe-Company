import { lazy, Suspense } from 'react';
import Header from './homepage/Header';
import Footer from './homepage/Footer';
import {Switch, Route} from 'react-router-dom';
import { AppProvider } from './context/AppContext';

const HomePage = lazy(() => import('./homepage/HomePage'));
const Collections = lazy(() => import('./collections/Collections'));
const Cart = lazy(() => import('./cart/Cart'));
const SignIn = lazy(() => import('./signup-signin/SignIn'));
const SignUp = lazy(() => import('./signup-signin/SignUp'));

function App() {
  return(
    <div className="m-0 p-0 box-border scroll-smooth bg-black text-white">
      <AppProvider>
        <Header />
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/collections" component={Collections} />
            <Route path="/cart" component={Cart} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
          </Suspense>
        </Switch>
        <Footer />
      </AppProvider>   
    </div>
  );
}

export default App;