import util from '../util';

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
     * KeyEventManager에 필요한 이벤트들을 등록합니다.
     */
    attachEvent = () => {
        const $editor = this.editor.getMainElement();
        $editor.on('input', this.onInput);
        $editor.on('keydown', this.onKeyDown);
        $editor.on('keypress', this.onKeyPress);
    }

    /**
     * input이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    onInput = (e) => {
        if (util.countText(this.editor.getMainElement()) > this.maxTextCount) {
            e.preventDefault();
            e.stopPropagation();
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
            e.preventDefault();
            e.stopPropagation();
            this.textController.execDelete();
        }
        this.uiController.updateTextCount();
    }
}

export default KeyEventManager;