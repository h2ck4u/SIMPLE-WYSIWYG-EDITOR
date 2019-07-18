class MouseEventManager {
    constructor(editorId, editor) {
        this.editorId = editorId;
        this.editor = editor;
        this.popup = editor.popup;
        this.SelectionManager = editor.SelectionManager;

        this.attachEvent();
    }

    /**
     * 에디터에 필요한 이벤트들을 등록합니다.
     */
    attachEvent() {
        this.mouseDownOnEditor();
        this.mouseUpOnEditor();
        this.mouseDownOnButton();
        this.mouseUpOnButton();
    }

    /**
     * Editor에 MouseDown 이벤트를 등록합니다.
     */
    mouseDownOnEditor() {
        const $editor = $(`#${this.editorId}`);
        $editor.on('mousedown', () => {
            const isCollpased = this.SelectionManager.isCollapsed();
            if (isCollpased) {
                this.popup.hide();
            }
        });
    }

    /**
     * Editor에 MouseUp 이벤트를 등록합니다.
     */
    mouseUpOnEditor() {
        const $editor = $(`#${this.editorId}`);
        $editor.on('mouseup', () => {
            setTimeout(() => {
                const isCollpased = this.SelectionManager.isCollapsed();
                if (isCollpased) {
                    this.popup.hide();
                } else {
                    this.popup.show();
                }
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
                e.stopPropagation();
                const targetName = e.target.getAttribute('name');
                if (!!targetName) {
                    e.preventDefault();
                    e.stopPropagation();
                    button.toggelStatus();
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