var sharedb = require('sharedb/lib/client');
var otText = require('ot-text');
var CodeMirror = require('codemirror');
var Editor = require('./Editor');
var ShareDBCodeMirror = require('..');

sharedb.types.map['json0'].registerSubtype(otText.type);

var editor = new Editor('editor', {MAX_TEXT_COUNT:3000});
var socket = new WebSocket("ws://" + location.host);
var shareConnection = new sharedb.Connection(socket);

var doc = shareConnection.get('users', 'jane');

ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
  key: 'content',
  verbose: true
});