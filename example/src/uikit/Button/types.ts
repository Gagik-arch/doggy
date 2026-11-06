import type { ElementPropsType } from '../../../../dist/Element/types';

export type ButtonProps = ElementPropsType<HTMLButtonElement> & {
    variant?: 'default' | 'primary' | 'secondary' | 'design';
    onPress?: (e:MouseEvent) => void;
};
