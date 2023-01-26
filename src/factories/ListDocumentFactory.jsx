export class ListDocumentFactory {
    constructor() {
        let documents_from_storage = JSON.parse(localStorage.getItem('documents_from_docCreator'))
        let container_from_storage = JSON.parse(localStorage.getItem('general_factory_docCreator'))

        this.container_id = container_from_storage != undefined ? container_from_storage.container_id : null
        this.container_name = container_from_storage != undefined ? container_from_storage.container_name : null
        this.container_setForms = container_from_storage != undefined ? container_from_storage.setForms : []
        this.listDocs = documents_from_storage != undefined ? documents_from_storage : []
        this.listDocsWrapper = null
        this.styles = null
        this.docs_func = null
    
    }

    insertStyles(styles) {
        this.styles = styles
    } 

    insertFunctions(key, func) {
        this[key] = func
    }

    defineWrapper() {
        this.listDocsWrapper = this.createDocWrapper()
        this.updateView()
    }

    createDocWrapper() {
        return (
            <>
            {this.listDocs.length > 0 ? this.listDocs.map((item, index) => <div></div>) : <></>}
            </>
        )
    }

    listDocWrapper() {
        return (
            <>
            {this.listDocs.length > 0 ? this.listDocs.map((item, index) => <div></div>) : <></>}
            </>
        )
    }

    updateView() {
        this.docs_func[1]((prevDocs) => {
            return {
                ...prevDocs,
                ...this
            }
        })
    }
}

const sendTostorage = (item) => {
    let store_itens = {
        listDocs: item.listDocs,
        container_id: item.container_id,
        container_name: item.container_name,
        container_fields: item.container_fields
    }
    localStorage.setItem('data_from_docCreator', JSON.stringify(store_itens))
}