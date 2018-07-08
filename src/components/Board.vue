<template>
<div>
    <p>
    <button  @click="invoke">invoke vuex action</button>
    </p>
    <div class="counter">
        <span class="count" v-for="(item,index) in amounts" :key="index">{{item}}</span>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Module from "../../module";
import board from "@/store/board";

@Component
@Module(board, { namespace: "board" })
export default class Board extends Vue {
  // declare vuex action
  update!: Function;

  invoke() {
    this.update();
  }
}
</script>

<style lang="scss" scoped>
.counter {
  .count {
    display: inline-block;
    position: relative;
    color: #03c7ff;
    font-family: Arial-BoldMT;
    font-size: 33px;
    line-height: 36px;
    background: #022e41;
    border-radius: 2px;
    padding: 3px;
    margin-right: 1px;
    font-weight: bolder;
    &::after {
      content: "";
      display: block;
      border-top: 1px solid #00415e;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
    }
  }
}
</style>
