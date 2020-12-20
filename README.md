# PowERP.js

A TypeScript implementation for a PowERP client.

## Example

```javascript
import { Client } from "./client";

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

First adjust your `.env` file in order to fulfill the proper host, database and auth details.

```shell
$ npm install
$ npm test
```
