# import-map-to-policy

Sample application is in `main.js`.

## Setting up

```sh
npm ci
```

## Browser application with `importmap`

To try it out with the builtin `importmap`-s in Chrome, run `npm start` and navigate the browser
to <http://localhost:5000/page>. It should show `42` in the page (you need to use at least Chrome 89).

## Node application with `policy.json`

To try it out with the policy, run `npm run start:node`. You should see `42` output.

(currently doesn't work!)
