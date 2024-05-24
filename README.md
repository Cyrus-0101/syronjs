# Syronjs

> This is a hobby framework project exploring the in depths of Javascript got the motivation from the React compiler.

- The inspiration behind this project is the exploration of the how DOM manipulation and business logic can integrate seamlessly.

### Why?

- Working frameworks has always been a mystery to me:
1. How do they work internally? 
1. How do they re-render a component?
1. How do they only update parts of the DOM that change?
1. How does the URL change without a page request to the server?

- These days its uncommon to find applications written in vanilla JavaScript. This is because modern frameworks boost productivity and make it easier to build complex applications.

> It's worth noting frontend frameworks are tools; a means to an end, the end being efficiently building and maintaining (complex) applications.

## Shortcomings?

1. We will only support the [standard HTML namespace](https://www.w3.org/1999/xhtml/) - this means we will expect HTML elements to be defined within the namespace.
1. We will not support [component-scoped CSS](https://www.gatsbyjs.com/docs/how-to/styling/css-modules/). [More on what that is](https://github.com/css-modules/css-modules). Which means our CSS will be global, and class names have to be unique.


## Features
1. [] Virtual DOM Abstraction.
1. [] Reconciliation Algorithm.
1. [] Component-Based Architecture, where each component:
    - [] Has its own state
    - [] Has its own lifecycle methods
    - [] Re-renders itself and its children when its state changes
1. [] A(n) (SPA) Single Page Application Router, that updates the URL without a page request to the server.
1. [] Slots to render content inside a component.
1. [] HTML templates that compile to JavaScript render functions.
1. [] Server Side Rendering (SSR) - Renders the view on the server instead of the browser for faster page loads and better SEO.

#### Framework vs Library

- When you use a kibrary you use its code and call its functions. When you use a framework, you write the code the framework calls.
- The framework is in charge of running the application, and executes your code appropriately.
- I realized I was a framework fanboy but have no idea how they work internally. Like what the hell is a virtual DOM? You mean there's a `reconciliation algorithm` (how browser decides what in the DOM needs updating)?

- The goal of this project si to borrow ideas from Vue , Svelte, React, Preact and Angular just to name a few. It's to build a simple framework that includes some if not most of the features of these frameworks.

- It's worth noting [Svelte does not use the Virtual DOM](https://svelte.dev/blog/virtual-dom-is-pure-overhead), and considers it to be pure overhead.

    <center><video width="320" height="240" controls src="./docs/im-fast.mp4" alt="I'M FAST AF BOIII"/></center>

- But we'll use the [virtual DOM because its really fast](https://www.youtube.com/watch?v=x7cQ3mrcKaY). The virtual DOM is a lightweight copy of the actual DOM. When the state of the application changes, the virtual DOM is updated instead of the actual DOM. The virtual DOM is then compared to the actual DOM and only the differences are updated. This is what makes the virtual DOM so fast.

- For instance, consider the following HTML markup:

```html
    <div class="name">
        <label for="name-input">Name</label>
        <input type="text" id="name-input" />
        <button>Save</button> <!-- Its worth noting that saveName() event handler is typically not shown in the HTML markup, but added programmatically -->
    </div>
```

> The `reconciliation algorithm` is the process that decides what changes need to be made to the browser's DOM to bring it in sync with the virtual DOM. The algorithm is responsible for updating the browser's DOM efficiently.

- Below is a vDOM (Virtual DOM) representation of the HTML markup above:

    ![Virtual DOM](./docs/vdom.png)


#### Hydration
- This is the process by which a framework matches HTML elements with corresponding virtual DOM nodes and attach event handlers to make the HTML interactive on the browser.
- The `hydration algorithm` binds the browser to the virtual DOM, and is responsible for updating the browser's DOM efficiently. SSR requires a server to run, but serving static files is cheaper than rendering pages as users request them.

- It's not React, but its something alright. Below is the architecture of the framework:

    ![SyronJS Framework Architecture](./docs/syronjs-arch.png)

- We will add a [Webpack](https://webpack.js.org/) loader module to compile HTML templates to JavaScript render functions. This will allow us to write HTML templates and have them compiled to JavaScript render functions. Which means instead of writing this:

```javascript
    function render() {
        return h('div', { class: 'container' }, [
            h('h1', {}, ['Look, Ma!']),
            h('p', {}, ["I'm building a framework!"])
            // h() is a function that creates a virtual DOM node
        ])
    }

```

- We can write this:

```html
    <div class="container">
        <h1>Look, Ma!</h1>
        <p>I'm building a framework!</p>
    </div>
```

## How frontend frameworks work
