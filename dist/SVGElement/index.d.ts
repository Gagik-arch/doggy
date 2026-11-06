import type { SVGElementConstructorType, SVGTags, SVGElementPropsType } from './types';
declare class SVGElement<T extends SVGTags> {
    dom: T;
    key?: string | number | undefined;
    constructor({ tagName, props: { children, className, style, ...props }, rootElement, }: SVGElementConstructorType);
    SetProps({ className, children, style, ...props }: SVGElementConstructorType['props'], isForceUpdate?: boolean): this;
    Destroy(): void;
    Remove(): void;
    OnMount(callback: (e: this) => void): this;
    OnUnMount(callback: (e: this) => void): this;
}
export type { SVGElementPropsType };
export default SVGElement;
//# sourceMappingURL=index.d.ts.map