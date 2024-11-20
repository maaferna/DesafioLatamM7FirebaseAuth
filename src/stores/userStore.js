import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '../firebaseConfig'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const error = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(true)
  const router = useRouter()

  const initializeAuth = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        isAuthenticated.value = !!currentUser
        loading.value = false
        resolve(currentUser)

      })
    })
  }

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      isAuthenticated.value = true
      error.value = null
      router.push('/home')
    } catch (err) {
      error.value = err.message
      console.error('Sign Up Error:', err)
    }
  }

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      isAuthenticated.value = true
      error.value = null
      router.push('/home')
    } catch (err) {
      error.value = err.message
      console.error('Login Error:', err)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      isAuthenticated.value = false
      error.value = null
      router.push('/login')
    } catch (err) {
      error.value = err.message
      console.error('Logout Error:', err)
    }
  }

  return {
    user,
    error,
    loading,
    isAuthenticated,
    initializeAuth,
    signUp,
    login,
    logout
  }
})