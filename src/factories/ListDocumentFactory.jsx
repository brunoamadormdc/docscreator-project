import { Box, Button, Flex, Heading, IconButton, Input, Select, Tag, Text } from "@chakra-ui/react"
import { MinusIcon } from "@chakra-ui/icons";
import { Editor } from '@tinymce/tinymce-react';

export class ListDocumentFactory {
    constructor() {
        let documents_from_storage = JSON.parse(localStorage.getItem('documents_from_docCreator'))
        let container_from_storage = JSON.parse(localStorage.getItem('general_factory_docCreator'))

        this.container_id = container_from_storage != undefined ? container_from_storage.container_id : null
        this.container_name = container_from_storage != undefined ? container_from_storage.container_name : null
        this.container_setForms = container_from_storage != undefined ? container_from_storage.setForms : []
        this.listDocs = documents_from_storage != undefined ? documents_from_storage.listDocs : []
        this.listDocsWrapper = null
        this.setDoc = null
        this.choosenForm = null
        this.setFormsWrapper = null
        this.choosenFormWrapper = null
        this.docTemplateWrapper = null
        this.styles = null
        this.docs_func = null
        this.editorRef = null
        this.editionMode = false

    }

    insertStyles(styles) {
        this.styles = styles
    }

    insertFunctions(key, func) {
        this[key] = func
    }

    defineWrapper() {
        this.listDocsWrapper = this.createDocWrapper()
        this.setFormsWrapper = this.createFormWrapper()
        this.updateView()
    }

    createDocWrapper() {
        return (
            <>

                {this.listDocs.length > 0 ? this.listDocs.map((item) =>
                    <>

                        <Flex onClick={() => this.editDoc(item)} key={item.choose_form_id} bg={'teal'} color={'white'} p={3} align={'center'} borderRadius={'5px'} paddingStart={'10'} marginTop={'3'} marginBottom={'3'}>
                            <Box width={'95%'}>

                                <Text fontSize={'20px'}>{item.templateName}</Text>
                            </Box>
                            <Box width={'5%'}>
                                <IconButton colorScheme={'red'} size={'sm'} icon={<MinusIcon />} />

                            </Box>
                        </Flex>

                    </>
                ) : <></>}
            </>
        )
    }

    editDoc(doc) {
        this.editionMode = true
        this.setDoc = doc
        let choosenForm = this.listDocs.filter((item) => item.id == doc.choosen_form_id)
        this.choosenForm = choosenForm[0]
        this.choosenFormWrapper = this.createChoosenFormWrapper()
        this.docTemplateWrapper = this.createDocTemplateWrapper()
        this.updateView()

    }

    createFormWrapper() {
        return (
            <>
                <Flex flexDirection={'column'} alignItems={'center'}>

                    <Box width={'100%'} textAlign={'center'} p={5}>
                        {this.container_setForms.length > 0 ? <Heading fontSize={22}>Escolha o tipo de formulário</Heading> : <></>}
                    </Box>
                    <Box width={'100%'}>
                        {this.container_setForms.length > 0 ?
                            <Select placeholder={'Selecione um formulário'} onChange={(e) => this.getFormChoosen(e.target.value)}>
                                {this.container_setForms.map((item, index) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </Select>
                            : <></>}
                    </Box>

                </Flex>
            </>
        )
    }

    createChoosenFormWrapper() {
        return (
            <>
                <Flex flexDirection={'column'} alignItems={'center'}>
                    <Text p={3} textAlign={'center'}>Clique nas tags para copiar e depois colar no seu template</Text>
                    <Box p={5}>
                        {this.choosenForm != null ?

                            this.choosenForm.fields.map(item => <Tag className={this.styles['__tags']} onClick={() => this.copyToClipboard(`<<${item.name}>>`)} cursor={'pointer'} marginEnd={3} marginBottom={3} width={'auto'} variant='solid' colorScheme='teal' size={'lg'} key={item.id}>{item.label}</Tag>)

                            : <></>}
                    </Box>
                </Flex>
            </>
        )
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    createDocTemplateWrapper() {
        return (
            <>
                {this.setDoc != null ?
                    <>
                        <Flex p={3} flexDirection={'column'}>
                            <Box>
                                <Heading fontSize={'22'} marginBottom={'5'} textAlign={'center'}>Criar template do documento</Heading>
                            </Box>
                            <Box>
                                <Input marginBottom={3} placeholder={'Digite o nome do template'} defaultValue={this.setDoc.templateName} onChange={(e) => this.setDocname(e)} />
                                <Editor
                                    id={`text-editor-${this.setDoc.id}`}
                                    apiKey='dwsasj9j0wemb6xw4lago8k7lsf2kcm9qbg7o2okdusq2gq0'
                                    onInit={(evt, editor) => this.editorRef = editor}
                                    initialValue={this.setDoc.doc_content != '' ? this.setDoc.doc_content : 'Insira aqui o conteúdo do seu template'}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}

                                />
                            </Box>
                            {this.editionMode ?

                                <Box>
                                    <Button marginTop={5} onClick={() => this.editTemplateDoc(this.setDoc.id)} colorScheme={'teal'}>Editar Template</Button>
                                </Box>
                                :
                                <Box>
                                    <Button marginTop={5} onClick={() => this.getTemplateDoc()} colorScheme={'teal'}>Salvar Template</Button>
                                </Box>
                            }

                        </Flex>

                    </>

                    : <></>}
            </>

        )
    }

    setDocname(e) {
        this.setDoc.templateName = e.target.value

    }

    editTemplateDoc(id) {
        return alert('Em desenvolvimento')
    }

    getTemplateDoc() {
        if (this.setDoc.templateName.trim() == '') return alert('Não é possível criar um template sem nome')
        let content = this.editorRef.getContent()
        let contentStyle = this.editorRef.contentCSS[1]
        this.setDoc.doc_content = {
            content: content,
            contentStyle: contentStyle
        }
        this.listDocs.push(this.setDoc)
        sendTostorage(this)
        this.listDocsWrapper = this.createDocWrapper()
        this.updateView()
    }

    getFormChoosen(id) {
        if (id == '') {
            this.choosenForm = null
            this.setDoc = null
            this.choosenFormWrapper = null
            this.docTemplateWrapper = null
            this.updateView()
            return
        }
        let choosenForm = this.container_setForms.filter((item) => item.id == id)
        this.choosenForm = choosenForm[0]
        this.setDoc = new Object()
        Object.assign(this.setDoc, {
            choosen_form_id: this.choosenForm.id,
            doc_content: '',
            templateName: '',
            templateId: Math.random().toString(),
        })
        this.choosenFormWrapper = this.createChoosenFormWrapper()
        this.docTemplateWrapper = this.createDocTemplateWrapper()
        this.updateView()

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
    localStorage.setItem('documents_from_docCreator', JSON.stringify(store_itens))
}