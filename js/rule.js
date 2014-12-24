'use strict'

function Rule(callback, predicate, priority) {
	if (typeof priority === undefined) {
		priority = 999999;
	}
	this.callback = callback;
	this.predicate = predicate;
	this.priority = priority;
};

function RuleDispatcher() {
	this.rules = [];
};

RuleDispatcher.prototype.addRule = function (rule) {
	this.rules.push(rule);
	rule.callback = rule.callback.bind(this);
	rule.predicate = rule.predicate.bind(this);
	rule.dispatcher = this;
};

RuleDispatcher.prototype.sortRules = function () {
	this.rules = this.rules.sort(function (a, b) {
		return a.priority - b.priority;
	})
};

RuleDispatcher.prototype.dispatch = function (current, destination) {
	var data = $(current);
	if (data.size() > 1) {
		$.each(data, function (i, val) {
			this.dispatch(val, destination);
		}.bind(this));
	} else if (data.size() == 1){
		this.rules.some(function (rule) {
			var retVal = rule.predicate(data);
			if (typeof retVal === 'object') {
				if (typeof retVal.size === 'function' && retVal.size() > 0) {
					if (typeof retVal[0] === 'boolean') {
						retVal = retVal[0];
					} else {
						retVal = true;
					}
				} else {
					retVal = false;
				}
			} else if (typeof retVal !== 'boolean') {
				retVal = true;
			}
			if (retVal) {
				rule.callback(data, $(destination));
			}
			return retVal;
		});
	}
};
