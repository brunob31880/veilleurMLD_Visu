import MDEditor from '@uiw/react-md-editor';
import React, { useContext, useState,useEffect } from 'react';
import { EtiquetteContext } from '../pages/HomePage';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const MarkdownEditor = ({setMarkdown}) => {
    const { selectedEtiquette } = useContext(EtiquetteContext);
    const [value, setValue] = useState(null)
    /**
     * 
     * @param {*} val 
     */
    const handleChange=(val) =>{
        setValue(val)
        setMarkdown(val);
    }
    useEffect(() => {
        if (selectedEtiquette) setValue(selectedEtiquette.text);
    }, [selectedEtiquette])

    return (
        selectedEtiquette ? (
            <div className="container">
                <MDEditor value={value} onChange={handleChange} />

            </div>
        ) : (
            <></>
        )
    );
}

export default MarkdownEditor;
