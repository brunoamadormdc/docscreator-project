import { ContainerFieldsFactory } from '../factories/ContainerFactory'
import { useState } from 'react'
import { FieldFactory } from '../factories/FieldFactory';
import { useEffect } from 'react';
import { ListDataFactory } from '../factories/ListDataFactory';

const initial_data = new ListDataFactory()

export default function useData(styles) {
    
    const [data,setData] = useState(initial_data)

    useEffect(() => {
        initial_data.insertFunctions('data_func',[data,setData])
        initial_data.insertStyles(styles)
        initial_data.defineWrappers()
    },[])
    
    
   
    return { data }
}