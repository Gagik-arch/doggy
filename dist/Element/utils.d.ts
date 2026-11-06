import type { Children, DOMElement } from './types';
export declare function compareProps(oldNode: DOMElement | null, newNode: DOMElement | null): boolean;
export declare function setupChildren<T extends DOMElement>(children: ((childNodes: Set<ChildNode>) => Set<ChildNode>) | Children[] | undefined, dom: T, isForceUpdate: boolean): void;
//# sourceMappingURL=utils.d.ts.map