import useDocument from '../../hooks/useDocument'
import styles from './DocumentCreate.module.scss'

export default function DocumentCreate() {

    const {document} = useDocument(styles)

    return (
        <>
            <div className={`container ${styles['__documentCreate']}`}>
                Teste
            </div>
        </>
    )
}