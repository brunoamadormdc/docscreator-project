import styles from './DataCreate.module.scss'

import  useData from '../../hooks/useData'
export default function DataCreate() {

    const { data } = useData(styles)
    
    return (
        <>
            <div className={`container ${styles['__dataWrapper']}`}>
                <div className={`row ${styles['__selectWrapper']}`}>
                    {data.choosenWrapper != null ? data.choosenWrapper : null}
                </div>
                <div className={`row ${styles['__fieldsWrapper']}`}>
                    {data.container_fields.fields.length > 0 ? data.formWrapper : null}
                </div>
                <div className={`row ${styles['__fieldDataWrapper']}`}>
                    {data.data.length > 0 ? data.dataWrapper : null}
                </div>
            </div>
        </>
    )
}	