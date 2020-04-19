import assert from 'assert';
import Editor from '../../../src/Editor';

const editorId = 'uiTestEditor'
let editor;
describe('UIController.spec.js test', () => {
    before('에디터 생성', () => {
        if (!document.querySelector(`#uiTestEditor .editor-main`)) {
            const editorDiv = document.createElement('div');
            editorDiv.id = editorId;
            document.body.appendChild(editorDiv);
            editor = new Editor(editorId, {
                MAX_TEXT_COUNT: 3000
            });
        }
    });

    it('setButtonActive test', () => {
        const button = editor.uiController.popup.buttons[0];
        assert.equal(button.active, false);
        editor.uiController.setButtonActive(button);
        assert.equal(button.active, true);
    });

    it('updateTextCount test', () => {
        const $main = editor.getMainElement();
        $main.text('test!');
        editor.uiController.updateTextCount();
        const label = editor.uiController.nav.findLabel('currCount');
        assert.equal(5, label.getElement().text());
    });

    it('setPosition test', () => {
        editor.uiController.setPopupPosition({ top: 100, left: 100 });
        assert.equal('100px', editor.uiController.popup.$element.css('top'));
        assert.equal('100px', editor.uiController.popup.$element.css('left'));
    });

});