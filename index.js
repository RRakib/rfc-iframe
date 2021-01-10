import ReactDOM from 'react-dom';
import {useEffect, createElement} from 'react';

export const IFrame = ({children, frameAttributes={}, copyHeaderStyle = false, copyHeaderLinks = false}) => {

    useEffect(() => {
        const ifrm = document.getElementById("rfc-iframe-v1");
        const doc = ifrm.contentDocument;
        copyStyle(doc);
        copyLinks(doc);
        renderElementsInsideIframe(doc);
    }, []);

    const copyStyle = (doc) => {
        if(copyHeaderStyle) {
            Array.from(document.head.getElementsByTagName("style")).forEach(item => {
                doc.head.appendChild(item.cloneNode(true))
            })
        }
    }

    const copyLinks = (doc) => {
        if(copyHeaderLinks) {
            Array.from(document.head.getElementsByTagName("link")).forEach(item => {
                doc.head.appendChild(item.cloneNode(true))
            })
        }
    }

    const renderElementsInsideIframe = (doc) => {
        const createDiv = document.createElement("div");
        doc.body.appendChild(createDiv);
        ReactDOM.render(children, createDiv);
    }

    return createElement("iframe", {...frameAttributes, id: "rfc-iframe-v1"}, null);
};