$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class = "main-chat__message" data-message-id = "${message.id}">
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
      var html = `<div class = "main-chat__message" data-message-id = "${message.id}">
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.main-chat__message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id},
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.message').append(insertHTML);
        $('.message').animate({ scrollTop: $('.message')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 3000);
});