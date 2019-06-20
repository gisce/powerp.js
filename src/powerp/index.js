import {encode, decode} from '@msgpack/msgpack';
import 'whatwg-fetch';


export default class Client {
    constructor(host, database, user, password) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
        this.uid = null
    }

    async login() {
        const payload = [
            'login', this.database, this.user,
            this.password
        ];
        const uid = await this._fetch(payload, 'common');
        console.log(uid);
        if (!uid) {
            throw "Invalid User/Login";
        }
        this.uid = uid;
    }

    async _fetch(payload, service = 'object') {
        if (service != 'common' && !this.uid) {
            throw "First login!";
        }
        console.log(`Sending ${payload} to ${this.host}/${service}`);
        try {
            const response = await fetch(`${this.host}/${service}`, {
                method: 'POST',
                body: encode(payload),
                headers: {
                    'Content-Type': 'application/msgpack'
                }
            });
            const buffer = await response.arrayBuffer();
            const result =  decode(new Uint8Array(buffer));
            console.debug(`Response from API: ${result}`);
            return result;
        } catch (e) {
            console.log(`Error in decoding/fetching: ${e}`);
            throw e;
        }
    }

    model(modelname) {
        return callUndefMethods(new Model(this, modelname));
    }
}

class Model {
    constructor(client, model) {
        this.client = client;
        this.model = model;
    }

    async search(params, offset=0, limit=false, context=null) {
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'search', params, offset, limit
        ];
        return this.client._fetch(payload);
    }

    async create(values) {
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'create', values
        ];
        return this.client._fetch(payload);

    }

    async write(ids, values) {
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'write', ids, values
        ];
        return this.client._fetch(payload);
    }

    async unlink(ids) {
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'unlink', ids
        ];
        return this.client._fetch(payload);
    }

    async read(ids, fields) {
        console.log('reading');
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'read', ids, fields
        ];
        return this.client._fetch(payload);

    }

    async browse(ids) {
        console.log('browsing');
        let records = [];
        const results = await this.read(ids);
        results.forEach((result) => {
            const record = new Record(callUndefMethods(this), result.id);
            record.data = result;
            records.push(record);
        });
        return records;
    }
}

/*
This is a hack using Proxy to call self defined methods in models. We will
try to maintain the base methods of the ERP.
 */

function callUndefMethods(obj) {
    let handler = {
        get(target, propKey, receiver) {
            if (propKey in target) {
                const orig = target[propKey];
                if (orig instanceof Function) {
                    return (...args) => {
                        let result = orig.apply(this, args);
                        return result;
                };
                } else {
                    return orig;
                }

            } else {
                return (...args) => {
                    const payload = [
                        'execute', target.client.database, target.client.uid,
                        target.client.password, target.model, propKey, ...args
                    ];

                    const method = target.client._fetch;
                    let result = method.apply(target.client, [payload, 'object']);
                    return result;
                };
            }
        }
    };
    return new Proxy(obj, handler);
}

class Record {
    constructor(model, id) {
        this.model = model;
        this.id = id;
        this.data = {};
    }

    async write(values) {
        const result = await this.model.write([this.id], values);
        return result;
    }

    async unlink() {
        const result = await this.model.unlink([this.id]);
        return result;
    }

    async read(fields) {
        const result = this.model.read(this.id, fields);
        this.data = result;
        return result;
    }
}
