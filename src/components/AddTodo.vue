<template>
  <div>
    <h3>Add Todo</h3>
    <div class="add">
      <form @submit.prevent="onSubmit">
        <input type="text" v-model="title" placeholder="Add Todo..." />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit() {
      this.addTodo(this.title);
    },
  },
};
</script>

<style>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 2px solid #41b883;
  outline: 0;
  border-radius: 5px 0 0 5px;
}

input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px solid #41b883;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  font-weight: bold;
}
</style>