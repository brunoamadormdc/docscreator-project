import styles from './ContainerCreate.module.scss'
import useContainer from '../../hooks/useContainer';
import AddForm from '../AddForm/AddForm';


export default function ContainerCreate() {

    const { container, addRow } = useContainer(styles)

    return (
        <>
            <div className={styles['__containerCreate']} >
                <AddForm addRow={addRow} />
                <div className={styles['__containerCreate--wrapper']}>
                    {container.wrapper != null ? container.wrapper : null}
                </div>
                <div className={styles['__containerCreate--wrapper']}>
                    {container.listFormswrapper != null ? container.listFormswrapper : null}
                </div>
            </div>
        </>
    )

}