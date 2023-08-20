import { createStore } from 'vuex';
import { Router } from 'vue-router';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import router from '../router'; // Import the router instance

interface User {
  uid: string;
  email: string;
  // Add other user properties as needed
}

interface State {
  user: User | null;
}

export default createStore<State>({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user: User) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details: { email: string; password: string }) {
      const { email, password } = details;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) { // Use 'any' type for error
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User not found');
            break;
          case 'auth/wrong-password':
            alert('Wrong password');
            break;
          default:
            alert('Something went wrong');
        }
        return;
      }
  
      commit('SET_USER', auth.currentUser);
  
      router.push('/');
    },
  
    async register({ commit }, details: { email: string; password: string }) {
      const { email, password } = details;
  
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error: any) { // Use 'any' type for error
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in use');
            break;
          case 'auth/invalid-email':
            alert('Invalid email');
            break;
          case 'auth/operation-not-allowed':
            alert('Operation not allowed');
            break;
          case 'auth/weak-password':
            alert('Weak password');
            break;
          default:
            alert('Something went wrong');
        }
  
        return;
      }
  
      commit('SET_USER', auth.currentUser);
  
      router.push('/');
    },

    async logout({ commit }) {
      await signOut(auth);

      commit('CLEAR_USER');

      router.push('/login');
    },

    async fetchUser({ commit }, router: Router) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit('CLEAR_USER');
        } else {
          commit('SET_USER', user);

          await router.isReady();
          if (router.currentRoute.value.path === '/login') {
            router.push('/');
          }
        }
      });
    },
  },
});
