class MouseEventManager {
    constructor(editor) {
        this.editor = editor;
        this.popup = editor.popup;
        this.textController = editor.textController;
        this.uiController = editor.uiController;

        this.attachEvent();
    }

    /**
     * 에디터에 필요한 이벤트들을 등록합니다.
     */
    attachEvent = () => {
        const $editor = this.editor.getElement();
        $editor.on('mousedown', this.onEditorMouseDown);
        $editor.on('mouseup', this.onEditorMouseUp);

        this.popup.buttons.forEach(button => {
            let $button = button.getElement();
            $button.on('mousedown', button, this.onButtonMouseDown);
            $button.on('mouseup', this.onButtonMouseUp);
        });
    }

    /**
     * Editor에 MouseDown 이벤트를 등록합니다.
     */
    onEditorMouseDown = () => {
        this.uiController.togglePopup();
    }

    /**
     * Editor에 MouseUp 이벤트를 등록합니다.
     */
    onEditorMouseUp = () => {
        setTimeout(() => {
            this.uiController.togglePopup();
        }, 0);
    }

    /**
     * Button에 MouseDown 이벤트를 등록합니다.
     */
    onButtonMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.textController.execCommand(e.data);
        this.uiController.setButtonActive(e.data);
    }

    /**
     * Button에 MouseUp 이벤트를 등록합니다.
     */
    onButtonMouseUp = (e) => {
        e.stopPropagation();
    }
}

export default MouseEventManager;