const bind = exports.bind = (el, evtType, cb, useCapture) => {
	el.addEventListener(evtType, cb, useCapture || false);
	return cb;
}

const unbind = exports.unbind = (el, evtType, cb, useCapture) => {
	el.removeEventListener(evtType, cb, useCapture || false);
	return cb;
}

const delegate = exports.delegate = (el, evtType, selector, cb, useCapture) => {
	return bind(el, evtType, function(evt) {
		var currTarget = evt.target;
		while (currTarget && currTarget !== el) {
			if (currTarget.matches(selector)) {
				evt.delegateTarget = currTarget;
				cb.call(el, evt);
				break;
			}
			currTarget = currTarget.parentNode;
		}
	}, useCapture);
}

const onceOnly = (fn) => {
	let called = false;
	return () => {
		if (called) return;
		called = true;
		return fn();
	}
};

exports.bind_c = (el, evtType, cb, useCapture) => {
	cb = bind(el, evtType, cb, useCapture);
	return onceOnly(() => {
		unbind(el, evtType, cb, useCapture);
		el = cb = null;
	});
}

exports.delegate_c = (el, evtType, selector, cb, useCapture) => {
	cb = delegate(el, evtType, selector, cb, useCapture);
	return onceOnly(() => {
		unbind(el, evtType, cb, useCapture);
		el = cb = null;
	});
}

exports.once = (el, evtType, fn, useCapture) => {
	var called = false;
	return bind(el, evtType, function _handler(evt) {
		if (!called) {
			called = true;
			unbind(el, evtType, _handler, useCapture);
			fn(evt);
		}
	}, useCapture);
}

exports.once_c = (el, evtType, fn, useCapture) => {
	var handler = once(el, evtType, fn, useCapture);
	var cancelled = false;
	return function() {
		if (cancelled) return;
		cancelled = true;
		unbind(el, evtType, handler, useCapture);
	}
}
