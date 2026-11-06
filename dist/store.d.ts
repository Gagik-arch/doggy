declare class Store<T> {
    private state;
    private listeners;
    constructor(initialState: T);
    Subscribe(callback: (state: T) => void): () => void;
    Effect(callback: (state: T) => void): () => void;
    SetState(newState: T | ((prev: T) => T)): void;
    GetState(): T;
    private Notify;
}
export default Store;
//# sourceMappingURL=store.d.ts.map