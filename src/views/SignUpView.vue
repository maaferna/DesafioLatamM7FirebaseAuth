<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h3>Sign Up</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSignUp">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary w-100">Sign Up</button>
            </form>
            <div class="text-center mt-3">
              <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const userStore = useUserStore();

    const handleSignUp = async () => {
      try {
        await userStore.signUp(email.value, password.value, router);
      } catch (error) {
        let errorMessage = "Error al registrarse. Por favor, inténtalo nuevamente.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "El correo electrónico ya está en uso. Por favor, utiliza otro.";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "La contraseña es demasiado débil. Usa una más segura.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Correo electrónico inválido. Verifica y vuelve a intentarlo.";
        }
        alert(errorMessage);
      }
    };

    return {
      email,
      password,
      handleSignUp
    };
  }
};
</script>

