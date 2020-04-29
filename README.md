## Store

```javascript
const context = {};
const context2 = {};
const data = {
  patients: {
    status: 'loading',
    entry: [],
  },
  exam: {
    status: 'loading',
    entry: [],
  },
  askCenter: {
    status: 'loading',
    entry: [],
  },
  summary: {
    status: 'loading',
    entry: [],
  },
};

const prepareStore = (data) => {};
```

1. 初始化的時候去 add context 在 App (data)
2. locale 的部分初始化的時候一樣用 context。
3. 其實這樣就夠了，剩下的部分就讓 app 本身去煩惱。
4. 看來還是要用 `window.store` 這招會比較好
