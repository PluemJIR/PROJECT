import About from '../pages/about/About'
import Find from '../pages/find/Find'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Profile from '../pages/profile/Profile'
import Register from '../pages/register/Register'
import HomeLogin from '../pages/home/HomeLogin'
import StandeeProfile from '../pages/StandeeProfile/StandeeProfile'
import Booking from '../pages/booking/booking'

const url = window.location.href.split('/')
const length = url.length
const username = url[length-1]

const component = {
    About : {
        url: "/about",
        component: About
    },
    Find : {
        url: "/finder",
        component: Find
    },

    Login : {
        url: "/login",
        component: Login
    },
    Profile : {
        url: `/profile`,
        component: Profile
    },
    Register : {
        url: "/register",
        component: Register
    },
    HomeLogin : {
        url:'/landing',
        component: HomeLogin
    },
    Home : {
        url:'/home',
        component: Home
    },
    StandeeProfile : {
        url: `/profile/${username}`,
        component: StandeeProfile
    },
    Booking : {
        url: '/booking',
        component: Booking
    }
}

export default {
    guest: {
        allowedRoutes: [
            component.Login,
            component.Register,
            component.About,
            component.Home,
        ],
        redirectRoutes: '/home'
    },
    user: {
        allowedRoutes: [
            component.Profile,
            component.Find,
            component.About,
            component.HomeLogin,
            component.StandeeProfile,
            component.Booking
        ],
        redirectRoutes: '/landing'
    }
}