import React from 'react';
import Dense from "./dense/Dense";
import Flatten from "./flatten/Flatten";
import Input from "./input/Input";

const NodeList = () => {
    return (
        <div>
            <Input/>
            <Flatten/>
            <Dense/>
        </div>
    );
};

export default NodeList;
