import assert from 'assert';
import Nav from '../../../src/js/ui/Nav';
import Editor from '../../../src/Editor';
const editorId = 'editor';
const config = {
    MAX_TEXT_COUNT: 10
}

describe('Nav.spec.js test', () => {
    before(() => {
        const { JSDOM } = require('jsdom');
        const jsdom = new JSDOM(`<!doctype html><html><body><div id=${editorId}></div></body></html>`);
        const { window } = jsdom;
        const $ = require('jquery')(window);
        global.$ = $;
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
        let editor = new Editor(editorId, config);
    });

    it('constructor', () => {
        const labels = [
            {
                name: 'currCount',
                text: 0
            },
            {
                name: 'maxCount',
                text: 0
            }
        ]

        const nav = new Nav(editorId, labels, config.MAX_TEXT_COUNT);

        assert.strictEqual(editorId, nav.editorId);
        assert.strictEqual(config.MAX_TEXT_COUNT, nav.maxTextCount);
        assert.strictEqual(labels.length, nav.labels.length);
    });

    it('findLabel', () => {
        const labels = [
            {
                name: 'currCount',
                text: 0
            },
            {
                name: 'maxCount',
                text: 0
            }
        ]

        const nav = new Nav(editorId, labels, config.MAX_TEXT_COUNT);
        const label = nav.findLabel('currCount');
        assert.equal('currCount', label.name);
    });

    it('findLabel 없을때', () => {
        const nav = new Nav(editorId, [], config.MAX_TEXT_COUNT);
        const label = nav.findLabel('test');
        assert.equal(undefined, label);
    });
});