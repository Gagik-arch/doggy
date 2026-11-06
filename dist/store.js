import { isEqualObjects, isPlainObject } from './utils';
class Store {
    state;
    listeners = [];
    constructor(initialState) {
        this.state = initialState;
    }
    Subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }
    Effect(callback) {
        callback(this.GetState());
        return this.Subscribe(callback);
    }
    SetState(newState) {
        const state = typeof newState === 'function'
            ? newState(this.state)
            : newState;
        if (isPlainObject(this.state) && isPlainObject(state)) {
            if (!isEqualObjects(this.state, state)) {
                this.state = state;
                this.Notify();
            }
        }
        else {
            if (this.state === state)
                return;
            this.state = state;
            this.Notify();
        }
    }
    GetState() {
        return this.state;
    }
    Notify() {
        this.listeners.forEach((listener) => {
            listener(this.state);
        });
    }
}
export default Store;
//# sourceMappingURL=store.js.map