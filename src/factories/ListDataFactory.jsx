import Title from "../Components/UI/Title"
import { DataFactory } from "./DataFactory"

export class ListDataFactory {
    constructor() {

        let data_from_storage = JSON.parse(localStorage.getItem('data_from_docCreator'))
        let container_from_storage = JSON.parse(localStorage.getItem('general_factory_docCreator'))

        this.data = data_from_storage != undefined ? data_from_storage.data : []
        this.container_id = data_from_storage != undefined ? data_from_storage.container_id : container_from_storage.id
        this.container_name = data_from_storage != undefined ? data_from_storage.container_name : container_from_storage.name
        this.container_fields = { id: null, name: null, fields: [] }
        this.container_setForms = container_from_storage != undefined ? container_from_storage.setForms : []
        this.dataWrapper = null;
        this.formWrapper = null;
        this.choosenWrapper = null;
        this.styles = null
        this.docs = null
        this.data_func = null
        this.data = this.data.filter(val => val != null)

    }

    removeData({ data }) {
        this.data = this.data.filter((item) => item.id != data.id)
        this.createDataWrapper()
        this.updateView()
        sendTostorage(this)
    }

    insertFunctions(key, func) {
        this[key] = func
    }

    insertStyles(styles) {
        this.styles = styles
    }

    defineWrappers() {
        this.formWrapper = this.createFormWrapper()
        this.choosenWrapper = this.createChoosenWrapper()
        this.dataWrapper = this.createDataWrapper()

        this.updateView()
    }

