import { afterEach, describe, expect, it } from 'vitest';
import { createRoot } from '../src';

afterEach(() => document.body.replaceChildren());

describe('createRoot', () => {
    it('appends an array of nodes and strings', () => {
        const root = document.createElement('main');
        const heading = document.createElement('h1');

        createRoot(root, [heading, 'hello']);

        expect(root.childNodes).toHaveLength(2);
        expect(root.firstChild).toBe(heading);
        expect(root.textContent).toBe('hello');
    });

    it('appends a DocumentFragment', () => {
        const root = document.createElement('main');
        const fragment = document.createDocumentFragment();
        fragment.append(document.createElement('span'), 'content');

        createRoot(root, fragment);

        expect(root.childNodes).toHaveLength(2);
        expect(root.textContent).toBe('content');
        expect(fragment.childNodes).toHaveLength(0);
    });

    it('exports the public API', async () => {
        const api = await import('../src');

        expect(api.Element).toBeTypeOf('function');
        expect(api.SVGElement).toBeTypeOf('function');
        expect(api.Store).toBeTypeOf('function');
        expect(api.Fragment).toBeTypeOf('function');
        expect(api.createRoot).toBeTypeOf('function');
        expect(api.default).toMatchObject({
            Element: api.Element,
            SVGElement: api.SVGElement,
            Store: api.Store,
            Fragment: api.Fragment,
            createRoot: api.createRoot,
        });
    });
});
