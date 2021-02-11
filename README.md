# PowERP.js

A TypeScript implementation for a PowERP client.

## Install

For the moment you can install this library adding the specific git repository in your `package.json` dependencies, like this:

_package.json_

```json
{
  // ...
  "dependencies": {
    // ...
    "powerp.js": "git://github.com/gisce/powerp.js.git#feature/typescript"
  }
}
```

## Usage

```javascript
import { Client } from "powerp.js";

// ...

const c = new Client({
    host: process.env.ERP_HOST!,
    database: process.env.ERP_DB!,
});

const token = await c.loginAndGetToken({
    user: process.env.ERP_USER!,
    password: process.env.ERP_PASSWORD!,
});
```

## Running tests

First adjust your `.env` file in order to fulfill the proper host, database and auth details. You can get an example copy from `.env.sample`.

Then install the dependencies with:

```shell
$ npm install
```

And therefore you can run the tests using:

```shell
$ npm test
```

## Publishing new versions of the library

If you make any changes in this library and want to use them in your project, you must build it in order to get the updated version:

```shell
$ npm run build
```

This will erase your `dist/` folder and rebuild the library in it. You must push these updated `dist/` files into git.

Then in your project you can simply:

```shell
$ npm update powerp.js
```

## TODO

[ ] Implement pending methods from the old version
[ ] Improve the way to publish this library. NPM public registry?
