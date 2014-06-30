/** @jsx React.DOM */

//TODO
//- make lists CRUD work
//- make subfields work ie click and more details appear underneath
//- make profile and www links work
//- make click on cloud say feature under construction
//- make delete work
//- make download as csv work
//- make dropdown choose between lists work

var NavBar = React.createClass({
  render: function() {
      /* 
        <ul className="nav navbar-nav navbar-right">
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
        </ul>
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
        </div>
        </div>
        </nav>
      </div>
    );
  },
});

var Home = React.createClass({
  getInitialState: function() {
    return {
      name : "",
      id : "",
      description : "",
    }
  },
  componentDidMount: function() {
    currentUserId = "j9X362qr4t"
    thiss = this;
    $.ajax({
      url: "https://api.parse.com/1/classes/_User/"+currentUserId+'?include=neighborhood',
      headers : {
        "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
        "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
    }).success(function(lol){
      thiss.setState({
        name: lol.neighborhood.name,
        id: lol.objectId,
        description: lol.neighborhood.description
      })
    })
  },
  render: function(){
    //<Categories /> //<MembersBox />
    return (
      <div>
        <NavBar name={this.state.name}/>
        <div className="container" style={{width:'auto'}}>
          <div className="row">
            <div className="col-md-3">
              <AboutNeighborhood description={this.state.description}/>
            </div>
            <div className="col-md-5 ">
              <Feed />
              <div id="the_progress_bar">
              <div className="progress progress-striped active">
              <div className="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width:"100%"}}>
                <span className="sr-only">45% Complete</span>
              </div>
              </div>
            </div> 
            </div>
            <div className="col-md-offset-1 col-md-3"> 
              <div className="panel panel-default">
                <div className="panel-heading">
                  Members
                </div>
                <MembersDetails facesPerRow={3} 
                                imageWidth={'50px'} 
                                height={'300px'}
                                neighborhood={this.state.id} />
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var AboutNeighborhood = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h6 style={{fontWeight:'bold',margin:'0px'}} className="text-muted">
            <i className="fa fa-globe" />&nbsp; &nbsp;ABOUT</h6>
        </div>
        <div className="panel-body">
        <span style={{fontSize:'12px'}}>
          {this.props.description}
        </span>
        </div>
      </div>
    )
  }
});

var MembersBox = React.createClass({
  render: function(){
    return (
      <div></div>
    )
  }
});

var Categories = React.createClass({
  /*
      <div className="panel panel-default">
        <div className="panel-heading">
          Categories
        </div>
          <ul className="list-group"> <a className="list-group-item">Classifieds</a> <a className="list-group-item">{'Crime & Safety'}</a> <a className="list-group-item">Free Items</a>
            <a className="list-group-item">General</a>
            <a className="list-group-item">{'Lost & Found'}</a>
            <a className="list-group-item">Recommendations</a>
          </ul>
      </div>
  */
  render: function(){
    menuStyle = {fontSize:'12px',fontWeight:'500'}
    return (
      <ul className="nav nav-pills nav-stacked">
        <li className="active" style={menuStyle}><a href="#">General</a></li>
        <li style={menuStyle}> <a href="#">Classifieds<span className="badge" style={{float:'right'}}>98</span></a>
        </li>
        
        <li style={menuStyle}><a href="#">Free Items<span className="badge" style={{float:'right'}}>98</span></a></li>
        <li style={menuStyle}><a href="#">Recommendations<span className="badge" style={{float:'right'}}>98</span></a></li>
        <li style={menuStyle}><a href="#">{'Crime & Safety'}<span className="badge" style={{float:'right'}}>98</span></a></li>
        <li style={menuStyle}><a href="#">{'Lost & Found'}<span className="badge" style={{float:'right'}}>98</span></a></li>
      </ul>
    );
  }
});

var ProspectSearch = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
      </div>
    );
  }
});

