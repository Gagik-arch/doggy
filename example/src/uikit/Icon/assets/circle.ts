import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function Circle(props: SVGElementPropsType) {
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
                    new SVGElement<SVGCircleElement>({
                        tagName: 'circle',
                        props: {
                            cx: 12,
                            cy: 12,
                            r: 10,
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Circle;
