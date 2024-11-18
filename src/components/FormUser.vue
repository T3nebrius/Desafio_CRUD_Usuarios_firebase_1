<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Agregar Usuario</h2>
      <form @submit.prevent="submitForm" class="card p-4 shadow-sm">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre:</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Ingresa el nombre"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Correo:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Ingresa el correo"
            required
          />
        </div>
        <button class="btn btn-primary w-100" type="submit"><i class="fa fa-user"></i> Agregar Usuario</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
      };
    },
    methods: {
      ...mapActions(["createUser"]),
      async submitForm() {
        if (this.name && this.email) {
          await this.createUser({ name: this.name, email: this.email });
          this.name = "";
          this.email = "";
        }
      },
    },
  };
  </script>
  