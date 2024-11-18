<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Lista de Usuarios</h2>
      <ul v-if="users.length" class="list-group">
        <li 
          v-for="user in users" 
          :key="user.id" 
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <!-- Edita usuario -->
          <div v-if="editingUserId === user.id" class="w-100">
            <form @submit.prevent="submitEdit(user.id)" class="row g-2">
              <div class="col-md-5">
                <input
                  v-model="editingName"
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                />
              </div>
              <div class="col-md-5">
                <input
                  v-model="editingEmail"
                  type="email"
                  class="form-control"
                  placeholder="Correo"
                />
              </div>
              <div class="col-md-2 d-flex justify-content-around">
                <button type="submit" class="btn btn-success btn-sm">
                    <i class="fas fa-save"></i>
                    Guardar</button>
                <button
                  @click="cancelEdit"
                  class="btn btn-danger btn-sm"
                ><i class="fas fa-window-close"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
          <!--fin edita usuario-->
  
          <!-- vista usuario con botones edita y eliminar -->
          <div v-else class="d-flex justify-content-between w-100">
            <span>
              <strong>{{ user.name }}</strong> - {{ user.email }}
            </span>
            <div>
              <button @click="startEdit(user)" class="btn btn-warning btn-sm me-2"><i class="fas fa-user-edit"></i>Editar</button>
              <button @click="removeUser(user.id)" class="btn btn-danger btn-sm"><i class="fas fa-user-times"></i>Eliminar</button>
            </div>
          </div>
        </li>
      </ul>
  
      <!-- Mensaje si no hay usuarios -->
      <p v-else class="text-center text-muted mt-4">No hay usuarios registrados.</p>
    </div>
  </template>
  <!-- por mejorar:
   * agregar modal de validación al editar y al eliminar usuario
   * agregar un spinner al cargar el listado de usuarios -->
  
  
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      editingUserId: null,
      editingName: "",
      editingEmail: "",
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    ...mapActions(["fetchUsers", "deleteUser", "updateUser"]),
    async removeUser(userId) {
      await this.deleteUser(userId);
    },
    startEdit(user) {
      this.editingUserId = user.id;
      this.editingName = user.name;
      this.editingEmail = user.email;
    },
    async submitEdit(userId) {
      if (this.editingName && this.editingEmail) {
        await this.updateUser({
          id: userId,
          name: this.editingName,
          email: this.editingEmail,
        });
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.editingUserId = null;
      this.editingName = "";
      this.editingEmail = "";
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
