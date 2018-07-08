export const COUNTER_UPDATER = "COUNTER_UPDATER";
const random = () => Math.ceil(Math.random() * 100000000);

export default {
  namespaced: true,
  state: {
    amount: 10000
  },
  getters: {
    amounts: ({ amount }) => {
      let vs = amount ? amount.toString() : "0";
      let result: Array<string> = vs.split("");
      while (result.length < 8) {
        result.unshift("0");
      }
      if (result.length > 8) {
        result.length = 8;
      }
      return result;
    }
  },
  mutations: {
    [COUNTER_UPDATER](state, payload: number) {
      state.amount = payload;
    }
  },
  actions: {
    update(context) {
      context.commit(COUNTER_UPDATER, random());
      setTimeout(() => {
        context.commit(COUNTER_UPDATER, random());
        context.dispatch("update");
      }, 2000);
    }
  }
};
