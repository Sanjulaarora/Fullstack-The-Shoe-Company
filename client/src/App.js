import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import {Switch, Route} from 'react-router-dom';
import { AppProvider } from './context/AppContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const Collections = lazy(() => import('./pages/Collections'));
const Cart = lazy(() => import('./pages/Cart'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

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