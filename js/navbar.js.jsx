/** @jsx React.DOM */

var NavBar = React.createClass({
  render: function() {
      /* 
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-bell" /> &nbsp;<span className="badge">0</span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Settings</a></li>
              <li><a href="#">Subscription</a></li>
              <li><a href="#">Support</a></li>
              <li className="divider"></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-cog" /> &nbsp;<b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="#">Settings</a></li>
              <li><a href="#">Subscription</a></li>
              <li><a href="#">Support</a></li>
              <li className="divider"></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
             */
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
        <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">
        <i className="fa fa-home" />&nbsp; NeighborsCircle
        - <h5 style={{display:'inline'}}>{this.props.name}</h5>
        </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><a href="#"></a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-cubes" /> &nbsp;<b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="#" id="XzDHTk60bi" onClick={this.changeNeighborhood}>Test Neighborhood</a></li>
              <li><a href="#" id="RtBDGScY6d" onClick={this.changeNeighborhood}>Shandon Neighborhood</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-cog" /> &nbsp;<b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  },
  changeNeighborhood: function(e) {
    localStorage.currentNeighborhood = $(e.target).attr('id')
    location.reload()
  }
});