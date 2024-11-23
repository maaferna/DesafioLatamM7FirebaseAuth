import { defineStore } from 'pinia';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    error: null,
    isAuthenticated: false,
    loading: true,
  }),

  actions: {
    initializeAuth() {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          this.user = currentUser;
          this.isAuthenticated = !!currentUser;
          this.loading = false;
          unsubscribe(); 
          resolve(currentUser);
        });
      });
    },

    async signUp(email, password, router) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        this.error = null;
        
        const redirectPath = router.currentRoute.value.query.redirect || '/home';
        await router.replace(redirectPath);
        
        return { success: true };
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },

    async login(email, password, router) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        this.error = null;
        
        const redirectPath = router.currentRoute.value.query.redirect || '/home';
        await router.replace(redirectPath);
        
        return { success: true };
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },

    async logout(router) {
      try {
        await signOut(auth);
        this.user = null;
        this.isAuthenticated = false;
        this.error = null;
        await router.push('/login');
        return { success: true };
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },
  },
});