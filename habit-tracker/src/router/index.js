import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
import HomeView from '../components/HomeView.vue'
import CreateHabit from '../components/CreateHabit.vue'

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/signup',
        name: 'SignupForm',
        component: SignupForm
    },
    {
        path: '/home',
        name: 'HomeView',
        component: HomeView,
        meta: { requiresAuth: true }
       
    },
    {
        path: '/habits/create',
        name: 'CreateHabit',
        component: CreateHabit,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next({ path: '/login' })
    } else {
        next()
    }
})

export default router