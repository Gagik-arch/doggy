import Element from '@lib/Element';
import Icons from './assets/index';
import type { IconProps } from './types';
import styles from './style.module.css';
import { clsx } from '$/resources/utils';

class Icon extends Element<HTMLSpanElement> {
    public constructor(
        name: keyof typeof Icons,
        props?: IconProps
    ) {
        const {
            size, ..._props
        } = {
            size: 24, ...props,
        };

        super({
            tagName: 'span',
            props: {
                className: clsx(styles.root, _props.className || ''),
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                },
                children: [
                    Icons[name]({
                        width: size,
                        height: size,
                        ..._props,
                    })
                ],
            },
        });
    }
}

export default Icon;