var Feed = React.createClass({
  getInitialState: function(){
    return {posts: [] }
  },

  getParsePosts: function() {
    console.log('get Parse posts')
    _this = this;
    $.ajax({
      url: "https://api.parse.com/1/classes/Post?limit=20&include=user,comments,users_who_commented",
      headers : {
        "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
        "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      data:'where={"neighborhood": {"__type":"Pointer","objectId":"XzDHTk60bi","className":"Neighborhood"}}',
      success: function(lol) {
        console.log(lol.results)
        _this.setState({ posts: lol.results })
      }
    })
  },

  componentDidMount: function() {
    /*
    $(document).scroll(function() {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
        console.log('load more stuff')
        //thiss.loadMoreItems(thiss.state.next)
        $('#the_progress_bar').show()
      }
    });
    */

    first_key = "aIHDo506A6fdlZ7YZB6n93EZQeBvV8wBFsArgIYB"
    second_key = "wWQnUcWjA7ARW2s5n6zSfv52ypp1d7PmyMSoLxDh"
    Parse.initialize(first_key, second_key)

    //this.getParsePosts() //this.getFacebookPosts()
  },
  componentWillReceiveProps: function(){
    currentUserId = "j9X362qr4t"
    thiss = this;
    $.ajax({
      url: "https://api.parse.com/1/classes/Post?limit=20&include=user,comments,users_who_commented",
      headers : {
        "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
        "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      data:'where={"neighborhood": {"__type":"Pointer","objectId":"XzDHTk60bi","className":"Neighborhood"}}',
      success: function(lol) {
        console.log(lol.results)
        thiss.setState({ posts : "lol" })
      }
    })
  },

  render: function(){
    console.log(this.state.posts)
    the_posts = []
    profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
    for(i=0;i<this.state.posts.length;i++){
      the_posts.push(<ParsePost post={this.state.posts[i]} 
                       fb_profile_pic={profile_pic}
                       key={this.state.posts[i].objectId} />)
    }

    return (
      <div>
        <createPost createPost={this.createPost}/>
        {the_posts}
      </div>
    )
    /*  
     *  Facebook Posts
        for(i=0;i<this.state.posts.length;i++){
          posts.push(<FacebookPost post={this.state.posts[i]} 
                           fb_profile_pic={this.state.profile_pics[i]}
                           key={this.state.posts[i].objectId} />)
        }
     *
    */
  },

  createPost: function(body){
    data = {
      body   : body,
      user : {
        "__type"    : "Pointer",
        "className" : "_User",
        "objectId"  : "5lgpbcsu6c", //Parse.User.current
        "first_name" : "Robin",
        "last_name" : "Singh",
      }, 
      from : {
        name : "Robin Singh"
      },
      user_likes : [],
      message: body,
      post_created_at_timestamp: Math.round((new Date()).getTime() / 1000),
    }

    if(body.trim() != ""){
      $.ajax({
        url: "https://api.parse.com/1/classes/Post",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json",
        headers : {
          "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
          "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
        },
        data: JSON.stringify(data),
      });

      tmp = this.state.posts
      tmp.unshift(data)
      this.setState({posts: tmp})
    } else {
      //show alert to user
    }
  },

/*
  loadMoreItems: function(paging_url){
    thiss = this;
    $.ajax({ url: paging_url })
    .success(function(the_lol) {
      lol = the_lol
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
      profile_pics = []
      for(i=0;i<lol.data.length;i++){ profile_pics.push(profile_pic) }

      thiss.setState({posts: thiss.state.posts.concat(lol.data), 
                      profile_pics: profile_pics, 
                      next: lol.paging.next})
      $('#the_progress_bar').hide()
      localStorage.loaded = true
    })
  },

  loadMoreParseItems: function(paging_url){
    thiss = this;
    $.ajax({ url: paging_url })
    .success(function(the_lol) {
      lol = the_lol
      thiss.setState({posts: thiss.state.posts.concat(lol.data), 
                      profile_pics: profile_pics, 
                      next: lol.paging.next})
      $('#the_progress_bar').hide()
      localStorage.loaded = true
    })
  },

  getFacebookPosts: function(){
    access_token = "CAACEdEose0cBAE9aGl5eAZCNequsFg1y85o2ZBY0fgt1MU4qOQdc2Ax2g7MjRZAAZCB8hFOdKw3k4Lumyn2c7yK6sQLZBO3bDjxuexnAipOyAfCvMo5dh9nuEm3sDkQGdURI15We5ZBaU4sTFgOLGowIJvxjZB0cXopZCA2Ii15imHx2Dw98KNwLg2cNpwa59rwhAXVlaVkaiAZDZD"
    $.ajax({
      url: "https://graph.facebook.com/595943383784905/feed?access_token="+access_token
    }).success(function(lol) {
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
      profile_pics = []
      for(i=0;i<lol.data.length;i++){ profile_pics.push(profile_pic) }

      thiss.setState({posts: lol.data, 
                      profile_pics: profile_pics, 
                      next: lol.paging.next })

      profile_pics = []
      for(i=0;i<lol.data.length;i++) {
        $.ajax({
          url:"https://api.parse.com/1/classes/_User",
          headers:{
            "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog", 
            "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
          },
          data:'where={"fb_id":'+lol.data[i].from.id+'}',
        }).success(function(lol){
          profile_pics[i] = lol.results[0]
          //thiss.setState({profile_pics: profile_pics})
        });
      }
    }).then(function(){
      console.log(profile_pics)
    });
  },

  beginningStyle: function() {
    $('.navbar-toggle').css('width','40px')
    $('.navbar-toggle').css('height','40px')
    $('.navbar-toggle').html('<i class="fa fa-refresh" style="color:#777"></i>')

    $('.navbar-toggle').on('click', function(){
      console.log('clicked')
      location.reload();
    });
  },

  getScrapedProfilePics: function() {
    $.ajax({
      //url: "https://api.parse.com/1/classes/Post?limit=20&include=user,comments,users_who_commented",
      url: "https://api.parse.com/1/classes/_User",
      headers:{"X-Parse-Application-Id": "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
       "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      //data:'order=-post_created_at_timestamp',
      //data:'order=-updatedAt',
    }).success(function(lol) {
      console.log(lol.results)
      for(i=0;i<lol.results.length;i++)
        localStorage.setItem(lol.results[i].fb_id+"", lol.results[i].fb_profile_pic)
    })
  },
*/
});

var createPost = React.createClass({
/*
        <div className="panel-heading">
          <ul className="nav nav-justified nav-pills">
            <li className="active"><a href="#" style={{padding:'2px'}}>Home</a></li>
            <li><a href="#" style={{padding:'2px'}}>Profile</a></li>
            <li><a href="#" style={{padding:'2px'}}>Messages</a></li>
            <li><a href="#" style={{padding:'2px'}}>Messages</a></li>
          </ul>
        </div>
*/
  componentDidMount: function(){
    //console.log($(this.getDOMNode()).find('input'))
  },

  fetch: function(){
    posts.fetch()
  },

  render: function(){
  inputStyle ={
    border:'0',
    outline: 'none',
    border:'none !important',
    boxShadow:'none !important',
    resize:'none'
  }
  tagStyle={
    position: 'absolute',
    right: '-10px',
    top:'-10px'
  }
  dropdown = {
    fontSize:'12px',
    fontWeight:'500'
  }
  // <a href="#" onClick={this.fetch} className="btn btn-primary btn-xs" style={{width:'100px',marginRight:'10px'}}>Upload Image</a>
  // <a href="#" style={tagStyle} className="btn-xs btn btn-primary" data-toggle="dropdown" ><i className="fa fa-tag" /></a>
    return (
      <div className="panel panel-default">
        <div className="panel-body">
        <div className="dropdown">
          <ul className="dropdown-menu" style={{position:'absolute',left:'322px',top:'11px' }}>
            <li><a href="#" style={dropdown}>Classifieds</a></li>
            <li><a href="#" style={dropdown}>Free Items</a></li>
            <li><a href="#" style={dropdown}>Recommendations</a></li>
            <li><a href="#" style={dropdown}>{'Crime & Safety'}</a></li>
            <li><a href="#" style={dropdown}>{'Lost & Found'}</a></li>
          </ul>
        </div>
          <form onSubmit={this.createPost}>
          <textarea type="text" placeholder="Write something..." className="form-control" rows="3" style={inputStyle}/>
          </form>
        </div>

        <div className="panel-footer" style={{height:'44px'}}>
          <div style={{float:'right'}}>
          <a href="#" className="btn btn-primary btn-xs" style={{width:'60px'}} onClick={this.createPost}>Post</a>
          </div>
        </div>
      </div>
    );
  },
  createPost: function(e){
    e.preventDefault()
    this.props.createPost($('textarea').val())
    $('textarea').val('')
  }
});

/*
-------------------------------------------------------
*/

var Workspace = Backbone.Router.extend({

  routes: {
    "": "main",
    "members" : "members",
    "request_membership" : "request_membership",
    "signup": "signup",
    "newsignup": "newsignup",
    "offline": "offline",
    "create_account": "create_account",
    "verification": "verification",
  },

  main: function() {
    //console.log('main')
    React.renderComponent(Home(), document.getElementById('content'));
  },

  create_account: function() {
    //console.log('main')
    React.renderComponent(CreateAccount(), document.getElementById('content'));
  },

  verification: function() {
    //console.log('main')
    React.renderComponent(Verification(), document.getElementById('content'));
  },

  members: function() {
    React.renderComponent(Members(), document.getElementById('content'));
  },

  request_membership: function(){
    React.renderComponent(RequestMembership(), document.getElementById('content'));
  },

  signup: function(){
    React.renderComponent(Auth(), document.getElementById('content'));
  },

  profile: function(){
    React.renderComponent(Profile(), document.getElementById('content'));
  },

  settings: function(){
    React.renderComponent(Settings(), document.getElementById('content'));
  },

  newsignup: function(){
    React.renderComponent(NewSignup(), document.getElementById('content'));
  },

  offline: function(){
    React.renderComponent(Offline(), document.getElementById('content'));
  },


  /*
  : function(){
    React.renderComponent(Settings(), document.getElementById('content'));
  },
  */
});

$(document).ready(function(){
  var workspace = new Workspace;
  Backbone.history.start();
});
