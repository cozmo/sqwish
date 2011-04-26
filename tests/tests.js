var sink = require('../submodules/sink/'),
    start = sink.start,
    sink = sink.sink,
    sqwish = require('../src/');

sink('basic mode', function (test, ok) {

  test('whitespace', 1, function () {
    var input = '  \n  body  {  color  :  red ; background  :  blue  ; \r\n  }  ',
        expected = 'body{color:red;background:blue}',
        actual = sqwish.minify(input);
    ok(actual == expected, 'all appropriate whitespace was removed');
  });

  test('long hex to short hex', 1, function () {
    var input = 'p { color: #ffcc33; }',
        expected = 'p{color:#fc3}',
        actual = sqwish.minify(input);
    ok(actual == expected, 'collapsed #ffcc33 to #fc3');
  });

});

sink('strict mode', function (test, ok) {
  test('combined rules', 1, function () {
    var input = 'div { color: red; } div { background: orange; }',
        expected = 'div{background:orange;color:red}',
        actual = sqwish.minify(input, true);
    ok(actual == expected, 'collapsed div into a single rule');
  });

  test('combine duplicate properties', 1, function () {
    var input = 'div { color: red; } div { color: #ffcc88; }',
        expected = 'div{color:#fc8}',
        actual = sqwish.minify(input, true);
    ok(actual == expected, 'collapsed duplicate into a single declaration');
  });

});

start();