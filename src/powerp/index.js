import axios from 'axios';


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

    search(params, offset, limit, context) {

    }

    create(values) {

    }

    write(ids, values) {

    }

    unlink(ids) {

    }

    read(params, fields, offset=0, limit=80) {
      console.log('reading');
      return axios.get(this.client.host + '/' + this.model, {
        params: {
          filter: JSON.stringify(params),
          fields: JSON.stringify(fields),
          offset: offset,
          limit: limit,
        },
      });
    }

    browse(ids) {
        let records = [];
        ids.forEach(function(id, index, array) {
            records.push(new Record(this, id));
        });
        return records;
    }
}


class Record {
    constructor(model, id) {
        this.model = model;
        this.id = id;
        this.data = this.read([])
    }

    write(values) {
        this.model.write([id], values);
    }

    unlink() {
        this.model.unlink([id]);
    }

    read(fields) {
        return this.model.read([this.id], fields)[0]
    }
}
