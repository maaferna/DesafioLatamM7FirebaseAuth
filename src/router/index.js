import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebaseConfig';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresUnauth: true } 
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresUnauth: true }  
  },
  { 
    path: '/', 
    redirect: '/home'  
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'  
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth);

  await new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });

  if (requiresAuth && !currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else if (requiresUnauth && currentUser) {
    next('/home');
  } else {
    next();
  }
});

export default router;