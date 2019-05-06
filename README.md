# GraceShopper

To get started, run `createdb graceshopper` and then `npm i`.

Actual important stuff:

```
rm -rf js
npm run postinstall
nodemon server
```

Others:

- To seed basic faker data, run `npm run seed-faker`.
- To build everything, run `npm run start:dev`.
- For front end, run `npm run webpack`. Called in postinstall.
- For back end, run `npm run server:build`. Called in postinstall.
