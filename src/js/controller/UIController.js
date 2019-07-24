class UIController {
    constructor(editor) {
        this.editor = editor;
        this.selectionManager = editor.selectionManager;
        this.popup = editor.popup;
        this.nav = editor.nav;
    }

    /**
     * 현재 셀렉션 상태를 확인하여 Popup을 토글합니다.
     */
    togglePopup() {
        const isCollpased = this.selectionManager.isCollapsed();
        if (isCollpased) {
            this.popup.hide();
        } else {
            this.popup.show();
        }
    }

    /**
     * button의 상태를 토글합니다.
     * @param {Button} button 
     */
    setButtonActive(button) {
        button.setActive();
    }

    /**
     * Label의 글자수를 업데이트합니다.
     */
    updateTextCount() {
        this.nav.updateTextCount();
    }

    /**
     * 메세지 알럿을 띄웁니다.
     * @param {String} message 
     */
    showAlert(message) {
        alert(message);
    }
}

export default UIController;