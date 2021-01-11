import ReactDOM from 'react-dom';
import {useEffect, createElement} from 'react';

export const IFrame = ({
   children,
   frameAttributes={},
   copyHeaderStyle = false,
   copyStyleLinks = false,
   externalStyleLinks = [],
   externalScripts = [],
   frameId = "rfc-iframe-v1",
   rerenderIframe = null }) => {

    useEffect(() => {
        const ifrm = document.getElementById(frameId);
        const doc = ifrm.contentDocument;
        if(!doc.body.hasChildNodes()) {
            copyStyle(doc);
            copyLinks(doc);
            setStyleLink(doc);
            setExternalScripts(doc);
        }
        renderElementsInsideIframe(doc);
    }, [...rerenderIframe]);

    const copyStyle = (doc) => {
        if(copyHeaderStyle) {
            Array.from(document.head.getElementsByTagName("style")).forEach(item => {
                doc.head.appendChild(item.cloneNode(true))
            })
        }
    };

    const copyLinks = (doc) => {
        if(copyStyleLinks) {
            Array.from(document.head.getElementsByTagName("link")).forEach(item => {
                doc.head.appendChild(item.cloneNode(true))
            })
        }
    };

    const setStyleLink = (doc) => {
        if(externalStyleLinks.length > 0) {
            externalStyleLinks.forEach(item => {
                const domLink = document.createElement("link");
                domLink.rel = "stylesheet";
                domLink.href = item;
                doc.head.appendChild(domLink);
            })
        }
    };

    const setExternalScripts = (doc) => {
        if(externalScripts.length > 0) {
            externalScripts.forEach(item => {
                const domScript = document.createElement("script");
                domScript.src = item;
                domScript.async = true;
                doc.head.appendChild(domScript);
            })
        }
    };

    const renderElementsInsideIframe = (doc) => {
        if(doc.body.hasChildNodes()) {
            ReactDOM.render(children, doc.body.firstElementChild);
        } else {
            const createDiv = document.createElement("div");
            doc.body.appendChild(createDiv);
            ReactDOM.render(children, createDiv);
        }
    };

    return createElement("iframe", {...frameAttributes, id: frameId}, null);
};
