import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';

export default class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window
        .location
        .hash
        .substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window
          .location
          .hash
          .substr(1)
      })
    })
  }

  render() {
    const {route} = this.state;
    const component = route
      ? componentData.filter(component => component.name === route)[0]
      : componentData[0];

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                      <img className="nav-logo" src={require("../../public/logo.svg")}/>
                      &nbsp;&nbsp;&nbsp;zs-react
                    </a>
                  </div>
                  <ul className="nav navbar-nav navbar-right brand-description">
                    <li>ZENSAR: UI Pattern Library</li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="row mid-container">
            <div className="col-sm-4">
              <Navigation components={componentData.map(component => component.name)}/>
            </div>
            <div className="col-sm-8">
              <ComponentPage component={component}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
