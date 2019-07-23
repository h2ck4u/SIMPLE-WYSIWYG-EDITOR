import $ from 'jquery';
import util from '../util';
import messages from '../messages';
import command from '../command/command';
import cnst from '../cnst';

const {
    MESSAGE_PASTE_TEXT_EXCEEDED,
} = messages;
const {
    COMMAND_NAME
} = cnst;
class KeyEventManager {
    constructor(editorId, editor) {
        this.editor = editor;
        this.editorId = editorId;
        this.maxTextCount = editor.config["MAX_TEXT_COUNT"];
        this.writeable = true;

        this.nav = editor.nav;
        this.attachEvent();
    }

    /**
     * 이벤트매니저를 초기화 합니다.
     */
    attachEvent() {
        const $editor = $(`#${this.editorId} .editor-main`);
        $editor.on('input', this.input.bind(this));
        $editor.on('keydown', this.keyDown.bind(this));
        $editor.on('keypress', this.keyPress.bind(this));
        $editor.on('paste', this.paste.bind(this));
    }

    /**
     * input이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    input(e) {
        if (util.countText(this.editorId) > this.maxTextCount) {
            command[COMMAND_NAME.DELETE]();
        }
        this.updateTextLength();
    }

    /**
     * keyDown이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    keyPress(e) {
        if (util.countText(this.editorId) >= this.maxTextCount) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.updateTextLength();
    }

    /**
     * keyDown이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    keyDown(e) {
        if (util.countText(this.editorId) > this.maxTextCount) {
            command[COMMAND_NAME.DELETE]();
        }
        this.updateTextLength();
    }

    /**
     * paste이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    paste(e) {
        let text = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
        if (util.countText(this.editorId) + text.length > this.maxTextCount) {
            alert(MESSAGE_PASTE_TEXT_EXCEEDED.KO);
            return false;
        }
        const sel = window.getSelection();
        if (!sel.rangeCount) {
            return false;
        }
        sel.deleteFromDocument();
        sel.getRangeAt(0).insertNode(document.createTextNode(text));
        sel.collapseToEnd();
        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * 에디터 영역내의 텍스트 개수를 가져와 Label을 업데이트 합니다.
     */
    updateTextLength() {
        const currCountLabel = this.nav.findLabel('currCount');
        currCountLabel.updateText(util.countText(this.editorId));
    }
}

export default KeyEventManager;