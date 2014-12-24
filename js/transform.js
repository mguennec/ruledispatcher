'use strict'

function Transformer(dispatcher, destination) {
	this.dispatcher = dispatcher;
	this.destination = destination;
}

Transformer.prototype.transform = function (root) {
	dispatcher.sortRules();
	dispatcher.dispatch($(root), $(this.destination));
}