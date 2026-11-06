import type { ElementPropsType, ElementConstructorType, HTMLElementTags } from './types';
declare class Element<T extends HTMLElementTags> {
    dom: T;
    private readonly controller;
    constructor({ tagName, props: { children, className, style, events, key, ...props }, rootElement, }: ElementConstructorType<T>);
    SetProps({ className, children, style, ...props }: Omit<ElementPropsType<T>, 'className'> & {
        className?: ((classList: DOMTokenList) => void) | string | undefined;
    }, isForceUpdate?: boolean): this;
    private SetEvents;
    Destroy(): void;
    Remove(): void;
    OnMount(callback: (e: this) => void): this;
    OnUnMount(callback: (e: this) => void): this;
}
export type { ElementPropsType };
export default Element;
//# sourceMappingURL=index.d.ts.map