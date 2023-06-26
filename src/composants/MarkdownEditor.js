import MDEditor from '@uiw/react-md-editor';

import React, { useContext, useState, useEffect } from 'react';
import { EtiquetteContext } from '../pages/HomePage';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const MarkdownEditor = ({ setMarkdown }) => {
    const { selectedEtiquette } = useContext(EtiquetteContext);
    const [value, setValue] = useState("")
    /**
     * 
     * @param {*} val 
     */
    const handleChange = (val) => {
        setValue(val)
        setMarkdown(val);
    }
    useEffect(() => {
        if (selectedEtiquette) setValue(selectedEtiquette.text);
    }, [selectedEtiquette])

    return (
        selectedEtiquette ? (
            <div style={{ width: '94%' }}>
                <MDEditor value={value} onChange={handleChange} />
            </div>
        ) : (
            <div style={{ width: '94%' }}>

            </div>
        )
    );
}

export default MarkdownEditor;
