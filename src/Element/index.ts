import type {
    ElementPropsType, ElementConstructorType, HTMLElementTags, EventType, VirtualHTMLElement
} from './types';
import {
    isPlainObject, setupClassName, setupStyle
} from '../utils';
import { setupChildren } from './utils';

class Element<T extends HTMLElementTags> {
    public dom: T;
    private readonly controller = new AbortController();

    public constructor({
        tagName,
        props: {
            children,
            className,
            style,
            events,
            key,
            ...props
        },
        rootElement,
    }: ElementConstructorType<T>) {
        this.dom = document.createElement(tagName) as T;

        const virtualDom = this.dom as VirtualHTMLElement;

        if (key) {
            virtualDom.__key = key;
        }
        
        if (rootElement) {
            rootElement.appendChild(this.dom);
        }

        this.SetProps(
            {
                className,
                children,
                style,
                ...props,
            } as Omit<ElementPropsType<T>, 'className'> & {
                className?: ((classList: DOMTokenList) => void) | string | undefined;
            }
        );

        this.SetEvents(events);
    }

    public SetProps(
        {
            className,
            children,
            style,
            ...props
        }: Omit<ElementPropsType<T>, 'className'> & {
            className?: ((classList: DOMTokenList) => void) | string | undefined;
        },
        isForceUpdate = false
    ) {
        if (className !== undefined) {
            setupClassName(
                className,
                this.dom
            );
        }

        if (style !== undefined) {
            setupStyle(
                style,
                this.dom
            );
        }

        if (children !== undefined) {
            if (!Array.isArray(children)) { 
                  throw new Error( 'Nuvo: Children must be an array.' );
            }

            setupChildren(
                children,
                this.dom,
                isForceUpdate
            );
        }

        Object.entries(props).forEach(([name, value]) => {
            if (name === 'events' || isPlainObject(value))  return;

            // HTMLInputElement / HTMLTextAreaElement value
            if (
                name === 'value' &&
                (
                    this.dom instanceof HTMLInputElement ||
                    this.dom instanceof HTMLTextAreaElement
                )
            ) {
                const nextValue = value == null ? '' : String(value);

                if (this.dom.value !== nextValue) {
                    this.dom.value = nextValue;
                    this.dom.setAttribute(name, nextValue);
                }

                return;
            }

            // DOM properties
            if (name in this.dom) {
                const currentValue = (this.dom as any)[name];

                if (currentValue !== value) {
                    (this.dom as any)[name] = value ?? '';
                }

                return;
            }

            // HTML attributes
            if (value == null || value === '' || value === undefined) {
                this.dom.removeAttribute(name);
                return;
            }

            const nextValue = String(value);

            if (this.dom.getAttribute(name) !== nextValue) {
                this.dom.setAttribute(name, nextValue);
            }
        });

        return this;
    }

    private SetEvents(
        events: EventType<T> | undefined
    ) {
        if (events) {
            Object.entries<EventType<T>[keyof EventType<T>]>(events)
                .forEach(([
                    type,
                    listener 
                ]) => {
                    this.dom.addEventListener(
                        type.replace(/^on/, ''),
                        listener as EventListener,
                        { signal: this.controller.signal }
                    );

                });
        }
    }

    public Destroy() {
        this.controller.abort('Element event is destroyed.');
        
        this.Remove();
    }

    public Remove() {
        this.dom.remove();
    }

    public OnMount(callback: (e: this) => void) {
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

    public OnUnMount(callback: (e: this) => void) {
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

export type { ElementPropsType };

export default Element;
