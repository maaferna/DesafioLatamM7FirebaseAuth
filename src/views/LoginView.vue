<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  id="email"
                  v-model="email" 
                  class="form-control" 
                  required 
                  :disabled="isLoading"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input 
                  type="password" 
                  id="password"
                  v-model="password" 
                  class="form-control" 
                  required 
                  :disabled="isLoading"
                />
              </div>
              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Iniciando sesión...' : 'Login' }}
              </button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/signup">¿No tienes cuenta? Regístrate</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      if (this.isLoading) return;
      
      this.isLoading = true;
      const userStore = useUserStore();
      
      try {
        await userStore.login(this.email, this.password, this.$router);
      } catch (error) {
        console.error("Login Error:", error);

        let errorMessage = "Error en el inicio de sesión. Por favor, verifica tus credenciales.";
        if (error.code === "auth/wrong-password") {
          errorMessage = "Contraseña incorrecta. Intenta nuevamente.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "Usuario no encontrado. Verifica tu email o regístrate.";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage = "Credenciales inválidas. Intenta nuevamente.";
        }

        alert(errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>




