# @nuvo-js/core

**Nuvo** is a lightweight, TypeScript-first UI library built around native DOM APIs.

Nuvo provides a class-based approach to building web interfaces without Virtual DOM, JSX, or a complex rendering layer. It gives developers direct control over HTML and SVG elements while providing a simple reactive state management system.

## Features

- **DOM-first architecture** — Direct interaction with native DOM elements.
- **TypeScript support** — Generic types and public type definitions.
- **HTML elements** — Create and configure native HTML elements.
- **SVG elements** — Build SVG graphics using the same architecture.
- **Reactive Store** — Manage application state with subscriptions and effects.
- **No Virtual DOM** — No virtual tree or reconciliation process.
- **No JSX required** — Build interfaces using standard JavaScript and TypeScript.
- **Lightweight** — Built around native browser APIs.

## Installation

Install using npm:

```bash
npm install @nuvo-js/core
```

## Usage

### Browser Global

Nuvo is also accessible through the browser global namespace:

```javascript
const nuvo = window['@'];

console.log(nuvo);
```

### ECMAScript Modules

Import `createRoot` from the package and mount your application to a DOM element.

**main.ts**

```typescript
import { createRoot } from '@nuvo-js/core';
import App from './App';

const root = document.getElementById('app');

createRoot(root!, App());
```

**index.html**

```html
<div id="app"></div>
```

## HTML Elements

Create native HTML elements using the `Element` class.

Each instance accepts a configuration object containing a `tagName` and `props`.

```typescript
import { Element } from '@nuvo-js/core';

const element = new Element<HTMLDivElement>({
    tagName: 'div',
    props: {
        className: 'row',
        children: [
            'I am div element.'
        ]
    }
});

document.body.append(element.dom);
```

The `.dom` property provides access to the underlying native DOM element.

### TypeScript Generics

You can specify the native HTML element type using generics:

```typescript
const div = new Element<HTMLDivElement>({
    tagName: 'div',
    props: {
        className: 'container'
    }
});

const button = new Element<HTMLButtonElement>({
    tagName: 'button',
    props: {
        textContent: 'Click me'
    }
});
```

This provides better TypeScript support when working with native DOM elements.

## SVG Elements

Nuvo also provides an `SVGElement` class for creating SVG elements.

You can use it to build reusable SVG components while maintaining TypeScript support.

### Example: Trash Icon

```typescript
import { SVGElement } from '@nuvo-js/core';
import type { SVGElementPropsType } from '@nuvo-js/core/types';

function Trash(props: SVGElementPropsType) {
    return new SVGElement({
        tagName: 'svg',
        props: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...props,
            children: [
                new SVGElement<SVGPolylineElement>({
                    tagName: 'polyline',
                    props: {
                        points: '3 6 5 6 21 6'
                    }
                }).dom,

                new SVGElement<SVGPathElement>({
                    tagName: 'path',
                    props: {
                        d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'
                    }
                }).dom
            ]
        }
    }).dom;
}

export default Trash;
```

The component returns a native SVG DOM element and accepts SVG properties through `SVGElementPropsType`.

## Store

Nuvo includes a reactive `Store` class for application state management.

Create a store by providing an initial state and its corresponding TypeScript type.

### Creating a Store

```typescript
import { Store } from '@nuvo-js/core';

const store = new Store<number[]>([]);
```

### Get State

Retrieve the current state:

```typescript
const state = store.GetState();

console.log(state);
```

### Set State

Update the state by providing a new value:

```typescript
store.SetState([1, 2, 3]);
```

You can also use a callback to update the previous state:

```typescript
store.SetState(prev => [
    ...prev,
    4
]);
```

### Subscribe

Listen for state changes.

`Subscribe()` executes its callback when the store state changes.

```typescript
store.Subscribe(() => {
    console.log('Store updated!');
});
```

### Effect

`Effect()` executes its callback immediately when registered and again whenever the store state changes.

```typescript
store.Effect(() => {
    const state = store.GetState();

    console.log('Current state:', state);
});
```

### Store API Reference

| Method | Description |
|---|---|
| `GetState()` | Returns the current state. |
| `SetState(value)` | Updates the state with a new value. |
| `SetState(callback)` | Updates the state using the previous value. |
| `Subscribe(callback)` | Listens for state changes. |
| `Effect(callback)` | Executes immediately and listens for subsequent state changes. |

## TypeScript Support

Nuvo Core is written in TypeScript and provides public type definitions.

Import types directly from the package:

```typescript
import type {
    ElementPropsType,
    SVGElementPropsType
} from '@nuvo-js/core/types';
```

## Philosophy

Nuvo focuses on simplicity, control, and native browser capabilities.

Rather than introducing another abstraction layer between developers and the DOM, Nuvo provides tools to work directly with the platform.

**Build with JavaScript. Control the DOM. Keep things simple.**

## License

MIT