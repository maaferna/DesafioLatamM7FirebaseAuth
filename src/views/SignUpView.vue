// src/views/SignUpView.vue
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h3>Sign Up</h3>
          </div>
          <div class="card-body">
            <div v-if="userStore.error" class="alert alert-danger">
              {{ userStore.error }}
            </div>

            <form @submit.prevent="handleSignUp">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email"
                  v-model="email" 
                  required
                >
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password"
                  v-model="password" 
                  required
                >
              </div>

              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="userStore.loading"
              >
                {{ userStore.loading ? 'Loading...' : 'Sign Up' }}
              </button>
            </form>

            <div class="text-center mt-3">
              <router-link to="/login">Already have an account? Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const email = ref('')
const password = ref('')
const userStore = useUserStore()

const handleSignUp = async () => {
  if (!email.value || !password.value) return
  await userStore.signUp(email.value, password.value)
}
</script>