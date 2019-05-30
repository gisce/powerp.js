import {encode, decode} from '@msgpack/msgpack';
import 'whatwg-fetch';


export default class Client {
    constructor(host, database, user, password) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.password = password;
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

    async _fetch(payload) {
        console.log(`Sending ${payload} to ${this.client.host}/object`);
        try {
            const response = await fetch(`${this.client.host}/object`, {
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

    async search(params, offset=0, limit=false, context=null) {
        console.debug('searching');
        const payload = [
            'execute', this.client.database, 1,
            this.client.password, this.model, 'search', params, offset, limit
        ];
        return this._fetch(payload);
    }

    async create(values) {
        console.debug('creating');
        const payload = [
            'execute', this.client.database, 1,
            this.client.password, this.model, 'create', values
        ];
        return this._fetch(payload);

    }

    async write(ids, values) {
        console.debug('write');
        const payload = [
            'execute', this.client.database, 1,
            this.client.password, this.model, 'write', ids, values
        ];
        return this._fetch(payload);
    }

    async unlink(ids) {
        console.debug('unlink');
        const payload = [
            'execute', this.client.database, 1,
            this.client.password, this.model, 'unlink', ids
        ];
        return this._fetch(payload);
    }

    async read(ids, fields) {
        console.log('reading');
        //TODO: Use user id

        const payload = [
            'execute', this.client.database, 1,
            this.client.password, this.model, 'read', ids, fields
        ];
        return this._fetch(payload);

    }

    async browse(ids) {
        let records = [];
        ids.forEach((id) => {
            records.push(new Record(this, id));
        });
        return records;
    }
}


class Record {
    constructor(model, id) {
        this.model = model;
        this.id = id;
        this.data = this.read(this.id, [])
    }

    async write(values) {
        this.model.write([this.id], values);
    }

    async unlink() {
        this.model.unlink([this.id]);
    }

    async read(fields) {
        return this.model.read(this.id, fields)
    }
}
