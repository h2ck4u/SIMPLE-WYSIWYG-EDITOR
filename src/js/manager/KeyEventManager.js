import util from '../util';
import messages from '../messages';
const {
    MESSAGE_PASTE_TEXT_EXCEEDED,
} = messages;
class KeyEventManager {
    constructor(editor) {
        this.editor = editor;
        this.textController = editor.textController;
        this.uiController = editor.uiController;
        this.maxTextCount = editor.config["MAX_TEXT_COUNT"];
        this.writeable = true;
        this.attachEvent();
    }

    /**
     * 이벤트매니저를 초기화 합니다.
     */
    attachEvent = () => {
        const $editor = this.editor.getMainElement();
        $editor.on('input', this.onInput);
        $editor.on('keydown', this.onKeyDown);
        $editor.on('keypress', this.onKeyPress);
        $editor.on('paste', this.onPaste);
    }

    /**
     * input이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    onInput = (e) => {
        if (util.countText(this.editor.getMainElement()) > this.maxTextCount) {
            this.textController.execDelete();
        }
        this.uiController.updateTextCount();
    }

    /**
     * keyPress이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    onKeyPress = (e) => {
        if (util.countText(this.editor.getMainElement()) >= this.maxTextCount) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.uiController.updateTextCount();
    }

    /**
     * keyDown이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    onKeyDown = (e) => {
        if (util.countText(this.editor.getMainElement()) > this.maxTextCount) {
            this.textController.execDelete();
        }
        this.uiController.updateTextCount();
    }

    /**
     * paste이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    onPaste = (e) => {
        const pasteData = this.getPasteData(e);
        const pasteAble = this.chekcPasteable(pasteData);

        if (pasteAble) {
            this.textController.insertTextNode(pasteData);
        } else {
            this.uiController.showAlert(MESSAGE_PASTE_TEXT_EXCEEDED.KO);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * clipboardData를 꺼내옵니다.
     */
    getPasteData = (e) => {
        return (e.originalEvent.clipboardData || window.clipboardData).getData('text');
    }

    /**
     * 붙여넣기가 가능한지 판단합니다.
     * 불가능 할 경우에 alsert을 uiController를 통해 띄웁니다.
     */
    chekcPasteable(pasteData) {
        return util.countText(this.editor.getMainElement()) + pasteData.length < this.maxTextCount;
    }
}

export default KeyEventManager;