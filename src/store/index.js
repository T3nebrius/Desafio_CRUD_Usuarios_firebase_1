import { createStore } from "vuex";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    updateUser(state, updatedUser) {
        const index = state.users.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
    },
    removeUser(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      commit("setUsers", users);
    },
    async createUser({ commit }, user) {
      const docRef = await addDoc(collection(db, "users"), user);
      commit("addUser", { id: docRef.id, ...user });
    },
    async updateUser({ commit }, user) {
        const userDoc = doc(db, "users", user.id);
        await updateDoc(userDoc, { name: user.name, email: user.email });
        commit("updateUser", user);
    },
    async deleteUser({ commit }, userId) {
      await deleteDoc(doc(db, "users", userId));
      commit("removeUser", userId);
    },
  },
});
