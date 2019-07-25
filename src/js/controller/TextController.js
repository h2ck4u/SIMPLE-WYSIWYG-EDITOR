class TextController {
    constructor(editor) {
        this.editor = editor;
        this.selectionManager = editor.selectionManager;
    }

    /**
     * commandName에 따른 DOM API를 호출합니다.
     * @param {Button} Button 
     */
    execCommand = (Button) => {
        switch (Button.name) {
            case 'bold':
                this.execBold();
                break;
            case 'italic':
                this.execItalic();
                break;
            case 'strikethrough':
                this.execStrike();
                break;
            case 'underline':
                this.execUnderline();
                break;
            default:
                try {
                    Button.event();
                } catch (error) {
                    console.error(error);
                }
        }
    }

    /**
     * bold command를 수행합니다.
     */
    execBold = () => {
        document.execCommand('bold');
    }

    /**
     * italic command를 수행합니다.
     */
    execItalic = () => {
        document.execCommand('italic');
    }

    /**
     * strikeThrough command를 수행합니다.
     */
    execStrike = () => {
        document.execCommand('strikeThrough');
    }

    /**
     * underline command를 수행합니다.
     */
    execUnderline = () => {
        document.execCommand('underline');
    }

    /**
     * delete command를 수행합니다.
     */
    execDelete = () => {
        document.execCommand('delete');
    }

    /**
     * 현재 셀렉션에 포함된 노드를 지우고, 인자로받은 Text로 만든 Node를 삽입하고 셀렉션을 보정합니다.
     * @param {String} text 
     */
    insertTextNode = (text) => {
        const sel = this.selectionManager.getSelection();
        if (!sel.rangeCount) {
            return false;
        }
        sel.deleteFromDocument();
        sel.getRangeAt(0).insertNode(document.createTextNode(text));
        sel.collapseToEnd();
    }
}

export default TextController;