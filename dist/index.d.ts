import './global';
import Element from './Element';
import Fragment from './Fragment';
import Store from './store';
import SVGElement from './SVGElement';
declare const createRoot: (rootElement: HTMLElement, app: (string | HTMLElement | DocumentFragment)[] | DocumentFragment) => void;
declare const nuvo: {
    readonly Element: typeof Element;
    readonly Store: typeof Store;
    readonly Fragment: typeof Fragment;
    readonly SVGElement: typeof SVGElement;
    readonly createRoot: typeof createRoot;
};
export { Element, Store, Fragment, SVGElement, createRoot };
export default nuvo;
//# sourceMappingURL=index.d.ts.map