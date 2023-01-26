import { ListDocumentFactory } from '../factories/ListDocumentFactory'; 
import { useState } from 'react'
import { useEffect } from 'react';

const initial_docs = new ListDocumentFactory();

export default function useDocument(styles) {
    const [document,setDocument] = useState(initial_docs)

    useEffect(() => {
        initial_docs.insertFunctions('docs_func',[document,setDocument])
        initial_docs.insertStyles(styles)
        initial_docs.defineWrapper()
    },[])
    
   
    return { document }
}