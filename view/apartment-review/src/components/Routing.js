import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import HostForm from './HostForm';
import GuestForm from './GuestForm';
import Home from './Home';
import Details from './Details';

const Routing = (props) => {
    return (
        <BrowserRouter>
            <Header isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>
            <Route exact path='/' component={Home}/>
            <Route path='/details/:id' component={Details}/>
            <Route path='/login' render={() => <Login setIsLogin={props.setIsLogin}/>}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/hostRvw/:id' component={HostForm}/>
            <Route path='/guestRvw/:id' component={GuestForm}/>
            <Footer/>
        </BrowserRouter>
    )
}

export default Routing;