"use strict";

var util = require('util');

var _ = require('lodash');

var Emitter = require('../../infrastructure/queue/Emitter');
var Events = require('../events/Events');

function EventsPublisher() {
    Emitter.call(this);

    var _publish = _.bind(function(event) {
        this.publish(JSON.stringify(event));
    }, this);
    Events.on(_publish);

    var _destory = this.destory;
    this.destory = function() {
        Events.off(_publish);
        _destory();
    }
}
util.inherits(EventsPublisher, Emitter);

module.exports = EventsPublisher;
