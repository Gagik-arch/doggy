import type { DOMElement } from './Element/types';
export declare function camelToKebab(str: string): string;
export declare function setupClassName(className?: ((classList: DOMTokenList) => void) | string | undefined, dom?: Element): void;
export declare function setupInnerHtml(oldChild: DOMElement, newChild: DOMElement): void;
export declare function setupStyle(style: DOMElement['style'] | undefined, dom?: DOMElement): void;
export declare const isPlainObject: (value: unknown) => value is Record<string, unknown>;
export declare const isEqualObjects: (a: unknown, b: unknown) => boolean;
export declare function mergeAttributes(oldChild: DOMElement, newChild: DOMElement): void;
//# sourceMappingURL=utils.d.ts.map