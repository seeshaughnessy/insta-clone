import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.onReady(() => {
  store.commit('isAuthenticated');
});

// Prevent access to home unless logged in
router.beforeEach((to, from, next) => {
  store.commit('isAuthenticated');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Check if page requires auth
    if (localStorage.getItem('jwt') == null) {
      //Check if not logged in
      next({
        //If not logged in, redirect to login page
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      // Else if logged in, do this
      next();
    }
  } else {
    //If page doesn't require auth, do this
    if (localStorage.getItem('jwt') != null) {
      //If user has token, redirect to home
      next({
        path: '/',
        params: { nextUrl: '/' },
      });
    } else {
      next();
    }
  }
});

export default router;
