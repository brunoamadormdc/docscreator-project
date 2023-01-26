export class FieldFactory {
    constructor() {
        this.id = null
        this.docName = null;
        this.docHTML = '';
        this.docDatatype = null
    }

    create(props) {
        this.id = Math.random().toString()
        this.docName = props.docName;
        this.docHTML = props.docHTML;
        this.docDatatype = props.docDatatype
    }

}

