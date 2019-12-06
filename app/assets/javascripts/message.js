$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class = "main-chat__message">
                    <div class = "main-chat__message__box">
                      <div class = "main-chat__message__box__name">
                        ${message.user_name}
                      </div>
                      <div class = "main-chat__message__box__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class = "main-chat__message__text">
                      <p class = "lower-message__content">
                        ${message.text}
                      </p>
                      <p class = "lower-message__image">
                      <img src="${message.image}">
                      </p>
                    </div>
                  </div>`          
    } else {
      var html = `<div class = "main-chat__message">
                    <div class = "main-chat__message__box">
                      <div class = "main-chat__message__box__name">
                        ${message.user_name}
                      </div>
                      <div class = "main-chat__message__box__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class = "main-chat__message__text">
                      <p class = "lower-message__content">
                        ${message.text}
                      </p>
                    </div>
                  </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
})