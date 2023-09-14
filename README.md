# Tabbed navigation
Simple way to change tabs when the content is already in DOM.
So in practice this alone is only usable for UX purposes.

## Usage
```
// This automatically binds all tab selectors
const tabSelector = new TabSelector();

// Bind later after a new element has been inserted into the DOM
tabSelector.enable(<element>);
```

Fires a `tab-change` event to `window` when tab is changed, this can be used to dynamically
load content into it for example.