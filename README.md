# dom-bind

DOM event binding and delegation.

## Installation

Browserify recommended.

	$ npm install @hirojs/dom-bind

In the codes:

	var E = require('@hirojs/dom-bind');

## API

### Events

#### `E.bind(el, evtType, cb, [useCapture])`

#### `E.bind_c(el, evtType, cb, [useCapture])`

As above, but returns a cancellation function.

#### `E.delegate(el, evtType, selector, cb, [useCapture])`

#### `E.delegate_c(el, evtType, selector, cb, [useCapture])`

As above, but returns a cancellation function.

#### `E.unbind(el, evtType, cb, [useCapture])`
