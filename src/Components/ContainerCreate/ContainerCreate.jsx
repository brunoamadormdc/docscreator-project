import styles from './ContainerCreate.module.scss'
import useContainer from '../../hooks/useContainer';
import AddForm from '../AddForm/AddForm';
import { Container } from '@chakra-ui/react'

export default function ContainerCreate() {

    const { container, addRow } = useContainer(styles)

    return (
        <>
            <Container maxW='container.lg' centerContent>
                <AddForm addRow={addRow} />
                
                    {container.wrapper != null ? container.wrapper : null}
                
               
                    {container.listFormswrapper != null ? container.listFormswrapper : null}
               
            </Container>
        </>
    )

}