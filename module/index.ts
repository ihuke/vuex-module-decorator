import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
  StoreOptions
} from "vuex";

import Vue, { ComponentOptions } from "vue";

export interface moduleOption {
  namespace?: string;
  fields?: Array<string>;
}
export type MapType =
  | typeof mapState
  | typeof mapGetters
  | typeof mapActions
  | typeof mapMutations;

export type VueClass<V> = { new (...args: any[]): V & Vue } & typeof Vue;

export interface moduleDecorator {
  <V extends VueClass<Vue>>(proto: V): void;
}
export type DecoratedClass = VueClass<Vue> & {
  __decorators__?: ((options: ComponentOptions<Vue>) => void)[];
};

export default function Module(
  store: StoreOptions<object>,
  option?: moduleOption
): moduleDecorator {
  return (Component: VueClass<Vue>) => {
    const module = buildNameSpace(Component.name, option);
    const decComponent = Component as DecoratedClass;
    let decorators =
      decComponent.__decorators__ || (decComponent.__decorators__ = []);

    decorators.push(...operate(store.state, "computed", mapState, module));
    decorators.push(...operate(store.getters, "computed", mapGetters, module));
    decorators.push(
      ...operate(store.mutations, "methods", mapMutations, module)
    );
    decorators.push(...operate(store.actions, "methods", mapActions, module));
  };
}

function operate(
  proto: any,
  binging: "computed" | "methods",
  mapFunc: MapType,
  option?: moduleOption
) {
  let result: ((options: ComponentOptions<Vue>) => void)[] = [];
  if (proto) {
    Object.getOwnPropertyNames(proto).forEach(key => {
      if (option && option.fields && option.fields.indexOf(key) === -1) {
        return;
      }
      let namespace = option && option.namespace;
      result.push((options: ComponentOptions<Vue>) => {
        if (!options[binging]) {
          options[binging] = {};
        }
        if (typeof options[binging]![key] === "undefined") {
          options[binging]![key] = namespace
            ? mapFunc(namespace, [key])[key]
            : mapFunc([key])[key];
        }
      });
    });
  }
  return result;
}

function buildNameSpace(
  component: string,
  option?: moduleOption
): moduleOption {
  return option
    ? typeof option.namespace != "undefined"
      ? option
      : { namespace: component, fields: option.fields }
    : { namespace: component };
}
