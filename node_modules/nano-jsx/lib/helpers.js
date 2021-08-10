"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printVersion = exports.onNodeRemove = exports.nodeToString = exports.task = void 0;
const version_1 = require("./version");
/** Creates a new Task using setTimeout() */
const task = (task) => setTimeout(task, 0);
exports.task = task;
const nodeToString = (node) => {
    const tmpNode = document.createElement('div');
    tmpNode.appendChild(node.cloneNode(true));
    return tmpNode.innerHTML;
};
exports.nodeToString = nodeToString;
const isDescendant = (desc, root) => {
    return !!desc && (desc === root || isDescendant(desc.parentNode, root));
};
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
const onNodeRemove = (element, callback) => {
    let observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            mutation.removedNodes.forEach(removed => {
                if (isDescendant(element, removed)) {
                    callback();
                    if (observer) {
                        // allow garbage collection
                        observer.disconnect();
                        // @ts-ignore
                        observer = undefined;
                    }
                }
            });
        });
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    return observer;
};
exports.onNodeRemove = onNodeRemove;
const printVersion = () => {
    const info = `Powered by nano JSX v${version_1.VERSION}`;
    console.log(`%c %c %c %c %c ${info} %c http://nanojsx.io`, 'background: #ff0000', 'background: #ffff00', 'background: #00ff00', 'background: #00ffff', 'color: #fff; background: #000000;', 'background: none');
};
exports.printVersion = printVersion;
//# sourceMappingURL=helpers.js.map