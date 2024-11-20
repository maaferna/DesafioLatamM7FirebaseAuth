<template>
    <div class="container mt-5">
      <h2>Welcome to the Home Page</h2>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    setup() {
      const userStore = useUserStore();
  
      const logout = async () => {
        await userStore.logout();
      };
  
      return { logout };
    },
  };
  </script>
  