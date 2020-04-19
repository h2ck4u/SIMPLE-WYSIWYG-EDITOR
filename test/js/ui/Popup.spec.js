import assert from 'assert';
import Popup from '../../../src/js/ui/Popup';
import Editor from '../../../src/Editor';
const editorId = 'editor';

describe('Popup.spec.js test', () => {
    before(() => {
        const { JSDOM } = require('jsdom');
        const jsdom = new JSDOM(`<!doctype html><html><body><div id=${editorId}></div></body></html>`);
        const { window } = jsdom;
        const $ = require('jquery')(window);
        global.$ = $;
        global.window = window;
        global.document = jsdom;
        global.document.createRange = function createRange() {
            return {
                setEnd: () => { },
                setStart: () => { },
                getBoundingClientRect: () => {
                    return { right: 0 };
                },
                getClientRects: () => []
            };
        };
        let editor = new Editor(editorId, {});
    });

    it('constructor', () => {
        const data = [
            {
                name: 'bold',
                label: 'b',
                actionName: 'bold'
            },
            {
                name: 'italic',
                label: 'i',
                actionName: 'italic'
            },
            {
                name: 'underline',
                label: 'u',
                actionName: 'underline'
            },
            {
                name: 'strikethrough',
                label: 's',
                actionName: 'strikeThrough'
            }
        ]
        const popup = new Popup(editorId, data);

        assert.strictEqual(editorId, popup.editorId);
        assert.strictEqual(data.length, popup.buttons.length);
    });

    it('setPosition', () => {
        const popup = new Popup(editorId, []);
        popup.setPosition(100, 100);
        assert.equal('100px', popup.$element.css('top'));
        assert.equal('100px', popup.$element.css('left'));
    });
});