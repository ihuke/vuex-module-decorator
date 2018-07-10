import { mapState, mapGetters, mapActions, mapMutations, StoreOptions } from "vuex";
import Vue, { ComponentOptions } from "vue";
export interface moduleOption {
    namespace?: string;
    fields?: Array<string>;
}
export declare type MapType = typeof mapState | typeof mapGetters | typeof mapActions | typeof mapMutations;
export declare type VueClass<V> = {
    new (...args: any[]): V & Vue;
} & typeof Vue;
export interface moduleDecorator {
    <V extends VueClass<Vue>>(proto: V): void;
}
export declare type DecoratedClass = VueClass<Vue> & {
    __decorators__?: ((options: ComponentOptions<Vue>) => void)[];
};
export default function Module(store: StoreOptions<object>, option?: moduleOption): moduleDecorator;
