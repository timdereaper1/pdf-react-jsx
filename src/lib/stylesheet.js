import Document from './document';
import { isArray } from 'util';

/**
 * the class creates styles for the document object the method
 * createCustomStyles creates a custom style for the document 
 * the numeric values to the class are taken to default as pixel values
 * then converted behind the scenes into point values
 * pdfmake makes use of
 */
export default class StyleSheet {
    /**
     * Styles for the page
     * the second argument is the default styles for the document
     * @param {object} defaultstyles 
     */
    constructor(document, defaultStyles) {
        if (!document) {
            throw Error('The document must be set');
        } else {
            if (document instanceof Document) {
                if (!defaultStyles) {
                    Object.assign(document, {
                        defaultStyles: StyleSheet.nativeStyles({
                            fontSize: 8,
                            alignment: 'left'
                        })
                    });
                } else {
                    Object.assign(document, { defaultStyles: StyleSheet.nativeStyles(defaultStyles)});
                }
            }
            else {
                throw Error('The document must be of type Document');
            }
        }
    }

    static setDefaultStyles(document, defaultStyles) {
        Object.assign(document, { defaultStyles: StyleSheet.nativeStyles(defaultStyles) });
    }

    /**
     * converts the value in pixel into points value 
     * @param {number} valueInPixel 
     */
    static toNativeSizing(valueInPixel) {
        if (typeof valueInPixel === 'number') {
            return (valueInPixel / 8) * 6;
        }
        else if (typeof valueInPixel === 'string') {
            if (valueInPixel.endsWith('px')) {
                const arr = valueInPixel.split('px');
                return ( parseFloat(arr[0]) / 8 ) * 6;
            }
        }
        else if (valueInPixel instanceof Boolean) {
            throw Error('The value can only be a number or a string with pixel value')
        }
    }

    /**
     * converts the styles object into pdfmake styles for the lib to use
     * @param {object} styles 
     */
    static nativeStyles(styles) {
        return StyleSheet.createStyles(styles, 'widths');
    }

    static createStyles(props, ...exclude) {
        const newProps = {};
        for (const prop in props) {
            if (props.hasOwnProperty(prop)) {
                if (typeof props[prop] === 'object') {
                    if (isArray(props[prop])) {
                        if (prop === 'margin') {
                            Object.assign(newProps, {
                                [prop]: props[prop]
                            });
                        } else if(prop !== 'widths') {
                            Object.assign(newProps, { style: props[prop] });
                        }
                    }
                    // const src = isArray(props[prop]) ? { style: props[prop] } : { [prop]: props[prop] };
                    // Object.assign(newProps, src);
                }
                else {
                    const src = { [prop]: props[prop] };
                    Object.assign(newProps, src);
                }
            }
        }
        return StyleSheet.nativeStyling(newProps);
    }

    static nativeStyling(styles) {
        Object.keys(styles).forEach(style => {
            if (style === 'fontSize') styles[style] = StyleSheet.toNativeSizing(styles[style]);
            if (style === 'margin') styles[style] = StyleSheet.toNativeMargins(styles[style]);
        });
        // for (const style in styles) {
        //     if (style === 'fontSize') styles[style] = StyleSheet.toNativeSizing(styles[style]);
        //     if (style === 'margin') styles[style] = StyleSheet.toNativeMargins(styles[style]);
        // }
        return styles;
    }

    /**
     * sets custom styles for the document
     * @param {string} name 
     * @param {object} styles 
     */
    static customStyles(document, name, styles = {}) {
        Object.assign(document.style, { [name]: StyleSheet.nativeStyles(styles) });
    }

    /**
     * returns the currently set styles for the document
     * @returns {object} documentStyles
     */
    getDocumentInstanceStyles() { return this.documentStyles; }

    /**
     * returns the document object
     * @returns {object} document
     */
    getDocumentInstance() { return this.document; }

    /**
     * creates a color usable by the native pdfmake 
     * takes in array of rgb, or hex color value
     * @param {number} red red value
     * @param {number} green green value
     * @param {number} blue blue value
     */
    static toNativeColor(...args) {
        if (args[0] instanceof Boolean) {
            throw Error('The argument must be a hexadecimal or an array of rgb values');
        } else {
            if (args.length === 1) {
                if (typeof args[0] === 'string') {
                    return args.toString();
                }
                else if (typeof args[0] === 'number') {
                    const val = args.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                    return '#' + Array(3).fill(val).map(colorValue => {
                        colorValue = StyleSheet.isInColorRange(Math.floor(colorValue));
                        const hexaDecimalValue = colorValue.toString(16);
                        return (hexaDecimalValue.length === 1) ? `0${hexaDecimalValue}` : hexaDecimalValue;
                    }).join('');
                }
            } 
            else if (args.length === 3) {
                return '#' + args.map(colorValue => {
                    colorValue = StyleSheet.isInColorRange(Math.floor(colorValue));
                    const hexaDecimalValue = colorValue.toString(16);
                    return (hexaDecimalValue.length === 1) ? `0${hexaDecimalValue}` : hexaDecimalValue;
                }).join('');
            }
            else {
                throw Error('Argument can only be a hexadecimal color value, a number or an array of rgb values');
            }
        }
    }

    static isInColorRange(colorValue) {
        return (colorValue > 255) ? 255 : (colorValue < 0) ? 0 : colorValue; 
    }

    /**
     * converts the values in the margin to point values
     * @param {Array} values 
     */
    static toNativeMargins(value) {
        if (value instanceof Array) {
            if (value.length === 1) {
                return Array(4).fill(value[0]).map(val => StyleSheet.toNativeSizing(val));
            }
            return value.map(val => StyleSheet.toNativeSizing(val));
        }
        return StyleSheet.toNativeSizing(value)
    }
}