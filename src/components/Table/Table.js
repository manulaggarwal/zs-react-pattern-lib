import React from 'react';
import PropTypes from 'prop-types';
import  './table.css';
 
/** A simple table with sorting, searching feature */
class Table extends React.Component {
   constructor (props) {
       super(props);
       this.sort = this.sort.bind(this);
       this._toggleSearch = this._toggleSearch.bind(this);
       this._search = this._search.bind(this);

       console.log("CTOR: ", this.props);
       this.state = {
           data: this.props.initialData,
           headers: [],
           sortby: null,
           descending: false
       };

       this._preSearchData = null;
   } 

   getCells(row) {
     var cells = row.map((cell, index) => {
        return <td key={index}>{cell}</td>
     });

     return cells;
   }

   sort(e) {
       var column = e.target.cellIndex;
       var data = this.state.data.slice();
       var descending = this.state.sortby === column && !this.state.descending;

       data.sort((a, b) => {
         return descending ? (a[column] < b[column] ? 1 : -1)
            : (a[column] > b[column] ? 1 : -1);
       }); 

       this.setState({
           data: data,
           sortby: column,
           descending: descending,
           search: false
       })
   }

   render() {
        return (
            <div>
                {this._renderToolbar()}
                {this._renderTable()}
            </div>
        );
   }
   _renderToolbar() {
       return (
            <button onClick={this._toggleSearch} className={'toolbar'}>
                search
            </button>
       );
   }

   _toggleSearch() {
       console.log("SEARCH: ", this.state.search);
       if (this.state.search) {
           this.setState({
               data: this._preSearchData,
               search: false
           });
           this._preSearchData = null;
       } else {
           this._preSearchData = this.state.data;
           this.setState({
                search: true
           });
       }
   }

   _search(e) {
        console.log("searching..", e);
        var needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this._preSearchData});
            return;
        }
        var idx = e.target.dataset.idx;
        var searchdata = this._preSearchData.filter(function(row) {
          return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
       
        this.setState({data: searchdata});
   }

   _renderSearch() {
        if (!this.state.search) {
            return null;
        }
        var searchHeader = this.props.headers.map(function (_ignore, idx) {
            return (
                <td key={idx}>
                    <input className="table-input" type="text" data-idx={idx} />
                </td>
            );
        });
        return (
            <tr onChange={this._search}>
                {searchHeader}
            </tr>
        );
   }

   _renderTable() {
       var thead = this.props.headers.map ((title, index) => {
          if (this.state.sortby === index) {
              title += this.state.descending ? ' \u2191' : ' \u2193';
          }
          return (
            <th key={index}>{title}</th>
          );
       });  
        
       var tbody = this.state.data.map ((row, index) => {
          return (
            <tr key={index}>
                {this.getCells(row)}
            </tr>
          );
       });
      
       return (
        <table>
            <thead onClick={this.sort}>
                <tr>
                    {thead}
                </tr>
            </thead>
            <tbody>
                {this._renderSearch()}
                {tbody}
            </tbody>
        </table>
    );
   }
}

Table.propTypes = {
  /** Table headers array */
  headers: PropTypes.array,

  /** Initial data. */
  initialData: PropTypes.array
};

export default Table;