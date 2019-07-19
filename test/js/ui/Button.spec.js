import assert from 'assert';
import Button from '../../../src/js/ui/Button';

describe('Button.spec.js test', () => {
    before(() => {
        const { JSDOM } = require('jsdom');
        const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
        const { window } = jsdom;
        const $ = global.jQuery = require('jquery')(window);
        global.$ = $;
    });

    it('constructor', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel'
        }
        const button = new Button(data);

        assert.strictEqual(button.name, 'testButton');
        assert.strictEqual(button.label, 'testLabel');
        assert.strictEqual(button.status, false);
    });

    it('getElement', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel',
            actionName: 'testActionName'
        }
        const button = new Button(data);
        const expected = `<i class="fa fa-${data.name}" name="${data.name}"></i>`;
        assert.strictEqual(expected, button.$element.get(0).outerHTML);

    });

    it('toggleStatus', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel',
            actionName: 'testActionName'
        }
        const button = new Button(data);
        assert.strictEqual(button.status, false);
        button.toggelStatus();
        assert.strictEqual(button.status, true);
    });

    it('setStatus', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel',
            actionName: 'testActionName'
        }
        const button = new Button(data);
        assert.strictEqual(button.status, false);
        button.setStatus(true);
        assert.strictEqual(button.status, true);
    });
});