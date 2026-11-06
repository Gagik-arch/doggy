import { setupChildren } from '../Element/utils';
import { setupClassName, setupStyle } from '../utils';
const svgNS = 'http://www.w3.org/2000/svg';
class SVGElement {
    dom;
    key = undefined;
    constructor({ tagName, props: { children, className, style, ...props }, rootElement, }) {
        this.dom = document.createElementNS(svgNS, tagName);
        if (rootElement) {
            rootElement.appendChild(this.dom);
        }
        this.SetProps({
            className,
            children,
            style,
            ...props,
        });
    }
    SetProps({ className, children, style, ...props }, isForceUpdate = false) {
        if (className !== undefined) {
            setupClassName(className, this.dom);
        }
        if (style !== undefined) {
            setupStyle(style, this.dom);
        }
        if (children !== undefined) {
            setupChildren(children, this.dom, isForceUpdate);
        }
        Object.entries(props)
            .forEach(([name, value]) => {
            this.dom.setAttribute(name, value);
        });
        return this;
    }
    Destroy() {
        this.Remove();
    }
    Remove() {
        this.dom.remove();
    }
    OnMount(callback) {
        if (this.dom.isConnected) {
            callback(this);
            return this;
        }
        const observer = new MutationObserver(() => {
            if (this.dom.isConnected) {
                callback(this);
                observer.disconnect();
            }
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
        return this;
    }
    OnUnMount(callback) {
        const observer = new MutationObserver(() => {
            if (!this.dom.isConnected) {
                callback(this);
                this.Destroy();
                observer.disconnect();
            }
        });
        observer.observe(document, {
            childList: true,
            subtree: true,
        });
        return this;
    }
}
export default SVGElement;
//# sourceMappingURL=index.js.map