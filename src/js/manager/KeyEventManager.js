import util from '../util';

class KeyEventManager {
    constructor(editorId, editor) {
        this.editor = editor;
        this.editorId = editorId;
        this.maxTextCount = editor.config["MAX_TEXT_COUNT"];
        this.writeable = true;

        this.attachEvent();
    }

    /**
     * 이벤트매니저를 초기화 합니다.
     */
    attachEvent() {
        const $editor = $(`#${this.editorId} .editor-main`);
        $editor.on('input', this.input.bind(this));
        $editor.on('keydown', this.keyDown.bind(this));
        $editor.on('keyup', this.keyUp.bind(this));
    }

    /**
     * input이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    input(e) {
        if (this.writeable) {
            this.setWriteable();
        }
    }

    /**
     * keyDown이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    keyDown(e) {
        if (!this.writeable) {
            const keyCode = e.keyCode;
            const isNumber = 48 <= keyCode && keyCode <= 57;
            const isAlpha = 65 <= keyCode && keyCode <= 90;
            const isKeypad = 96 <= keyCode && keyCode <= 109;
            if (!(e.ctrlKey || e.metaKey) && (isNumber || isAlpha || isKeypad)) {
                return false;
            }
        }
    }

    /**
     * keyUp이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    keyUp(e) {
        this.setWriteable();
    }

    /**
     * 에디터 영역내의 텍스트 개수를 가져와 MaxTextCount와 비교하여 writeable flag를 관리합니다.
     */
    setWriteable() {
        this.writeable = util.countText(this.editorId) < this.maxTextCount;
    }
}

export default KeyEventManager;