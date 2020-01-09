import React from 'react';
import FileIcon, { defaultStyles } from 'react-file-icon';

/**
 * 
 * @param {*} param0 { file, children } => file : file info , children : use to add a button for edit mode
 */
export default function File({ file, children }) {
    const bytesToSize = (bytes) => {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    return (
        <>
            <tr>
                <td>{file.name}</td>
                <td>{file.extension}</td>
                <td>{bytesToSize(file.size)}</td>
                <td><a href={file.source} rel="noopener noreferrer" target="_blank" download={file.name}><FileIcon color={"#BE4F23"} size={50} extension={file.extension} {...defaultStyles[file.extension]} /></a></td>
                {children}
            </tr>


        </>
    )
}
