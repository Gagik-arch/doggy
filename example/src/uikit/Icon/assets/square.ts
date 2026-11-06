import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function Square(props: SVGElementPropsType) {
    return (
        new SVGElement({
            tagName: 'svg',
            props: {
                viewBox: '0 0 24 24',
                stroke: 'currentColor',
                fill: 'none',
                xmlns: 'http://www.w3.org/2000/svg',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                ...props,
                children: [
                    new SVGElement<SVGRectElement>({
                        tagName: 'rect',
                        props: {
                            x: 3,
                            y: 3,
                            width: 18,
                            height: 18,
                            rx: 2,
                            ry: 2,
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Square;
