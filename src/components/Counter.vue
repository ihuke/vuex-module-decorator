<template>
    <div>
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Module from "../../module";
import counter from "@/store/counter";

@Component
@Module(counter, { namespace: "" })
export default class Counter extends Vue {}
</script>
