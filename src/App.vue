<template>
  <div id="app">
    <FormUser />
    <ListUsers />
  </div>
</template>

<script>
import FormUser from "./components/FormUser.vue";
import ListUsers from "./components/ListUsers.vue";

export default {
  components: {
    FormUser,
    ListUsers,
  },
};
</script>
