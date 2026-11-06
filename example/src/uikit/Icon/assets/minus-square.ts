import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function MinusSquare(props: SVGElementPropsType) {
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
                strokeWidth: 3,
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
                    }).dom, new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            x1: 8,
                            y1: 12,
                            x2: 16,
                            y2: 12,
                        },
                    }).dom

                ],
            },
        }).dom
    );
}

export default MinusSquare;
