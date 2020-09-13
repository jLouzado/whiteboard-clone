# whiteboard-clone

Created with CodeSandbox

## TODOs

### Event Delegation

```ts
const updateState = (
  ev: Event & { target: EventTarget | HTMLElement | null }
) => {
  if (ev.target instanceof HTMLElement) {
    ev.target.closest()
  }
}
```
