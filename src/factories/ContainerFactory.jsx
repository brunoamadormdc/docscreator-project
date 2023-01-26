import Title from "../Components/UI/Title";

export class ContainerFieldsFactory {
    constructor(name) {

        let data_from_storage = JSON.parse(localStorage.getItem(name))

        this.id = data_from_storage != undefined ? data_from_storage.id : Math.random().toString()
        this.name = data_from_storage != undefined ? data_from_storage.name : name;
        this.label = data_from_storage != undefined ? data_from_storage.label : name;
        this.type = data_from_storage != undefined ? data_from_storage.type : null;
        this.containerName = data_from_storage != undefined ? data_from_storage.containerName : 'container';
        this.fields = data_from_storage != undefined ? data_from_storage.fields : [];
        this.setForms = data_from_storage != undefined ? data_from_storage.setForms != undefined ? data_from_storage.setForms : [] : [];
        this.wrapper = null;
        this.listFormswrapper = null;
        this.container_func = null
        this.styles = null
        
    }

    insertFunctions(key, func) {
        this[key] = func
    }

    insertStyles(styles) {
        this.styles = styles
    }

    defineWrapper() {
        this.wrapper = this.createWrapper()
        this.listFormswrapper = this.createListformswrapper()
        this.updateView()
    }

    changeValue(e, field) {
        this.fields = this.fields.map((item) => {
            if (item.id == field.id) {
                item.value = e.target.value
            }
            return item
        })
    }

    submitFunction(e) {

        e.preventDefault()
        let name = e.target.querySelector('[name="newFormname"]').value
        if (name == '' || this.fields.lenght == 0) {
            alert('É necessário preencher todos os campos')
            return
        }
        this.setForms.push({
            id: Math.random().toString(),
            name: name,
            fields: JSON.parse(JSON.stringify(this.fields))
        })
        this.listFormswrapper = this.createListformswrapper()
        this.updateView()
        sendTostorage(this.name, this)

    }

    createListformswrapper() {
        return (
            <>
                <div className={`${this.styles['__listForms']} container`}>
                    {this.setForms.length > 0 ?

                       <Title title={'Formulários'} subtitle={'Lista de formulários'}></Title>

                        : null}
                    {this.setForms.length > 0 ?


                        <div className={`row`}>
                            {this.setForms.map((form) => <div className={`${this.styles['__listForms--container']} row`} key={form.id}>
                                <div className={this.styles['__listForms--remove']} onClick={()=> this.removeSet(form.id)}></div>
                                {form.name}
                            </div>)}
                        </div>

                        : null}
                </div>

            </>
        )
    }

    createWrapper() {
        return (
            <div className={`container`}>

                <form id={this.id} name={this.name} className={this.styles['__forms']} onSubmit={(e) => this.submitFunction(e)}>
                    <div className={`row`}>
                        <div className={`${this.styles['__forms--fields']} col-md-12`}>
                            <div className={this.styles['__forms--fields--wrapper']}>
                                <input type="text" name="newFormname" placeholder="Nome do Formulário" />
                            </div>
                        </div>
                    </div>
                    <div className={`row`}>
                        {this.fields.map((field) => this.createListwrapper(field))}

                    </div>
                    <div className={`row ${this.styles['__forms--button']}`}>
                        <button type="submit">
                            Salvar
                        </button>
                        <button onClick={(e)=>this.clearFields(e)}>
                            Limpar
                        </button>
                    </div>
                </form>

            </div>
        )
    }

    createListwrapper(field) {
        if (field.type == 'text' || field.type == 'number') {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-md-${field.columns}`}>
                    <label>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <input type={field.type} name={field.name} disabled />
                        <button className={this.styles['__removeButton']} onClick={() => this.deleteField(field)}></button>
                    </div>
                </div>
            )
        }
        else if (field.type == 'select') {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-${field.columns}`}>
                    <label>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <select name={field.name} value={field.value}>
                            {this.list.map((item) => {
                                return (
                                    <option key={item.id} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>
                        <button className={this.styles['__removeButton']} onClick={() => this.deleteField(field)}></button>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div key={field.id} id={field.id} className={`${this.styles['__forms--fields']} col-${field.columns}`}>
                    <label>{field.label}</label>
                    <div className={this.styles['__forms--fields--wrapper']}>
                        <textarea name={field.name} value={field.value} disabled>

                        </textarea>
                        <button className={this.styles['__removeButton']} onClick={() => this.deleteField(field)}></button>
                    </div>

                </div>
            )

        }


    }

    deleteField(field) {
        this.fields = this.fields.filter((item) => item.id != field.id)
        this.wrapper = this.createWrapper();
        this.updateView()
        sendTostorage(this.name, this)
    }

    updateView() {
        this.container_func[1]((prevContainer) => {
            return {
                ...prevContainer,
                ...this
            }
        })
    }

    removeSet(id) {
        this.setForms = this.setForms.filter((item) => item.id != id)
        this.listFormswrapper = this.createListformswrapper()
        this.updateView()
        sendTostorage(this.name, this)     
    }

    updateValue(key, value) {
        this[key] = value;
        this.wrapper = this.createWrapper();
        this.updateView()
        sendTostorage(this.name, this)
    }

    clearFields(e) {
        e.preventDefault()
        this.fields = [];
        this.wrapper = this.createWrapper();
        this.updateView()
        sendTostorage(this.name, this)
    }

    updateFields(fields) {
        const verify = this.fields.find((item) => item.id == fields.id)
        if (!verify) {
            this.fields.push(fields)
        }
        else {
            this.fields = this.fields.filter((item) => item.id != fields.id)
        }
        this.wrapper = this.createWrapper();
        this.updateView()
        sendTostorage(this.name, this)
    }
}

const sendTostorage = (name, item) => {
    let store_itens = {
        id: item.id,
        name: item.name,
        label: item.label,
        type: item.type,
        containerName: item.containerName,
        setForms: item.setForms,
        fields: item.fields,
    }
    localStorage.setItem(name, JSON.stringify(store_itens))
}