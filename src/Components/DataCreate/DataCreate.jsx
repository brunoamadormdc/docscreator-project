import styles from './DataCreate.module.scss'

import  useData from '../../hooks/useData'
import { Container } from '@chakra-ui/react'
export default function DataCreate() {

    const { data } = useData(styles)
    
    return (
        <>
            <Container maxW={'container.lg'}>
                
                    {data.choosenWrapper != null ? data.choosenWrapper : null}
                
                <div className={`row ${styles['__fieldsWrapper']}`}>
                    {data.container_fields.fields.length > 0 ? data.formWrapper : null}
                </div>
                <div className={`row ${styles['__fieldDataWrapper']}`}>
                    {data.data.length > 0 ? data.dataWrapper : null}
                </div>
            </Container>
        </>
    )
}	