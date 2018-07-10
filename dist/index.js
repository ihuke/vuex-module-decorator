import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default function Module(store, option) {
    return function (Component) {
        var module = buildNameSpace(Component.name, option);
        var decComponent = Component;
        var decorators = decComponent.__decorators__ || (decComponent.__decorators__ = []);
        decorators.push.apply(decorators, operate(store.state, "computed", mapState, module));
        decorators.push.apply(decorators, operate(store.getters, "computed", mapGetters, module));
        decorators.push.apply(decorators, operate(store.mutations, "methods", mapMutations, module));
        decorators.push.apply(decorators, operate(store.actions, "methods", mapActions, module));
    };
}
function operate(proto, binging, mapFunc, option) {
    var result = [];
    if (proto) {
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (option && option.fields && option.fields.indexOf(key) === -1) {
                return;
            }
            var namespace = option && option.namespace;
            result.push(function (options) {
                if (!options[binging]) {
                    options[binging] = {};
                }
                if (typeof options[binging][key] === "undefined") {
                    options[binging][key] = namespace
                        ? mapFunc(namespace, [key])[key]
                        : mapFunc([key])[key];
                }
            });
        });
    }
    return result;
}
function buildNameSpace(component, option) {
    return option
        ? typeof option.namespace != "undefined"
            ? option
            : { namespace: component, fields: option.fields }
        : { namespace: component };
}
