'use strict'

dispatcher.addRule(new Rule(function (current, destination) {
	dispatcher.dispatch(current.children(), destination);
}, function (current) {
	return $(current).xpath('self::dmodule');
	//return current[0].tagName.toLowerCase() === 'dmodule';
}, 1));

dispatcher.addRule(new Rule(function (current, destination) {
	var span = $('<span>', {
		'class': current.attr('type')
	});
	span.appendTo(destination);
	Utils.traverseChildren($(current).contents(), span);
}, function (current) {
	return $(current).xpath('self::em[@type]');
	//return current[0].tagName.toLowerCase() === 'em';
}, 5));

dispatcher.addRule(new Rule(function (current, destination) {
	var span = $('<span>', {
		'class': current[0].tagName.toLowerCase()
	});
	span.appendTo(destination);
	Utils.traverseChildren($(current).contents(), span);
}, function (current) {
	return $(current).xpath('self::em');
	//return current[0].tagName.toLowerCase() === 'em';
}, 5));

dispatcher.addRule(new Rule(function (current, destination) {
	var div = $('<div>', {
		'class': current[0].tagName.toLowerCase()
	});
	div.appendTo(destination);
	Utils.traverseChildren($(current).contents(), div);
}, function (current) {
	return $(current).xpath('self::node()');
}));