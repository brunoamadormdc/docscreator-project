export class FieldFactory {
    constructor() {
        this.id = null
        this.label = null;
        this.name = null;
        this.type = 'text';
        this.value = null;
        this.columns = 12;
        this.list = [];
        this.wrapper = null;
    }

    create(props) {
        this.id = props.id
        this.label = props.label;
        this.name = props.name;
        this.type = props.type;
        this.value = props.value;
        this.columns = props.columns;
        this.list = props.list;
    }

}

