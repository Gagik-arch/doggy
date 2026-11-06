export function camelToKebab(str) {
    return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
}
export function setupClassName(className, dom) {
    if (!dom || !className)
        return;
    if (typeof className === 'function') {
        className(dom.classList);
    }
    else {
        if (dom.className !== className) {
            dom.classList.value = className;
        }
    }
}
export function setupInnerHtml(oldChild, newChild) {
    if (oldChild.innerHTML !== newChild.innerHTML) {
        oldChild = newChild;
    }
}
export function setupStyle(style, dom) {
    if (!style)
        return;
    Object.entries(style)
        .forEach(([property, value]) => {
        if (!value)
            return;
        dom?.style.setProperty(camelToKebab(property), value.toString());
    });
}
export const isPlainObject = (value) => {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};
export const isEqualObjects = (a, b) => {
    if (Object.is(a, b)) {
        return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!isEqualObjects(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    if (isPlainObject(a) && isPlainObject(b)) {
        const keysA = Reflect.ownKeys(a);
        const keysB = Reflect.ownKeys(b);
        if (keysA.length !== keysB.length) {
            return false;
        }
        for (const key of keysA) {
            if (!Object.prototype.hasOwnProperty.call(b, key)) {
                return false;
            }
            if (!isEqualObjects(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
};
export function mergeAttributes(oldChild, newChild) {
    for (let i = 0; i < newChild.getAttributeNames().length; i++) {
        const oldChildAtt = oldChild.attributes[i];
        const newChildAtt = newChild.attributes[i];
        if ((oldChildAtt && newChildAtt) && oldChildAtt?.name === newChildAtt?.name && oldChildAtt?.value !== newChildAtt?.value) {
            oldChild.setAttribute(oldChildAtt.name, newChildAtt.value);
        }
    }
}
//# sourceMappingURL=utils.js.map