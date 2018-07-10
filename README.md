# vuex-module-decorator

Programming vuex module as viewmodle/redux.

## Description

标准的 vuex 开发流程中，调用 store 时需手动添加 mapState、mapGetters、mapMutations、mapActions，显得非常繁琐。vuex-module-decorator 组件的目的是将 store 中的 State、Getter 等自动映射到 vue 组件中，实现类似 viewmodle/redux 的开发体验。

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

1.编写 store
(建议采用 module 模式)

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

2.在 Vue 中引用 store 定义，并使用 namespace 参数声明 module 名称

- namespace 参数未定义时，module 名称缺省使用以小写开头的 Component 名，本例即为 Board->board
- namespace 值为""时，表示为 store 中的 root 节点。

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
