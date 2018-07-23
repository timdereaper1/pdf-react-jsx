import { isArray } from "util";

export default class Document {
    /**
     * creates a new document object with a default set for the document
     * meta data if not set. a new content is created when a new Document 
     * object is created
     * @param {object} metaData 
     */
    constructor(metaData) {
        this.style = {};
        if(metaData) {
            if(metaData.title === undefined) {
                throw Error('The meta data must be specificed with the title, author and subject')
            } 
            Object.assign(this, { info: {
                title: metaData.title,
                author: metaData.author,
                subject: metaData.subject
            }});
        }
        else {
            Object.assign(this, { info: {
                title: 'New Document',
                author: 'New Author',
                subject: 'New Subject'
            }});
        }
    }

    /**
     * creates the document layout with the properties for the
     * standard sizing, page orientation and the page margin
     * @param {object} pageLayout 
     */
    setDocumentLayout(pageLayout) {
        // if (this.document)
        // for (const settings in pageLayout) {
        //     if (settings === 'sizing') {
        //         this.document.pageSize = pageLayout[settings].toUpperCase();
        //     }
        //     if (settings === 'orientation') {
        //         this.document.pageOrientation = pageLayout[settings].toLowerCase();
        //     }
        //     if (settings === 'margin') {
        //         this.document.pageMargins = StyleSheet.toNativeMargins(pageLayout[settings]);
        //     }
        // }
    }

    /**
     * sets the content of the document
     * @param {object} content 
     */
    setDocumentContent(content) {
        Object.assign(this, content);
    }

    /**
     * creates an element in the document object
     * @param {string} name 
     */
    static createElement(name) {
        const stackableItems = ['ul', 'stack', 'columns', 'body', 'row', 'content', 'canvas'];
        if (name === 'row') return []; 
        return {
            [name]: (stackableItems.includes(name)) ? [] : name,
            append(newElement) {
                if (isArray(this[name])) {
                    this[name].push(newElement);
                } 
                else {
                    this[name] = newElement;
                }
            },
            setStyles(styles) {
                Object.assign(this, styles);
            },
            appendTable(props) {
                if(props)
                    this.table.widths = props.widths;
            }
        };
    }
}