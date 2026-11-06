import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function Triangle(props: SVGElementPropsType) {
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
                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Triangle;
