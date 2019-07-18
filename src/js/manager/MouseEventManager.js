class MouseEventManager {
    constructor(editorId, editor) {
        this.editorId = editorId;
        this.editor = editor;
        this.popup = editor.popup;
        this.selectionManager = editor.selectionManager;

        this.attachEvent();
    }

    /**
     * 에디터에 필요한 이벤트들을 등록합니다.
     */
    attachEvent() {
        this.mouseDownOnEditor();
        this.mouseUpOnEditor();
    }

    /**
     * Editor에 MouseDown 이벤트를 등록합니다.
     */
    mouseDownOnEditor() {
        const elEditor = $(`#${this.editorId}`);
        elEditor.on('mousedown', () => {
            this.popup.hide();
        });
    }

    /**
     * Editor에 MouseUp 이벤트를 등록합니다.
     */
    mouseUpOnEditor() {
        const elEditor = $(`#${this.editorId}`);
        elEditor.on('mouseup', () => {
            this.popup.show();
        })
    }
}

export default MouseEventManager;