    createChoosenWrapper() {
        return (
            <>
                <div className={this.styles['--title']} > Selecione o tipo de formulário</div>
                <select onChange={(e) => this.changeContainer(e)}>
                    <option value="null">Selecionar</option>
                    {this.container_setForms.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    })}
                </select>
            </>
        )
    }


    createFormWrapper() {
        return (
            <>
                {this.container_fields.fields.length > 0 ?
                    <form id={this.id} name={this.name} className={this.styles['__forms']} onSubmit={(e) => this.submitFunction(e)}>
                        <div className={`row`}>
                            {this.container_fields.fields.map((field) => this.createListwrapper(field))}

                        </div>
                        <div className={`row ${this.styles['__forms--button']}`}>
                            <button type="submit">
                                Salvar
                            </button>
                           

                        </div>
                    </form>
                    : null}
            </>


        )
    }

    changeSelectfieldvalue(e, id) {
        let value = e.target.value
        this.container_fields.fields.map((field) => {
            if (field.id == id) {
                field.value = value
            }
        })

    }

    createListwrapper(field) {

        if (field.type == 'text' || field.type == 'number') {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-md-${field.columns}`}>
                    <label htmlFor={field.id}>{field.name}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <input type={field.type} name={field.name} defaultValue={field.value} onChange={(e) => this.changeSelectfieldvalue(e, field.id)} />

                    </div>
                </div>
            )
        }
        else if (field.type == 'select') {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-${field.columns}`}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <select name={field.name} defaultValue={field.value} onChange={(e) => this.changeSelectfieldvalue(e, field)}>
                            {this.list.map((item) => {
                                return (
                                    <option key={item.id} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>

                    </div>

                </div>
            )
        }
        else {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-${field.columns}`}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <textarea name={field.name} defaultValue={field.value} onChange={(e) => this.changeSelectfieldvalue(e, field)}>
                            {field.value}
                        </textarea>

                    </div>

                </div>
            )

        }


    }

    createEditwrapper(field, data_id) {

        if (field.type == 'text' || field.type == 'number') {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-md-${field.columns}`}>
                    <label htmlFor={field.id}>{field.name}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <input type={field.type} name={field.name} defaultValue={field.value} onBlur={(e) => this.editSelectfieldvalue(e, data_id, field.id)} />

                    </div>
                </div>
            )
        }
        else if (field.type == 'select') {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-${field.columns}`}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <select name={field.name} defaultValue={field.value} onChange={(e) => this.editSelectfieldvalue(e, data_id, field)}>
                            {this.list.map((item) => {
                                return (
                                    <option key={item.id} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>

                    </div>

                </div>
            )
        }
        else {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-${field.columns}`}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <textarea name={field.name} defaultValue={field.value} onChange={(e) => this.changeSelectfieldvalue(e, data_id, field)}>
                            {field.value}
                        </textarea>

                    </div>

                </div>
            )

        }


    }

    editSelectfieldvalue(e, data_id, id) {
        let value = e.target.value
        this.data = this.data.map((item) => {
            if (item.id == data_id) {
                item.fields.map((field) => {
                    if (field.id == id) {
                        field.value = value
                        field.updated_at = new Date().toLocaleString()
                    }
                    return field
                })
                
            }
            return item
        })


        //
    }

    enableDataitem(id) {
        this.data.map((item) => {
            if (item.id == id) {
                item.enabled = !item.enabled
            }
        })
        this.dataWrapper = this.createDataWrapper()
        this.updateView()
    }

    createDataWrapper() {
        return (
            <>
                <Title title={'Editar Dados'} subtitle={'Filtre e edite os dados criados'}></Title>

                <div className={`container`}>
                    {this.data.length > 0 ?
                        this.data.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className={this.styles['__dataContainer']} onClick={() => this.enableDataitem(item.id)}>
                                        <div className={this.styles['__dataContainer--remove']}>
                                            <button className={this.styles['__removeButton']} onClick={(e) => this.removeDataitem(e, item.id)}></button>
                                        </div>
                                        {item.container_name} - {item.fields[0].name}: {item.fields[0].value}
                                    </div>
                                    {item.enabled ?
                                        <form id={item.id} name={item.id} className={this.styles['__forms']} onSubmit={(e) => this.editFunction(e)}>
                                            <div className={this.styles['__dataContainer--fields']}>
                                                <div className="row">
                                                    {item.fields.map((field) => this.createEditwrapper(field, item.id))}
                                                </div>
                                                <div className={this.styles['row __dataContainer--buttons']}>
                                                    <button className={this.styles['__dataContainer--buttons--save']} type="submit">Salvar</button>
                                                    <button className={this.styles['__dataContainer--buttons--save']} onClick={()=> this.duplicateData(item)}>Duplicar</button>
                                                </div>
                                            </div>

                                        </form>
                                        : null}
                                </div>
                            )
                        })
                        : null}
                </div>

            </>
        )
    }

    removeDataitem(e, id) {
        e.preventDefault()
        this.data = this.data.filter((item) => item.id != id)
        this.dataWrapper = this.createDataWrapper()
        this.updateView()
        sendTostorage(this)
    }

    duplicateData(field) {
        const newField = JSON.parse(JSON.stringify(field))
        newField.id = Math.random().toString()
        this.data.push(newField)
        this.dataWrapper = this.createDataWrapper()
        this.updateView()
        sendTostorage(this)
    }

    changeContainer(e) {
        let id = e.target.value
        if (id != 'null') {
            this.container_fields = this.container_setForms.filter((item) => item.id == id)[0]
           
        }
        else {
            this.container_fields = { id: null, name: null, fields: [] }
        }

        this.formWrapper = this.createFormWrapper()
        this.updateView()

    }

    updateContainerFields(e, field) {
        this.container_fields = this.container_fields.map((val) => {
            if (val.id == field.id) {
                val.value = e.target.value
            }
            return val
        })
    }

    editFunction(e) {
        e.preventDefault()
        sendTostorage(this)
        this.dataWrapper = this.createDataWrapper()
        this.updateView()

    }

    submitFunction(e) {
        e.preventDefault()
        let fields = []
        this.container_fields.fields.forEach(val => {
            let data = new DataFactory()
            data.create({
                id: Math.random().toString(),
                name: val.name,
                field_id: val.id,
                container_id: this.container_id,
                value: val.value,
                label: val.label,
                columns: val.columns,
                list: val.list,
                type: val.type,
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString()
            })
            fields.push(data)
        })
        this.data.push({
            id: Math.random().toString(),
            container_id: this.container_fields.id,
            container_name: this.container_fields.name,
            enabled: false,
            fields: fields,
        })
        this.resetContainerFields()
        this.formWrapper = this.createFormWrapper()
        this.dataWrapper = this.createDataWrapper()
        this.choosenWrapper = this.createChoosenWrapper()
        this.updateView()
        sendTostorage(this)

    }

    resetContainerFields() {
        this.container_fields.fields = this.container_fields.fields.map((val) => {
            val.value = ''
            return val
        })
    }

    updateView() {
        this.data_func[1]((prevContainer) => {
            return {
                ...prevContainer,
                ...this
            }
        })
    }
}

const sendTostorage = (item) => {
    let store_itens = {
        data: item.data,
        container_id: item.container_id,
        container_name: item.container_name,
        container_fields: item.container_fields
    }
    localStorage.setItem('data_from_docCreator', JSON.stringify(store_itens))
}