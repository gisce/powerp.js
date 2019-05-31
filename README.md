# PowERP.js

Javascript client for PowERP and MessagePack protkcol


## Example

```javascript
import Client from 'powerp';


const c = new Client('http://localhost:8068', 'test', 'admin', 'admin');
c.login().then(() => {
    const model = c.model('res.partner');
    model.search([['name', 'ilike', 'asus']]).then((ids) => {
        model.read(ids, ['name', 'vat']).then((results) => {
            results.map((result) => {
                console.log(`Partner ${result.name} vat: ${result.vat}`);
            });
        });
    });
});
```

## Running tests

```shell
$ npm install
$ npm test
```
