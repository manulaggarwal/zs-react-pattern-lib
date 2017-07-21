import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import Typeahead from './Typeahead';
import './search.css';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this._highlighter = this._highlighter.bind(this);
        this.state = {
            typeahead : undefined,
            options: this.props.options
        }
    }

    componentDidMount() {
        this._postDidMountCheck();
    }

    componentDidUpdate() {
        this.state.typeahead.initialize(this.state.options);    
    }

    componentWillUnmount() {
        this.state.typeahead.destroy();
        delete this.state.typeahead;
    }

    render() {
        const {htmlId,label,error,onChange,placeholder} = this.props;

        return (
            <TextInput
                htmlId={htmlId}
                name="typeahead"
                label={label}
                placeholder={placeholder}
                type="search"
                onChange={onChange}
                error={error}>
            </TextInput>
        );
    }

    _postDidMountCheck() {
        let source = this.state.options.source;
        if (Array.isArray(source)) {
            if (source.every(el=>typeof el === 'object')) {
                if (source.every(el=>el.hasOwnProperty('name')&&typeof el.name === 'string')) {
                    this._updateState();
                } else {
                   throw new Error(`Expected 'name' property or typeof 'name property as 'string'`);
                }
            } else {
                this._updateState();
            }
        } else {
            throw new Error(`Expected type of 'Array' but recieved '${typeof source}'`);
        } 
    }

    _updateState() {
        this.setState((prevState, props)=>({
            typeahead: Typeahead(props.htmlId),
            options: this._validateFunctions()
        }));
    }

    _highlighter(item) {
        let source = this.state.options.source;
        let obj = Array.isArray(source) && typeof source === 'object'? source.find(o=>o.name === item): null;
        return `<strong>${item}</strong>
            ${this._appendImage(obj)}`
    }

    _appendImage(o) {
        return o? (o.imgURL?`<img onError={this.src=''} class='typeahead-img' src='${o.imgURL}'/>`: '') : '';
    }

    _validateFunctions() {
        let options = this.state.options;
        options.highlighter = options.highlighter === undefined? this._highlighter: options.highlighter;
        return options;
    }
}

Search.propTypes = {
    /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
    htmlId: PropTypes.string,

    /** Input label */
    label: PropTypes.string,

    /** Placeholder to display when empty */
    placeholder: PropTypes.string,

    /** Options required to initialize typeahead search */
    options: PropTypes.shape({
        source: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        items: PropTypes.oneOfType([PropTypes.number,PropTypes.oneOf(['all'])]),
        minLength: PropTypes.number,
        showHintOnFocus: PropTypes.oneOfType([PropTypes.bool,PropTypes.oneOf(['all'])]),
        scrollHeight: PropTypes.oneOfType([PropTypes.number,PropTypes.func]),
        matcher: PropTypes.func,
        sorter: PropTypes.func,
        updater: PropTypes.func,
        highlighter: PropTypes.func,
        displayText: PropTypes.func,
        autoSelect: PropTypes.bool,
        afterSelect: PropTypes.func,
        delay: PropTypes.number,
        appendTo: PropTypes.node,
        fitToElement: PropTypes.bool,
        addItem: PropTypes.object
    })

}

Search.defaultProps = {
    htmlId: "typeahead",
    label: "Search",
    placeholder: "Search here"
}

export default Search;





//  source: PropTypes.oneOfType([PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
//             if(((typeof propValue[key] !== 'string')) || ((propValue[key].name !== undefined || !(typeof propValue[key].name === 'string')))) {
//                 return new Error(
//                     'Invalid prop `' + propFullName + '` supplied to' +
//                     ' `' + componentName + '`. Validation failed.' + 
//                     'Expected a string array or an object array with name property of type string.'
//                 );
//             }
//             return ;
//         })