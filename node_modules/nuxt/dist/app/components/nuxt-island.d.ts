declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    lazy: BooleanConstructor;
    props: {
        type: ObjectConstructor;
        default: () => undefined;
    };
    context: {
        type: ObjectConstructor;
        default: () => {};
    };
    source: {
        type: StringConstructor;
        default: () => undefined;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[][], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    lazy: BooleanConstructor;
    props: {
        type: ObjectConstructor;
        default: () => undefined;
    };
    context: {
        type: ObjectConstructor;
        default: () => {};
    };
    source: {
        type: StringConstructor;
        default: () => undefined;
    };
}>>, {
    lazy: boolean;
    props: Record<string, any>;
    source: string;
    context: Record<string, any>;
}, {}>;
export default _default;
