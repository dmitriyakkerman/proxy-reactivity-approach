# proxy-reactivity-approach

Primitive approach of reactivity system similar to Vue.js 3.

## Usage

```js
let state = reactive({
    count: 0
});

watchEffect(() => {
    console.log(state.count)
});

setInterval(() => {
    state.count++;
}, 1000);

```

