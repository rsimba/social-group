function persistPost(body, tag) {
  console.log('persist post')
    data = {
      body   : body,
      user : {
        "__type"    : "Pointer",
        "className" : "_User",
        "objectId"  : localStorage.currentUserId
      }, 
      neighborhood : {
        "__type"    : "Pointer",
        "className" : "Neighborhood",
        "objectId"  : localStorage.currentNeighborhood, //Parse.User.current
      }, 
      tags: tag,
      user_likes : [],
      message: body,
      post_created_at_timestamp: ""+Math.round((new Date()).getTime() / 1000),
      objectId: '',
    }

    if(body.trim() != "") {
      delete data.objectId 
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

      currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
      currentUser = JSON.parse(currentUser)

      data.user.first_name = currentUser.first_name
      data.user.last_name = currentUser.last_name
      return data
    } 
}

function persistComment(author, post, body) {
  console.log('persist comment')
  // Create a new comment object
  // Update parent post comments column with pointer to comment object
  
  newComment = {
    "parent" : {
      "__type" : "Pointer",
      "className" : "Post",
      "objectId" : post,
    },
    user : {
      "__type" : "Pointer",
      "className" : "_User",
      "objectId" : author,
    },
    comment_body : body,
    comment_author_id : "Test Test",
    comment_date: Math.round((new Date()).getTime() / 1000),
    user_likes : [],
  }

  parse_headers = {
    "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
    "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
  }

  $.ajax({
    url: "https://api.parse.com/1/classes/Comment",
    type: "POST",
    dataType: "JSON",
    contentType: "application/json",
    headers : parse_headers,
    data: JSON.stringify(newComment),
  }).success(function(comment){
    newComment = {
      "comments" : {
        "__op" : "Add",
        "objects": [{
          "__type" : "Pointer",
          "className" : "Comment",
          "objectId" : comment.objectId
        }]
      }
    },
    $.ajax({
      url: "https://api.parse.com/1/classes/Post/"+post,
      type: "PUT",
      dataType: "JSON",
      contentType: "application/json",
      headers : parse_headers,
      data: JSON.stringify(newComment),
    }).success(function(comment){
      console.log(comment)
    });
  });
}

function persistPostLike(post) {
  console.log('persist post like ')
  //
  // How to check if a person has already liked item 
  //
  
  parse_headers = {
    "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
    "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
  }
  newLike = {
    "user_likes" : {
      "__op" : "AddUnique",
      "objects": [{
        "__type" : "Pointer",
        "className" : "_User",
        "objectId" : "j9X362qr4t"//current_user objectId
      }]
    }
  },

  $.ajax({
    url: "https://api.parse.com/1/classes/Post/"+post,
    type: "PUT",
    dataType: "JSON",
    contentType: "application/json",
    headers : parse_headers,
    data: JSON.stringify(newLike),
  }).success(function(comment){
    console.log(comment)
  });
}

function persistCommentLike(comment) {
  console.log('persist comment like ')
  //
  // How to check if a person has already liked item 
  //
  
  parse_headers = {
    "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
    "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
  }
  newLike = {
    "user_likes" : {
      "__op" : "AddUnique",
      "objects": [{
        "__type" : "Pointer",
        "className" : "_User",
        "objectId" : "j9X362qr4t"//current_user objectId
      }]
    }
  },

  $.ajax({
    url: "https://api.parse.com/1/classes/Comment/"+comment,
    type: "PUT",
    dataType: "JSON",
    contentType: "application/json",
    headers : parse_headers,
    data: JSON.stringify(newLike),
  }).success(function(comment){
    console.log(comment)
  });
}

function persistPostUnlike(post) {
  console.log('persist post unlike ')
  parse_headers = {
    "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
    "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
  }
  newLike = {
    "user_likes" : {
      "__op" : "Remove",
      "objects": [{
        "__type" : "Pointer",
        "className" : "_User",
        "objectId" : "j9X362qr4t"//current_user objectId
      }]
    }
  },

  $.ajax({
    url: "https://api.parse.com/1/classes/Post/"+post,
    type: "PUT",
    dataType: "JSON",
    contentType: "application/json",
    headers : parse_headers,
    data: JSON.stringify(newLike),
  }).success(function(comment){
    console.log(comment)
  });
}

function persistCommentUnlike(comment) {
  console.log('persist comment unlike ')

  parse_headers = {
    "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
    "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
  }

  newLike = {
    "user_likes" : {
      "__op" : "Remove",
      "objects": [{
        "__type" : "Pointer",
        "className" : "_User",
        "objectId" : "j9X362qr4t"//current_user objectId
      }]
    }
  },

  $.ajax({
    url: "https://api.parse.com/1/classes/Comment/"+comment,
    type: "PUT",
    dataType: "JSON",
    contentType: "application/json",
    headers : parse_headers,
    data: JSON.stringify(newLike),
  }).success(function(comment){
    console.log(comment)
  });
}
