$(document).ready(function(){
  $(window).scroll(function() {
    if($(document).height() - $(window).height() == $(window).scrollTop()){
      var view = $('#view-check').attr('view');
      var total = $('#view-check').attr('total');
      var current;
      if(view === 'user'){
        current = $('.users-list').attr('page');
        if(current === '' || current === 1){
          current = 2;
          load_users(current);
        }
        else{
          if(parseInt(current) < parseInt(total)){
            current ++;
            load_users(current);
          }
        }
      }
      if(view === 'post'){
        current = $('.list-post').attr('page');
        var user_id = $('.user-profile').attr('user_id');
        if(current === '' || current === 1){
          current = 2;
          load_posts(current, user_id);
        }
        else{
          if(parseInt(current) < parseInt(total)){
            current ++;
            load_posts(current, user_id);
          }
        }
      }
      if(view === 'feed'){
        current = $('.feed-item').attr('page');
        if(current === '' || current === 1){
          current = 2;
          load_feeds(current);
        }
        else{
          if(parseInt(current) < parseInt(total)){
            current ++;
            load_feeds(current);
          }
        }
      }
      if(view === 'tag'){
        current = $('.list-post').attr('page');
        var tag_id = $('.feed-item').attr('tag_id');
        if(current === '' || current === 1){
          current = 2;
          load_tags(current, tag_id);
        }
        else{
          if(parseInt(current) < parseInt(total)){
            current ++;
            load_tags(current, tag_id);
          }
        }
      }
    }
  });
});

function load_users(current){
  $('.loading-img').fadeIn();
  setTimeout(function() {
    $.ajax({
      url: '/users',
      type: 'GET',
      dataType: 'json',
      data: {page: current, load: true},
    })
      .done(function(data) {
        $('.users-list .row').append(data.user);
        $('.users-list').attr('page', current);
        $('.loading-img').fadeOut();
      });
  }, 1000);
}

function load_posts(current, user_id){
  $('.loading-img').fadeIn();
  setTimeout(function() {
    $.ajax({
      url: '/users/' + user_id,
      type: 'GET',
      dataType: 'json',
      data: {page: current, load: true, user_id: user_id},
    })
      .done(function(data) {
        $('.list-post').append(data.post);
        $('.list-post').attr('page', current);
        $('.loading-img').fadeOut();
      });
  }, 1000);
}

function load_feeds(current){
  $('.loading-img').fadeIn();
  setTimeout(function() {
    $.ajax({
      url: '/',
      type: 'GET',
      dataType: 'json',
      data: {page: current, load: true},
    })
      .done(function(data) {
        $('.feed-item').append(data.post);
        $('.feed-item').attr('page', current);
        $('.loading-img').fadeOut();
      });
  }, 1000);
}

function load_tags(current, tag_id){
  $('.loading-img').fadeIn();
  setTimeout(function() {
    $.ajax({
      url: '/tags/' + tag_id,
      type: 'GET',
      dataType: 'json',
      data: {page: current, load: true},
    })
      .done(function(data) {
        $('.feed-item').append(data.post);
        $('.feed-item').attr('page', current);
        $('.loading-img').fadeOut();
      });
  }, 1000);
}
