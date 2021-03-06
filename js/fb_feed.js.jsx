/** @jsx React.DOM */

var FacebookFeed = React.createClass({
  getInitialState: function(){
    return {posts: [],
            next: "",
    }
  },

  componentDidMount: function() {
    thiss = this;
    localStorage.currentPage = 0
    localStorage.loadedAllPosts = false


    first_key = "aIHDo506A6fdlZ7YZB6n93EZQeBvV8wBFsArgIYB"
    second_key = "wWQnUcWjA7ARW2s5n6zSfv52ypp1d7PmyMSoLxDh"
    Parse.initialize(first_key, second_key)
    //console.log('did mount')
    this.getFacebookPosts()
    /*
    $(document).scroll(function() {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
        console.log('load more stuff')
        thiss.loadMoreItems()
        $('#the_progress_bar').show()
      }
    });
    */
  },

  /*
  loadMoreParseItems: function(paging_url){
    thiss = this;
    currentPage = localStorage.currentPage + 1
    currentNeighborhood = localStorage.currentNeighborhood
    paging_url = "https://api.parse.com/1/classes/Post?limit=20&skip="+currentPage*20+"&include=user,comments,users_who_commented",

    $.ajax({ 
      url: paging_url ,
      headers : {
        "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
        "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      data: 'where={"neighborhood": {"__type":"Pointer","objectId":"'+currentNeighborhood+'","className":"Neighborhood"}}&order=-post_created_at_timestamp',
    }).success(function(lol) {
      if(lol.results.length == 0) {
        $('#no_more_posts').show()
        localStorage.loadedAllPosts = true
        localStorage.currentPage = localStorage.currentPage + 1
      }
        
      $('#the_progress_bar').hide()
      thiss.setState({posts: thiss.state.posts.concat(lol.results) })
    })
  },
  */

  /*
  componentWillReceiveProps: function(){
    currentUserId = localStorage.currentUserId
    currentNeighborhood = localStorage.currentNeighborhood

    thiss = this;
    currentPage = localStorage.currentPage
    console.log('will recieve props')
    this.getFacebookPosts()
  },
  */

  render: function(){
    the_posts = []
    profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
/*
    for(i=0;i<this.state.posts.length;i++){
      the_posts.push(<ParsePost  post={this.state.posts[i]} 
                                 fb_profile_pic={profile_pic}
                                 key={this.state.posts[i].objectId} 
                                 tags={this.state.posts[i].tags} />)
    }
*/
    for(i=0;i<this.state.posts.length;i++){
      the_posts.push(<FacebookPost post={this.state.posts[i]} 
                       key={this.state.posts[i].objectId} />)
    }

    return (
      <div>
        <createPost createPost={this.createPost}/>
        {the_posts}
      </div>
    )
  },

  createPost: function(body, tag){
    tag = tag.replace('&','and')
    tag = tag.toLowerCase()
    tag = tag.replace(' ','_')

    tag = [tag]

    if(tag == "")
      tag = []


    data = persistPost(body, tag)
    tmp = this.state.posts
    tmp.unshift(data)
    this.setState({posts: tmp})
  },


  loadMoreItems: function(){
    thiss = this;
    console.log(this.state.next)
    $.ajax({ 
      url: this.state.next,
      success: function(lol) {
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
      profile_pics = []
      for(i=0;i<lol.data.length;i++){ profile_pics.push(profile_pic) }
      thiss.setState({posts: thiss.state.posts.concat(lol.data), 
                      profile_pics: profile_pics, 
                      next: lol.paging.next})
      $('#the_progress_bar').hide()
      localStorage.loaded = true
      },
      error: function(error) {
        console.log(error)
      }
    })
  },


  getFacebookPosts: function(){
    access_token = "CAACEdEose0cBAJfOnnJfHZAak42a2ZA09J1QQib5E07PZCvoJCb3ZBQiGwaQReOUEDlpIP5CLUBJKhUsZARHTv7Eusd1MrDT8rkKgH6eiOneevZAZARyylS7DLzIflebMmNNcAG7zyOtHLLQWXZCTZCfc25xFpxHzHC0ptaePTxCffMT0FYpP3PY8D1QgbW6ySm5yPupfjCkt0wZDZD"
    $.ajax({
      url: "https://graph.facebook.com/595943383784905/feed?access_token="+access_token
    }).success(function(lol) {
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
      profile_pics = []
      for(i=0;i<lol.data.length;i++){ profile_pics.push(profile_pic) }

      console.log(lol)
      thiss.setState({posts: lol.data, 
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
      $(document).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
          console.log('load more stuff')
          thiss.loadMoreItems()
          $('#the_progress_bar').show()
        }
      });
    });
  },

/*
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
  getInitialState: function() {
    return {tag : "" } 
  },
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
    resize:'none',
    marginTop:'15px'
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
    cancel_tag = (this.state.tag) ? 'block' : 'none'
    //console.log(cancel_tag)
    return (
      <div className="panel panel-default">
        <span className="label label-success" style={{position:'absolute',top:'10px',marginLeft:'25px',marginBottom:'5px',display:cancel_tag,color:'white'}}>{this.state.tag}
          &nbsp;&nbsp;&nbsp;
          <a href="#" style={{color:'white'}}onClick={this.removeTag}><i className="fa fa-times"/></a>
        </span>
        <div className="panel-body">
        <div className="dropdown">
        <a href="#" style={tagStyle} className="btn-xs btn btn-primary" data-toggle="dropdown" ><i className="fa fa-tag" /></a>
          <ul className="dropdown-menu" style={{position:'absolute',left:'322px',top:'11px' }}>
            <li><a href="#" style={dropdown} onClick={this.createTag} >Classifieds</a></li>
            <li><a href="#" style={dropdown} onClick={this.createTag} >Free Items</a></li>
            <li><a href="#" style={dropdown} onClick={this.createTag} >Recommendations</a></li>
            <li><a href="#" style={dropdown} onClick={this.createTag} >{'Crime & Safety'}</a></li>
            <li><a href="#" style={dropdown} onClick={this.createTag} >{'Lost & Found'}</a></li>
            <li><a href="#" style={dropdown} onClick={this.createTag} >{'Events'}</a></li>
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
  removeTag: function(e) {
    e.preventDefault()
    this.setState({tag: ""})
  },
  createTag: function(e) {
    e.preventDefault()
    console.log(e.target)

    this.setState({tag: $(e.target).text()})
  },

  createPost: function(e){
    e.preventDefault()
    this.props.createPost($('textarea').val(), this.state.tag)
    $('textarea').val('')
    this.setState({tag: ""})
  }
});
