# whiteboard-clone

## Setup

```bash
yarn
yarn start
```

## Tests

```bash
yarn test
```

## Architecture

- Canvas is handled natively, no VDom or anything
- The tools on the left are rendered and managed with Snabbdom, mostly for DX sake
- As far as the app is concerned state is immutable, it's just updated by the dispatcher in index.js
  - for now it's just standard objects for the state since it's relatively flat, but as the application gets more complex some kind of immutability solution might need to be brought in.
- The Writing "Instruments" are initialized in the state, so that `onDraw` the actual instrument being used is abstracted away.

## Challenges

- I think the most challenging requirement was to only have one highlighter-stroke drawn at a time.
- As you can see, I tried 3 different implementations to get it working
  - finally I realized I needed to clear the canvas before redrawing it 🤦‍♂
