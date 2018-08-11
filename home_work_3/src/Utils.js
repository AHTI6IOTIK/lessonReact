class Utils {

    getStringObject(object) {
        return JSON.stringify(object)
    }

    create(table, data) {
        if (!table) return 'error table undefined';
        const object = this.getStringObject(data);

        return `http://test/?act=create&table=${table}&object=${object}`;
    }

    update(action, table, data, where) {

        const object = this.getStringObject(data);
        const whereObj = this.getStringObject(where);

        return `http://test/?act=${action}&table=${table}&object=${object}&where=${whereObj}`
    }

    delete(table, where) {
        const whereObj = this.getStringObject(where);
        return `http://test/?act=delete&table=${table}&where=${whereObj}`;
    }

    get(action, table, data, where) {

        const object = this.getStringObject(data);
        const whereO = this.getStringObject(where);

        return `http://test/?act=${action}&table=${table}&object=${object}&where=${whereO}`;
    }
}

export default new Utils();