import { describe, expect, it, vi } from 'vitest';
import Store from '../src/store';

describe('Store', () => {
    it('returns its initial state', () => {
        const store = new Store({ count: 1 });
        expect(store.GetState()).toEqual({ count: 1 });
    });

    it('notifies subscribers when primitive state changes', () => {
        const store = new Store(1);
        const listener = vi.fn();
        store.Subscribe(listener);

        store.SetState(2);

        expect(store.GetState()).toBe(2);
        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith(2);
    });

    it('does not notify when primitive state is unchanged', () => {
        const store = new Store('same');
        const listener = vi.fn();
        store.Subscribe(listener);

        store.SetState('same');

        expect(listener).not.toHaveBeenCalled();
    });

    it('supports functional updates', () => {
        const store = new Store(4);
        store.SetState(previous => previous + 3);
        expect(store.GetState()).toBe(7);
    });

    it('notifies when a plain object changes deeply', () => {
        const store = new Store({ user: { name: 'Ada' }, active: true });
        const listener = vi.fn();
        store.Subscribe(listener);

        store.SetState({ user: { name: 'Grace' }, active: true });

        expect(listener).toHaveBeenCalledTimes(1);
        expect(store.GetState().user.name).toBe('Grace');
    });

    it('does not notify for deeply equal plain objects', () => {
        const store = new Store({ nested: { value: 1 }, list: [1, 2] });
        const listener = vi.fn();
        store.Subscribe(listener);

        store.SetState({ nested: { value: 1 }, list: [1, 2] });

        expect(listener).not.toHaveBeenCalled();
    });

    it('returns an unsubscribe function', () => {
        const store = new Store(0);
        const listener = vi.fn();
        const unsubscribe = store.Subscribe(listener);

        unsubscribe();
        store.SetState(1);

        expect(listener).not.toHaveBeenCalled();
    });

    it('Effect runs immediately and on subsequent changes', () => {
        const store = new Store(10);
        const effect = vi.fn();
        const cleanup = store.Effect(effect);

        expect(effect).toHaveBeenNthCalledWith(1, 10);
        store.SetState(11);
        expect(effect).toHaveBeenNthCalledWith(2, 11);

        cleanup();
        store.SetState(12);
        expect(effect).toHaveBeenCalledTimes(2);
    });

    it('notifies each active subscriber once', () => {
        const store = new Store(0);
        const first = vi.fn();
        const second = vi.fn();
        store.Subscribe(first);
        store.Subscribe(second);

        store.SetState(1);

        expect(first).toHaveBeenCalledTimes(1);
        expect(second).toHaveBeenCalledTimes(1);
    });
});
