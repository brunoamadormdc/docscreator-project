import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Container, IconButton, Input, SimpleGrid, Text, Flex, Textarea, Heading } from "@chakra-ui/react";


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

                {this.setForms.length > 0 ?

                    <Container maxW={'container.lg'} p={'10'} centerContent>
                        <SimpleGrid columns={1} spacing={3}>
                            <Box>
                                <Heading as='h3' textAlign={'center'} fontSize={'30px'} size='2xl' noOfLines={2}>Formulários Criados</Heading>
                            </Box>
                            <Box>
                                <Heading as='h5' textAlign={'center'} fontSize={'18px'} fontWeight={'normal'} size='2xl' noOfLines={2}>Veja abaixo os formulários já criados</Heading>
                            </Box>
                        </SimpleGrid>
                    </Container>
                    : null}
                {this.setForms.length > 0 ?


                    <Container maxW={'container.lg'} marginBottom={'10'} >

                        {this.setForms.map((form) =>
                            <Flex bg={'teal'} color={'white'} p={3} align={'center'} borderRadius={'5px'} paddingStart={'10'} marginBottom={'3'}>
                                <Box width={'95%'} key={form.id}>

                                    <Text fontSize={'20px'}>{form.name}</Text>
                                </Box>
                                <Box width={'5%'}>
                                    <IconButton colorScheme={'red'} size={'sm'} icon={<MinusIcon />} onClick={() => this.removeSet(form.id)} />

                                </Box>
                            </Flex>
                        )}
                    </Container>

                    : null}


            </>
        )
    }

    createWrapper() {
        return (
            <Container maxW="container.lg" bg='teal.50' border={'1px solid teal'} borderRadius={'5px'}>
                <Box padding="4">
                    <form id={this.id} name={this.name} className={this.styles['__forms']} onSubmit={(e) => this.submitFunction(e)}>
                        <SimpleGrid columns={1} spacing={10}>
                            <Box>

                                <Text mb='0px'>Nome do Formuláro</Text>
                                <Input bg={'teal.100'} padding={'5'} type='text' name="newFormname" placeholder="Insira o nome do formulário aqui..." _placeholder={{ opacity: 0.3, color: 'gray.700' }} variant="flushed" />

                            </Box>

                            <Box>
                                <SimpleGrid columns={'2'} spacing={'10'}>
                                    {this.fields.map((field) => this.createListwrapper(field))}
                                </SimpleGrid>
                            </Box>
                            <Box>
                                <Button type="submit" colorScheme='teal' size='md' marginEnd={'5'}>Salvar</Button>
                                <Button type="submit" colorScheme='red' size='md' onClick={(e) => this.clearFields(e)}>Limpar</Button>

                            </Box>
                        </SimpleGrid>
                    </form>
                </Box>
            </Container>
        )
    }

    createListwrapper(field) {
        if (field.type == 'text' || field.type == 'number') {
            return (
                <Box key={field.id} id={field.id} >
                    <Text>{field.label}</Text>
                    <Flex>
                        <Box width={'90%'}>
                            <Input focusBorderColor={'teal.100'} bg={'teal.200'} size={'sm'} borderRadius={'5px'} type={field.type} variant={'outline'} name={field.name} disabled />
                        </Box>
                        <Box width={'10%'} marginStart={'1'}>
                            <IconButton icon={<MinusIcon />} colorScheme={'red'} size={'sm'} onClick={() => this.deleteField(field)}></IconButton>
                        </Box>
                    </Flex>


                </Box>
            )
        }
        else {
            return (
                <Box key={field.id} id={field.id} >
                    <Text>{field.label}</Text>
                    <Flex>
                        <Box width={'90%'}>
                            <Textarea focusBorderColor={'teal.100'} bg={'teal.200'} size={'lg'} borderRadius={'5px'} name={field.name} value={field.value} disabled>

                            </Textarea>

                        </Box>
                        <Box width={'10%'} marginStart={'1'}>
                            <IconButton icon={<MinusIcon />} colorScheme={'red'} size={'sm'} onClick={() => this.deleteField(field)}></IconButton>
                        </Box>
                    </Flex>

                </Box>
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