import './global';
import Element from './Element';
import Fragment from './Fragment';
import Store from './store';
import SVGElement from './SVGElement';
const createRoot = (rootElement, app) => {
    if (Array.isArray(app)) {
        rootElement.append(...app);
    }
    else {
        rootElement.appendChild(app);
    }
};
const nuvo = {
    Element,
    Store,
    Fragment,
    SVGElement,
    createRoot
};
if (typeof window !== 'undefined') {
    window['@'] = nuvo;
}
export { Element, Store, Fragment, SVGElement, createRoot };
export default nuvo;
//# sourceMappingURL=index.js.map