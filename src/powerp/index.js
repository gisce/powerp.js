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
        console.debug('login');
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
        return new Model(this, modelname);
    }
}


class Model {
    constructor(client, model) {
        this.client = client;
        this.model = model;
    }

    isLoged() {
        if (!this.client.uid) {
            return false;
        } else {
            return true;
        }
    }

    async search(params, offset=0, limit=false, context=null) {
        console.debug('searching');
        if (!this.isLoged()) {
            throw "First login"
        }
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'search', params, offset, limit
        ];
        return this.client._fetch(payload);
    }

    async create(values) {
        console.debug('creating');
        if (!this.isLoged()) {
            throw "First login"
        }
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'create', values
        ];
        return this._fetch(payload);

    }

    async write(ids, values) {
        console.debug('write');
        if (!this.isLoged()) {
            throw "First login"
        }
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'write', ids, values
        ];
        return this.client._fetch(payload);
    }

    async unlink(ids) {
        console.debug('unlink');
        if (!this.isLoged()) {
            throw "First login"
        }
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'unlink', ids
        ];
        return this.client._fetch(payload);
    }

    async read(ids, fields) {
        console.log('reading');
        if (!this.isLoged()) {
            throw "First login"
        }
        const payload = [
            'execute', this.client.database, this.client.uid,
            this.client.password, this.model, 'read', ids, fields
        ];
        return this.client._fetch(payload);

    }

    async browse(ids) {
        let records = [];
        const results = await this.read(ids);
        results.forEach((result) => {
            const record = new Record(this, id);
            record.data = result;
            records.push(record);
        });
        return records;
    }
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
