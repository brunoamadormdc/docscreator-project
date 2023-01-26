import { ContainerFieldsFactory } from '../factories/ContainerFactory'
import { useState } from 'react'
import { FieldFactory } from '../factories/FieldFactory';
import { useEffect } from 'react';

const initial_container = new ContainerFieldsFactory('general_factory_docCreator');

export default function useContainer(styles) {
    const [container,setContainer] = useState(initial_container)

    useEffect(() => {
        initial_container.insertFunctions('container_func',[container,setContainer])
        initial_container.insertStyles(styles)
        initial_container.defineWrapper()
    },[])
    
    
    const addRow = (data) => {
        const newField = new FieldFactory()
        newField.create({
            id: Math.random().toString(),
            name: data.name,
            label:data.name,
            type: data.type,
            value: '',
            columns: data.columns,
            list: []
        })
        initial_container.updateFields(newField)
                
    }
    return { container, addRow }
}