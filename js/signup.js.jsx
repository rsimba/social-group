/** @jsx React.DOM */

var Auth = React.createClass({
  componentDidMount: function(){
    $('body').css({'overflow':'hidden'})
    $('#bg').css({'margin-top':'-20px'})
  },

  componentWillMount: function() {
    check_fb_auth()
  },
  
  render: function(){
    imgStyle = {
      position: 'absolute',
      bottom: '-170px',
      left:'0px',
      zIndex: '3',
    }
    signupDivStyle= {
      height: '200px',
      width: '500px',
      borderRadius: '30px',
      padding: '25px',
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: '100px',
      position: 'relative',
      zIndex : '5',
    }
    signupBtn = {
      display: 'block',
      marginTop: '70px',
      borderRadius: '40px',
      fontFamily: 'proxima-nova-soft',
      fontWeight: '500',
      height:'30px',
      backgroundColor: '#AED604',
      border: '0',
      padding:'11px',
      height:'50px',
      fontSize:'20px'
    }
    /*
        <div id="sign_up" style={signupDivStyle}>
          <a href="#" style={signupBtn} className="btn btn-primary">{'GET STARTED - ITS FREE'}</a>
        </div>
     */
    return (
      <div>
      <div id="bg" className=""style={{backgroundColor:'#fffae9',height:'100%', width:'100%',position:'absolute',zIndex:'1'}}>
        <h1 style={{fontFamily:'museo-sans-rounded',color:'#FEB101',paddingTop:'50px',paddingLeft:'100px',display:'inline-block'}}>
          <i className="fa fa-home" />
          <span style={{marginLeft:'5px'}}>NeighborsCircle</span>
        </h1> <span style={{marginLeft:'5px',fontSize:'16px',fontFamily:'proxima-nova-soft',color:'#FEB101'}}>{'The private social network for your neighborhood.'}</span>
        <a href="#login" className="btn btn-success btn-lg" style={{marginLeft:'300px',fontWeight:'bold'}}>Log In</a>
        <br /> <br /> <br />
        <br /> <br /> 
        <div className="panel panel-default center-block" style={{width:"500px",position:'relative',zIndex:'500'}}>
          <div className="panel-body">
            <h1 style={{fontWeight:"bold",marginTop:'5px',fontFamily:"museo-sans-rounded"}} className="text-success">Find Your Neighborhood</h1>
            <br/>
            <form onSubmit={this.createUser}>
            <input id="address" placeholder="Please Enter Your Address including Apartment Number" className="form-control" style={{marginBottom:'10px'}}/>
            <input id="email_address" placeholder="Please Enter Your Email Address" className="form-control" style={{marginBottom:'10px'}}/>
            <input id="postal_code" placeholder="Please Enter Your Postal Code" className="form-control" style={{marginBottom:'10px'}}/>
            <a href="#" onClick={this.createUser} className="btn btn-success btn-lg" style={{width:'100%',fontWeight:'bold'}}>Get Started Today</a>
            </form>
          </div>
        </div>
     <img  style={imgStyle} src="http://static.memrise.com/accounts/img/auth/front.v1.png"/>
      </div>
     </div>
    );
  },

  createUser: function(e){
    // Thanks for signing up for neighborscircle email
    // Check if address is valid
    // Check which neighborhood adress belongs to 
    //<img  style={imgStyle} src="http://static.memrise.com/accounts/img/auth/front.v1.png"/>
    
    address = $('#address').val()
    postal_code = $('#postal_code').val()
    e.preventDefault()
    data = {
      username      : $('#email_address').val(),
      password      : "testtest",
      email         : $('#email_address').val()+"@gmail.com",
      address       : address,
      postal_code   : postal_code,
    }

    console.log(data)
    localStorage.setItem('user_location', address + " " + postal_code)

     
    var user = new Parse.User();
    user.set("username", $('#email_address').val());
    user.set("password", "testtest");
    user.set("email", $('#email_address').val()+"@gmail.com");
    user.set("address_code", address);
    user.set("postal_code", postal_code);
    user.set("completed_signup", false);
    user.set("address_verification", false);
    user.set("neighborhood" , [{"__type":"Pointer","className":"Neighborhood","objectId":"XzDHTk60bi"}] )
    /* TODO
     * ---------------------------------------
     * Password has to be added to this screen
     *
     * Neighborhood
     * -----------------------------------------------
     * 1. Set default neighborhood to Test Neighborhood ? 
     *
     */
     
    user.signUp(null, {
      success: function(user) {
        the_user = user
        console.log(the_user)
        location.href = "#create_account"
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
});
