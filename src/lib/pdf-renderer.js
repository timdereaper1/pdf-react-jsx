// import PDFMake from 'pdfmake/build/pdfmake';
// import vfsFonts from 'pdfmake/build/vfs_fonts';
import Document from './document';
import StyleSheet from './stylesheet';

export default class ContextRender {
    static render(documentDefinition, customUserStyles, metadata) {
        const document = new Document(metadata);
        document.setDocumentContent(documentDefinition);
        if (customUserStyles) {
            if(customUserStyles.defaultStyles)
                StyleSheet.setDefaultStyles(document, customUserStyles.defaultStyles);
            Object.keys(customUserStyles).forEach(style => {
                if (style !== 'defaultStyles')
                    StyleSheet.customStyles(document, style, customUserStyles[style]);
            });
        }
        console.log(JSON.stringify(document, 0, 2));
        // const definitions = JSON.parse();
        // console.log(definitions);
        // PDFMake.vfs = vfsFonts.pdfMake.vfs;
        // const pdfMakeDocument = PDFMake.createPdf(document);
        // console.log(pdfMakeDocument);
        // const pdfMakeDocument = PDFMake.create
    }
}