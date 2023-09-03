const getUUID = (() => {
    let i = 0;
    return (name = "") => `${name}${++i}`;
})();

class Model {
    _name;
    _uuid;

    constructor(name) {
        this._name = name;
        this._uuid = getUUID(this._name);
    }

    get uuid() {
        return this._uuid;
    }

    initialize() {
        //
    }

    destroy() {
        //
    }
}

export default Model;
