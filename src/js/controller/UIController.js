import util from '../util';

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
    togglePopup = () => {
        const isCollpased = this.selectionManager.isCollapsed();
        if (isCollpased) {
            this.popup.hide();
        } else {
            const popupWidth = parseInt(this.popup.$element.css('width'));
            const marginBottom = this.editor.config["DEFAULT_POPUP_MARGIN_BOTTOM"];
            const position = util.getPopupPosition(this.selectionManager.getRange(), {
                popupWidth,
                marginBottom
            });
            this.setPopupPosition(position);
            this.setCommonStyle();
            this.popup.show();
        }
    }

    /**
     * popup의 위치를 셋팅합니다.
     * @param {Object} position
     */
    setPopupPosition = (position) => {
        this.popup.$element.css({
            top: position.top,
            left: position.left
        });
    }

    /**
     * 현재 셀렉션의 공통된 스타일을 버튼에 적용합니다.
     */
    setCommonStyle = () => {
        const style = util.getCommonStyle();
        this.popup.buttons.forEach(button => {
            let buttonName = button.name;
            this.setButtonActive(button, style[buttonName]);
        });
    }

    /**
     * button의 상태를 토글합니다.
     * @param {Button} button 
     */
    setButtonActive = (button, isActive = undefined) => {
        button.setActive(isActive);
    }

    /**
     * Label의 글자수를 업데이트합니다.
     */
    updateTextCount = () => {
        this.nav.updateTextCount();
    }

    /**
     * 메세지 알럿을 띄웁니다.
     * @param {String} message 
     */
    showAlert = (message) => {
        alert(message);
    }
}

export default UIController;