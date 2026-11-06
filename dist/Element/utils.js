import { mergeAttributes } from '../utils';
export function compareProps(oldNode, newNode) {
    if (!oldNode || !newNode)
        return false;
    const oldNAttrs = oldNode.attributes;
    const newNAttrs = newNode.attributes;
    if (oldNode.tagName !== newNode.tagName)
        return false;
    if (oldNAttrs.length !== newNAttrs.length)
        return false;
    for (const attr of oldNAttrs) {
        if (newNode.getAttribute(attr.name) !== attr.value) {
            return true;
        }
    }
    return false;
}
function keyedDiff(dom, newChildren) {
    const oldChildren = Array.from(dom.children);
    const oldByKey = new Map(oldChildren.map(child => [
        child.__key,
        child
    ]));
    const newKeys = new Set(newChildren.map(child => child.__key));
    for (const child of oldChildren) {
        if (!newKeys.has(child.__key)) {
            child.remove();
        }
    }
    let anchor = dom.firstElementChild;
    for (const newChild of newChildren) {
        let current = oldByKey.get(newChild.__key);
        if (!current) {
            dom.insertBefore(newChild, anchor);
            anchor = newChild.nextElementSibling;
            continue;
        }
        if (current.tagName !== newChild.tagName) {
            current.replaceWith(newChild);
            oldByKey.set(newChild.__key, newChild);
            current = newChild;
        }
        else if (compareProps(current, newChild)) {
            mergeAttributes(current, newChild);
        }
        if (current !== anchor) {
            dom.insertBefore(current, anchor);
        }
        anchor = current.nextElementSibling;
    }
}
function unKeyedDiff(dom, newChildren) {
    const oldChildren = Array.from(dom.childNodes);
    const max = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < max; i++) {
        const oldNode = oldChildren[i];
        const newNode = newChildren[i];
        let shouldReplace;
        if (oldNode?.nodeType === Node.ELEMENT_NODE && newNode?.nodeType === Node.ELEMENT_NODE) {
            shouldReplace = compareProps(oldNode, newNode) || oldNode.innerHTML !== newNode.innerHTML;
        }
        else {
            shouldReplace = oldNode !== newNode;
        }
        if (!oldNode && newNode) {
            dom.append(newNode);
        }
        else if (oldNode && !newNode) {
            dom.removeChild(oldNode);
        }
        else if (oldNode && newNode && shouldReplace) {
            oldNode.replaceWith(newNode);
        }
    }
}
export function setupChildren(children, dom, isForceUpdate) {
    if (children) {
        const newChildren = typeof children === 'function'
            ? Array.from(children(new Set(dom.childNodes)))
            : children;
        const extracted = newChildren.filter(Boolean);
        if (isForceUpdate) {
            dom.replaceChildren(...extracted);
        }
        else {
            const isAvailableKey = [...dom.children][0]?.__key;
            if (isAvailableKey) {
                keyedDiff(dom, extracted); //  NOTE: key in element
            }
            else { //  NOTE: not key in element
                unKeyedDiff(dom, extracted);
            }
        }
    }
}
//# sourceMappingURL=utils.js.map