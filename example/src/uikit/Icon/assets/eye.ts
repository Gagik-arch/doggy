import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function Eye(props: SVGElementPropsType) {
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
                            d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
                        },
                    }).dom, new SVGElement<SVGCircleElement>({
                        tagName: 'circle',
                        props: {
                            cx: 12,
                            cy: 12,
                            r: 3,
                        },
                    }).dom

                ],
            },
        }).dom
    );
}

export default Eye;
