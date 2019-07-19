import assert from 'assert';
import Label from '../../../src/js/ui/Label';

describe('Label.spec.js test', () => {
    before(() => {
        const { JSDOM } = require('jsdom');
        const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
        const { window } = jsdom;
        const $ = global.jQuery = require('jquery')(window);
        global.$ = $;
    });

    it('constructor', () => {
        const data = {
            name: 'textLabel',
            text: 'testText'
        }
        const label = new Label(data);

        assert.strictEqual(label.name, 'textLabel');
        assert.strictEqual(label.text, 'testText');
    });

    it('getElement', () => {
        const data = {
            name: 'textLabel',
            text: 'testText'
        }
        const label = new Label(data);
        const expected = `<label name="${data.name}">${data.text}</label>`;
        assert.strictEqual(expected, label.$element.get(0).outerHTML);

    });

    it('updateText', () => {
        const data = {
            name: 'textLabel',
            text: 'testText'
        }
        const label = new Label(data);
        assert.strictEqual(label.text, 'testText');
        label.updateText('text');
        assert.strictEqual(label.text, 'text');
        assert.strictEqual(label.$element.text(), 'text');
    });
});