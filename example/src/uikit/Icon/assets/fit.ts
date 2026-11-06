import {
    SVGElement
} from '@lib/index';
import type { SVGElementPropsType } from '@lib/SVGElement';

function Fit(props: SVGElementPropsType) {
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
                            d: 'M3 7V5a2 2 0 0 1 2-2h2',
                        },
                    }).dom,

                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            d: 'M17 3h2a2 2 0 0 1 2 2v2',
                        },
                    }).dom,

                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            d: 'M21 17v2a2 2 0 0 1-2 2h-2',
                        },
                    }).dom,

                    new SVGElement<SVGPathElement>({
                        tagName: 'path',
                        props: {
                            d: 'M7 21H5a2 2 0 0 1-2-2v-2',
                        },
                    }).dom,

                    new SVGElement<SVGRectElement>({
                        tagName: 'rect',
                        props: {
                            x: 7,
                            y: 8,
                            width: 10,
                            height: 8,
                            rx: 1,
                        },
                    }).dom
                ],
            },
        }).dom
    );
}

export default Fit;
