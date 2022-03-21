import React from 'react';
import File from "./File/File";


const FilesList = (props) => {

    const fileList = props.fileList.map((file, index) => {
        return (
            <File
                key={index}
                savedFileName={file.SavedFileName}
                savedFileType={file.SavedFileType}
            />
        );
    });
    return (
        <div>
            {fileList}
        </div>
    );
};

export default FilesList;