import ReactDOM from 'react-dom';
import {useEffect, createElement} from 'react';
import { StyleSheetManager } from 'styled-components';


export const IFrame = ({
                           children,
                           frameAttributes={},
                           copyHeaderStyle = false,
                           copySpecificHeaderStyle = [],
                           copyStyleLinks = false,
                           stopNestedDOM = true,
                           externalStyleLinks = [],
                           externalScripts = [],
                           frameId = "rfc-iframe-v1",
                           rerenderIframe = [],
                           headerStyleDelay = 0,
                           disableStyledComponent = false }) => {

    useEffect(() => {
        const ifrm = document.getElementById(frameId);
        const doc = ifrm.contentDocument;
        doc.body.style.padding = "0";
        doc.body.style.margin = "0";
        copySpecificStyle(doc);
        if(!doc.body.hasChildNodes()) {
            copyStyle(doc);
            copyLinks(doc);
            setStyleLink(doc);
            setExternalScripts(doc);
        };
        renderElementsInsideIframe(doc);
    }, [...rerenderIframe]);

    const copyStyle = (doc) => {
        if(copyHeaderStyle) {
            setTimeout(() => {
                Array.from(document.head.getElementsByTagName("style")).forEach(item => {
                    doc.head.appendChild(item.cloneNode(true))
                })
            }, headerStyleDelay)
        }
    };

    const copySpecificStyle = (doc) => {
        const myNode = doc.head.getElementsByTagName('style');
        for (let i=0; i <= myNode.length; i++) {
            if(myNode[i]) {
                doc.head.removeChild(myNode[0]);
            }
        }
        if(!copyHeaderStyle && copySpecificHeaderStyle.length > 0) {

            setTimeout(() => {
                copySpecificHeaderStyle.forEach(item => {
                    doc.head.appendChild(document.getElementById(item).cloneNode(true));
                })
            }, headerStyleDelay)
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
        if(disableStyledComponent) {
            if(doc.body.hasChildNodes()) {
                if(stopNestedDOM) {
                    ReactDOM.render(children, doc.body.firstElementChild)
                }
            } else {
                const createDiv = document.createElement("div");

                doc.body.appendChild(createDiv);

                ReactDOM.render(children, createDiv)
            }
        } else {
            if(doc.body.hasChildNodes()) {

                const elem = createElement(StyleSheetManager, {target: doc.head}, children);

                ReactDOM.render(elem, doc.body.firstElementChild)
            } else {
                const createDiv = document.createElement("div");

                doc.body.appendChild(createDiv);

                const elem = createElement(StyleSheetManager, {target: doc.head}, children)

                ReactDOM.render(elem, createDiv)
            }
        }
    };

    return createElement("iframe", {...frameAttributes, id: frameId}, null);
};
