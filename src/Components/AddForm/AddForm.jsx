import styles from './AddForm.module.scss'
import { useRef } from 'react'

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
        
        if(nameRef.current.value === '' || typeRef.current.value === '' || columnsRef.current.value === '' ) return alert('Preencha todos os campos')

       

        addRow({
            name: nameRef.current.value,
            type: typeRef.current.value,    
            columns: columnsRef.current.value
        }) 
    }

    return (
        <>
            <div className={`container ${styles['__addFormContainer']}`}>
                <form onSubmit={submitRow}>
                    <div className={styles['__addFormContainer--row']}>
                        <div className={`${styles['__fields']} ${styles['__inputs']}`}>
                            <label>Nome</label>
                            <input type="text" ref={nameRef} />
                        </div>
                        <div className={`${styles['__fields']} ${styles['__inputs']}`}>
                            <label>Tipo</label>
                            <select ref={typeRef}>
                                {selectValues.map((item) => {
                                    return (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={`${styles['__fields']} ${styles['__inputs']}`}>
                            <label>Colunas</label>
                            <input type="number" ref={columnsRef} />
                        </div>
                        <div className={`${styles['__fields']} ${styles['__submit']}`}>
                            <button type="submit">Adicionar</button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}