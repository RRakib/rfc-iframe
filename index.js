import {useEffect, createElement} from 'react';
import ReactDOM from 'react-dom';

export const IFrame = ({children, styles={}}) => {

    useEffect(() => {
        const ifrm = document.getElementById("rfc-iframe-v1");
        const doc = ifrm.contentDocument;
        const createDiv = document.createElement("div");
        doc.body.appendChild(createDiv);
        ReactDOM.render(children, createDiv);
    }, []);

    return createElement("iframe", {...styles, id: "rfc-iframe-v1"}, null);
};