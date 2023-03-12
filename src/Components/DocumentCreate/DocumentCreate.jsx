import useDocument from '../../hooks/useDocument'
import styles from './DocumentCreate.module.scss'
import { Container, Heading } from '@chakra-ui/react'

export default function DocumentCreate() {

    const {document} = useDocument(styles)

    return (
        <>
            <Container maxW={'container.lg'}>
                {document.setFormsWrapper}
                {document.choosenFormWrapper != null ? document.choosenFormWrapper : <></>}
                {document.docTemplateWrapper != null ? document.docTemplateWrapper : <></>}
                {document.listDocsWrapper != null ? document.listDocsWrapper : <></>}
            </Container>
        </>
    )
}