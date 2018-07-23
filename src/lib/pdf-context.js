import Document from './document';
import StyleSheet from './stylesheet';
import { isClass, isStateLess, handleClass } from './utils';
import { isArray } from 'util';

function createElement(element, props, ...children) {
    return createAnElement(element, props, children);
}

function createAnElement(element, props, children) {
    if (isClass(element)) {
        return handleClass(element, props);
    }
    else {
        if (isStateLess(element)) return element(props);
        else {
            const documentElement = Document.createElement(element);
            children.forEach(child => {
                if (isArray(documentElement)) {
                    documentElement.push(child);
                }
                else {
                    if (typeof child === 'object') {
                        documentElement.append(child);
                    }
                    else {
                        documentElement[element] = children.join(' ');
                    }
                }
            });
            if(element ===  'table') { documentElement.appendTable(props); }
            if(!isArray(documentElement))
                documentElement.setStyles(StyleSheet.nativeStyles(props));
            return documentElement;

        }
    }
}

class Component {
    constructor(props) {
        this.props = props;
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){}
}

export default {
    createElement,
    Component
}