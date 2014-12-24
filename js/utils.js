'use strict'

var Utils = {
	traverseChildren: function (contents, destination) {
		contents.each(function (i, val) {
			if (val.nodeType == Node.TEXT_NODE) {
				destination.append(val);
			} else {
				dispatcher.dispatch(val, destination);
			}
		});
	}
};
