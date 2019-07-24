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
    attachEvent() {
        const $editor = this.editor.getElement();
        this.mouseDownOnEditor($editor);
        this.mouseUpOnEditor($editor);
        this.mouseDownOnButton();
        this.mouseUpOnButton();
    }

    /**
     * Editor에 MouseDown 이벤트를 등록합니다.
     */
    mouseDownOnEditor($editor) {
        $editor.on('mousedown', () => {
            this.uiController.togglePopup();
        });
    }

    /**
     * Editor에 MouseUp 이벤트를 등록합니다.
     */
    mouseUpOnEditor($editor) {
        $editor.on('mouseup', () => {
            setTimeout(() => {
                this.uiController.togglePopup();
            }, 0);
        });
    }

    /**
     * Button에 MouseDown 이벤트를 등록합니다.
     */
    mouseDownOnButton() {
        this.popup.buttons.forEach(button => {
            let $button = button.getElement();
            $button.on('mousedown', (e) => {
                const buttonName = e.target.getAttribute('name');
                if (!!buttonName) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.textController.execCommand(buttonName);
                    this.uiController.setButtonActive(button);
                }
            });
        });
    }

    /**
     * Button에 MouseUp 이벤트를 등록합니다.
     */
    mouseUpOnButton() {
        this.popup.buttons.forEach(button => {
            let $button = button.getElement();
            $button.on('mouseup', (e) => {
                e.stopPropagation();
            });
        });
    }
}

export default MouseEventManager;