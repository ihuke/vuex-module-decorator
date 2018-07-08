<template>
  <div id="app">
    <h2>1.Root Module</h2>
    <Counter />
    <h2>2.Namespaced Module</h2>
    <Board />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Counter from "@/components/Counter.vue";
import Board from "@/components/Board.vue";

@Component({
  components: {
    Counter,
    Board
  }
})
export default class Home extends Vue {}
</script>
