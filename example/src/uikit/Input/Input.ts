
import type { InputProps } from './types';
import styles from './style.module.css';
import  { Element, Store }  from '@nuvo-js/core'

class Input<T extends string | number = string> extends Element<HTMLLabelElement> {
    public readonly store:  Store<T | undefined>;
    public readonly input: Element<HTMLInputElement>;

    public constructor({
        type = 'text',
        autocomplete = 'off',
        containerClassName = '',
        className = '',
        startContent,
        endContent,
        variant = 'default',
        name = '',
        events,
        onChange,
        onInput,
        min,
        max,
        value,
        step,
        valueType = 'string',
        ...props
    }: InputProps<T>) {
        super({
            tagName: 'label',
            props: {
                className: [
                    styles.root,
                    containerClassName,
                    styles[`container_${variant}`]
                ].join(' '),
            },
        });

        this.store = new Store<T | undefined>(value);

        this.input = new Element<HTMLInputElement>({
            tagName: 'input',
            props: {
                className: [styles.input, className].join(' '),
                type,
                autocomplete,
                name,
                value: value?.toString() ?? '',
                min: typeof min === 'number' ? String(min) : min,
                max: typeof max === 'number' ? String(max) : max,
                step: typeof step === 'number' ? String(step) : step,
                events: {
                    onchange: (e: Event) => {
                        const target = e.currentTarget as HTMLInputElement;

                        const v = (
                            valueType === 'number'
                                ? +target.value
                                : target.value
                        ) as T;

                        this.store.SetState(v);
                        onChange?.(e, v);
                    },

                    oninput: (e: Event) => {
                        const target = e.currentTarget as HTMLInputElement;

                        const v = (
                            valueType === 'number'
                                ? +target.value
                                : target.value
                        ) as T;

                        this.store.SetState(v);
                        onInput?.(e, v);
                    },

                    ...events,
                },
                ...props,
            },
        });

        this.SetProps({
            children: [
                startContent,
                this.input.dom,
                endContent
            ],
        });

        this.store.Effect((value) => {
            const newValue = value == null ? '' : String(value);

            if (this.input.dom.value !== newValue) {
                this.input.dom.value = newValue;
            }
        });
    }

    public SetValue(value: T | undefined) {
        this.store.SetState(value);
    }

    public GetValue() {
        return this.store.GetState();
    }
}

export default Input;
