import styles from './AddForm.module.scss'
import { useRef } from 'react'
import { Container, SimpleGrid, Box, Select, Input, Button, Center } from '@chakra-ui/react'

const selectValues = [
    { label: 'Texto', value: 'text' },
    { label: 'Número', value: 'number' },
    { label: 'Área de Texto', value: 'textarea' },
]

export default function AddForm({ addRow }) {

    const nameRef = useRef('')
    const typeRef = useRef('Texto')
    const columnsRef = useRef(12)

    const submitRow = (e) => {
        e.preventDefault()

        if (nameRef.current.value === '' || typeRef.current.value === '' || columnsRef.current.value === '') return alert('Preencha todos os campos')

        addRow({
            name: nameRef.current.value,
            type: typeRef.current.value,
            columns: columnsRef.current.value
        })
    }

    return (
        <>
            <Container maxW="container.lg">
                <Box padding="5">
                <form onSubmit={submitRow}>
                    <SimpleGrid columns={4} spacing={10}>

                        <Box>

                            <Input focusBorderColor={'teal.100'} type='text' placeholder="Nome" variant="flushed" ref={nameRef} />

                        </Box>
                        <Box>

                            <Select focusBorderColor={'teal.500'} variant='flushed' ref={typeRef} placeholder='Tipo'>
                                {selectValues.map((item) => {
                                    return (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    )
                                })}
                            </Select>

                        </Box>
                        <Box>
                            <Input focusBorderColor={'teal.500'} type='number' placeholder="Colunas" variant="flushed" ref={columnsRef} />

                        </Box>
                        <Box>
                            <Center>
                            <Button  type='submit' colorScheme='teal' size='md'>
                                Adicionar
                            </Button>
                            </Center>
                        </Box>

                    </SimpleGrid>
                </form>
                </Box>
            </Container>
        </>
    );
}