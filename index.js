import ReactDOM from 'react-dom';
import {extractCss} from "goober";
import {useEffect, createElement, useRef} from 'react';


export const IFrame = ({
                           children,
                           goober = true,
                           frameAttributes={},
                           externalStyleLinks = [],
                           externalScripts = [],
                           enabledLatencyForSafari = true,
                           enabledLatencyForMozilla = true,
                       }) => {

    let iFrameRef = useRef(null)

    useEffect(() => {

        if (!iFrameRef.current) {
            return
        }

        if (!iFrameRef.current.contentDocument) {
            return

        }

        if ((screen.width < 500) || (typeof InstallTrigger !== 'undefined' && enabledLatencyForMozilla) || (typeof window.safari !== 'undefined' && enabledLatencyForSafari)) {
            setTimeout(() => {
                ReactDOM.render(children, iFrameRef.current.contentDocument.body);

                const doc = iFrameRef.current.contentDocument;
                doc.body.style.padding = "0";
                doc.body.style.margin = "0";

                if(!doc.body.hasChildNodes()) {
                    setStyleLink(doc);
                    setExternalScripts(doc);
                };

                if(goober) {
                    gooberStyleCopy();
                }
            }, 50)
        } else {
            ReactDOM.render(children, iFrameRef.current.contentDocument.body);
            const doc = iFrameRef.current.contentDocument;
            doc.body.style.padding = "0";
            doc.body.style.margin = "0";

            if(!doc.body.hasChildNodes()) {
                setStyleLink(doc);
                setExternalScripts(doc);
            };

            if(goober) {
                gooberStyleCopy();
            }
        }
    });

    const gooberStyleCopy = () => {
        const css = extractCss()
        const style = iFrameRef.current.contentDocument.createElement('style');
        if (!iFrameRef.current.contentDocument.getElementById('__goober')) {
            style.id = '__goober';
            iFrameRef.current.contentDocument.head.appendChild(style);
        }
        iFrameRef.current.contentDocument.getElementById('__goober').innerText = css;
        document.getElementById('_goober').innerText = css;
    }

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

    return createElement("iframe", {...frameAttributes, ref: iFrameRef}, null);
};
