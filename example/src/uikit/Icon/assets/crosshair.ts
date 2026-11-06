import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function Crosshair(props: SVGElementPropsType) {
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
                    new SVGElement<SVGCircleElement>({
                        tagName: 'circle',
                        props: {
                            cx: 12,
                            cy: 12,
                            r: 10,
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            x1: 22,
                            y1: 12,
                            x2: 18,
                            y2: 12,
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            x1: 6,
                            y1: 12,
                            x2: 2,
                            y2: 12,
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            x1: 12,
                            y1: 6,
                            x2: 12,
                            y2: 2,
                        },
                    }).dom,

                    new SVGElement<SVGLineElement>({
                        tagName: 'line',
                        props: {
                            x1: 12,
                            y1: 22,
                            x2: 12,
                            y2: 18,
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Crosshair;
