import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import Home from './pages/home/Home';
import Finder from './pages/find/Find'
import About from './pages/about/About'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import PrivateRoutes from './private-routes/PrivateRoutes';
import React, {useState} from 'react'
import localStorageService from './services/localStorageService'
import StandeeProfile from './pages/StandeeProfile/StandeeProfile'
import Form from './component/Form/booking/BookingForm'
import Booking from './pages/booking/booking'
import BookingCard from './component/BookingCard/BookingCard'

function App() {
  const [role, setRole] = useState(localStorageService.getRole())

  return (
    // <Switch>
    //   <Route exact path='/' component={Home} />
    //   <Route exact path='/finder' component={Finder} />
    //   <Route exact path='/about' component={About} />
    //   <Route exact path='/register' component={Register} />
    //   <Route exact path='/login' component={Login} />
    //   <Route exact path='/profile' component={Profile}/>

    //   <Route exact path={`/test`} component={Booking} />
    //   <Route exact path={`/test2`} component={BookingCard} />
    //   <Redirect to='/'/>
    // </Switch>
    <div>
      <PrivateRoutes role={role} setRole={setRole}></PrivateRoutes>
    </div>
    
  );
}

export default App;
