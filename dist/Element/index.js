import { isPlainObject, setupClassName, setupStyle } from '../utils';
import { setupChildren } from './utils';
class Element {
    dom;
    controller = new AbortController();
    constructor({ tagName, props: { children, className, style, events, key, ...props }, rootElement, }) {
        this.dom = document.createElement(tagName);
        const virtualDom = this.dom;
        if (key) {
            virtualDom.__key = key;
        }
        if (rootElement) {
            rootElement.appendChild(this.dom);
        }
        this.SetProps({
            className,
            children,
            style,
            ...props,
        });
        this.SetEvents(events);
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
            if (name === 'events' || isPlainObject(value)) {
                return;
            }
            if (name === 'value' && (this.dom instanceof HTMLInputElement || this.dom instanceof HTMLTextAreaElement)) {
                if (this.dom.value === value) {
                    return;
                }
                else {
                    this.dom.value = value;
                }
            }
            if (name in this.dom) {
                if (value === undefined || value === '') {
                    this.dom.removeAttribute(name);
                }
                else {
                    if (((this.dom)[name] !== undefined) && (this.dom)[name] !== value) {
                        (this.dom)[name] = value;
                    }
                }
            }
            else {
                if (value !== '' && this.dom.getAttribute(name) !== String(value)) {
                    this.dom.setAttribute(name, value);
                }
            }
        });
        return this;
    }
    SetEvents(events) {
        if (events) {
            Object.entries(events)
                .forEach(([type, listener]) => {
                this.dom.addEventListener(type.replace(/^on/, ''), listener, { signal: this.controller.signal });
            });
        }
    }
    Destroy() {
        this.controller.abort('Element event is destroyed.');
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
export default Element;
//# sourceMappingURL=index.js.map