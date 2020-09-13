# whiteboard-clone

Created with CodeSandbox

## TODOs

### General

- set width to thick when switching to highlighter
- separate color set for highlighters

### Event Delegation

```ts
const updateState = (
  ev: Event & {target: EventTarget | HTMLElement | null}
) => {
  if (ev.target instanceof HTMLElement) {
    ev.target.closest()
  }
}
```
