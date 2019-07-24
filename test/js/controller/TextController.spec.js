import assert from 'assert';
import Editor from '../../../src/Editor';

const editorId = 'editor'
let editor;
describe('TextController.spec.js test', () => {
    before('에디터 생성', () => {
        if (!document.querySelector(`#${editorId} .editor-main`)) {
            const editorDiv = document.createElement('div');
            editorDiv.id = editorId;
            document.body.appendChild(editorDiv);
            editor = new Editor(editorId, {
                MAX_TEXT_COUNT: 3000
            });
        }
        setSelection();
    });

    it('execBold test', () => {

        editor.textController.execBold();
        const $main = editor.getMainElement();

        assert.equal($main.children()[0].tagName, 'B');
    });

    it('execItalic test', () => {

        editor.textController.execItalic();
        const $main = editor.getMainElement();

        assert.equal($main.children()[0].tagName, 'B');
    });

    it('execStrike test', () => {

        editor.textController.execStrike();
        const $main = editor.getMainElement();

        assert.equal($main.children()[0].tagName, 'B');
    });

    it('execUnderline test', () => {

        editor.textController.execStrike();
        const $main = editor.getMainElement();

        assert.equal($main.children()[0].tagName, 'B');
    });

    it('execDelete test', () => {
        editor.textController.execDelete();
        const $main = editor.getMainElement();

        assert.equal($main.text(), '');
    });

    it('insertTextNode test', () => {
        editor.textController.insertTextNode('insertNode!!');
        const $main = editor.getMainElement();

        assert.equal($main.text(), 'insertNode!!');
    });
});


function setSelection() {
    const sel = window.getSelection();
    const range = document.createRange();
    const editorMain = document.querySelector(`#${editorId} .editor-main`);
    editorMain.innerText = 'test';
    range.selectNode(editorMain.childNodes[0]);
    sel.addRange(range);
}