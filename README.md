# PowERP.js

A TypeScript implementation for a PowERP client.

## Example

```javascript
import { Client } from "./client";
import { Model } from "./model";

// First we get authenticate in order to get the token
const token = await Client.loginAndGetToken({
    host: process.env.ERP_HOST!,
    database: process.env.ERP_DB!,
    user: process.env.ERP_USER!,
    password: process.env.ERP_PASSWORD!,
});

// Then we can make further calls passing the token
const result = await Model.search(
    {
        model: "res.partner",
        params: [["id", "=", "1"]],
    },
    {
        host: process.env.ERP_HOST!,
        database: process.env.ERP_DB!,
        token,
    }
);
```

## Running tests

First adjust your `.env` file in order to fulfill the proper host, database and auth details.

```shell
$ npm install
$ npm test
```
