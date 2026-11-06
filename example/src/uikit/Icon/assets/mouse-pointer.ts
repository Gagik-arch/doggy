import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function MousePointer(props: SVGElementPropsType) {
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
                            d: 'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z',
                        },
                    }).dom, new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            d: 'M13 13l6 6',
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default MousePointer;
