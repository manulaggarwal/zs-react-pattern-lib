import 'bootstrap-3-typeahead';

export default function Typeahead(elementId) {
    if (!elementId) throw new Error(`Typeahead function does not take ${elementId} value.`);
    if(!this) {return new Typeahead(elementId);}
    var _$elementId = window.$("#"+elementId);
    var _initialize = function(options) {_$elementId.typeahead(options);}
    var _lookup = function(cb) {_$elementId.lookup(cb);}
    var _getActive = function(cb) {_$elementId.getActive(cb);}
    var _destroy = function() {_$elementId.typeahead('destroy');}
    return {
        initialize: _initialize,
        lookup: _lookup,
        getActive: _getActive,
        destroy: _destroy
    }
}