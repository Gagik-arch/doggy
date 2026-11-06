import { describe, expect, it } from 'vitest';
import Fragment from '../src/Fragment';

describe('Fragment', () => {
    it('returns a DocumentFragment containing supplied nodes in order', () => {
        const first = document.createElement('span');
        const second = document.createElement('strong');

        const fragment = Fragment([first, 'middle', second]);

        expect(fragment).toBeInstanceOf(DocumentFragment);
        expect(fragment.childNodes).toHaveLength(3);
        expect(fragment.childNodes[0]).toBe(first);
        expect(fragment.childNodes[1].textContent).toBe('middle');
        expect(fragment.childNodes[2]).toBe(second);
    });

    it('moves its children into a root when appended', () => {
        const root = document.createElement('main');
        const fragment = Fragment(['one', document.createElement('hr')]);

        root.appendChild(fragment);

        expect(root.childNodes).toHaveLength(2);
        expect(root.textContent).toBe('one');
        expect(fragment.childNodes).toHaveLength(0);
    });

    it('supports an empty fragment', () => {
        expect(Fragment([]).childNodes).toHaveLength(0);
    });
});
