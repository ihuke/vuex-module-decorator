# vuex-module-decorator

Programming vuex module as viewmodle/redux.

## Description

When programming vuex,we must manual invoke it by mapState、mapGetters、mapMutations、mapActions...,How tedious it's! Now vuex-module-decorator will automatic mapping store's module (state、getter、mutation、action) to vue,it's like programming viewmodel/redux。

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex)
- [vue-class-component](https://github.com/vuejs/vue-class-component)

## Installation

```bash
$ npm install --save vuex-module-decorator
# or
$ yarn add vuex-module-decorator
```

## Example

1.programming store's module

```ts
export default {
  namespaced: true,
  state: {
    amount: 10000
  },
  getters: {
    amounts: ({ amount }) => {
      ...
    }
  },
  mutations: {
    [COUNTER_UPDATER](state, payload: number) {
      ...
    }
  },
  actions: {
    update(context) {
      ...
    }
  }
};
```

2.import module

- if namespace is nudefined，component's name（lowercase the first letters）will be module's name，like example: Board->board
- if namespace is ""，it's meaning mapping store's root module。

```ts
import Module from "../../module";
import board from "@/store/board";

@Component
@Module(board, { namespace: "board" })
export default class Board extends Vue {
  // declare vuex action if need manual invoke
  update!: Function;

  invoke() {
    this.update();
  }
}
```
