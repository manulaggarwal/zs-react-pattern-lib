import 'bootstrap-3-typeahead';

export default function Typeahead(elementId) {

    if (!elementId) return;

    if(!this) {
        return new Typeahead(elementId);
    }

    var $elementId = window.$("#"+elementId);

    var _initialize = function(options) {
        $elementId.typeahead(options);
    }

    var _lookup = function(cb) {
        $elementId.lookup(cb);
    }

    var _getActive = function(cb) {
        $elementId.getActive(cb);
    }

    var _destroy = function() {
        $elementId.typeahead('destroy');
    }

    return {
        initialize: _initialize,
        lookup: _lookup,
        getActive: _getActive,
        destroy: _destroy
    }

}