import React from 'react'
import { FaFileAlt } from 'react-icons/fa'
import FileIcon, {defaultStyles} from 'react-file-icon';
export default function File({file}) {
    console.log(file)
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    return (
        <>
            <tr>
                <td>{file.name}</td>
                <td>{file.extension}</td>
                <td>{bytesToSize(file.size)}</td>
                <td><a href={file.source} download><FileIcon color={"#BE4F23"} size={50} extension={file.extension} {...defaultStyles[file.extension]} /></a></td>
            </tr>
        
         
        </>
    )
}
