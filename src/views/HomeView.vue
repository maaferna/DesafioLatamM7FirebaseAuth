<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="mb-4">Bienvenido a la Página de Inicio</h2>
            
            <div v-if="userStore.user" class="mb-4">
              <p class="lead">
                Usuario actual: {{ userStore.user.email }}
              </p>
            </div>

            <button 
              @click="handleLogout" 
              class="btn btn-danger"
              :disabled="isLoggingOut"
            >
              {{ isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión' }}
            </button>
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
      userStore: useUserStore(),
      isLoggingOut: false
    };
  },

  methods: {
    async handleLogout() {
      if (this.isLoggingOut) return;

      try {
        this.isLoggingOut = true;
        await this.userStore.logout(this.$router);
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Error al cerrar sesión. Por favor, inténtalo nuevamente.');
      } finally {
        this.isLoggingOut = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
}

.card-body {
  padding: 2rem;
}

.btn-danger {
  padding: 0.5rem 2rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
}

.btn-danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
</style>