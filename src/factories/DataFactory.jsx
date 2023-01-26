export class DataFactory {
    constructor() {
        this.id = null
        this.field_id = null
        this.setForm_id = null
        this.setForm_name = null
        this.value = null
        this.label = null
        this.created_at = null
        this.updated_at = null
        this.name = null;
        this.type = 'text';
        this.columns = 12;
        this.list = [];       
    }

    create(props) {
        this.id = props.id
        this.field_id = props.field_id
        this.setForm_id = props.setForm_id
        this.setForm_name = props.setForm_name
        this.name = props.name
        this.value = props.value
        this.type = props.type
        this.list = props.list
        this.columns = props.columns
        this.description = props.description
        this.created_at = props.created_at
        this.updated_at = props.updated_at
    }
}