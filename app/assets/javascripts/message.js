$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if ( message.image ) {
      let html =
      //メッセージに画像が含まれる場合のHTMLを作る
        `<div class="chat_main__message-list__messagebox">
          <div class="chat_main__message-list__messagebox__info-ss">
            <div class="chat_main__message-list__messagebox__info-ss__name-ww">
              ${message.user_name}
            </div>
            <div class="chat_main__message-list__messagebox__info-ss__date-ww">
              ${message.created_at}
            </div>
          </div>
          <div class="chat_main__message-list__messagebox__message-ss">
            <p class="chat_main__message-list__messagebox__message-ss__content">
              ${message.content}
            </p>
            <img class="chat_main__message-list__messagebox__message-ss__image" src="${message.image}">
          </div>
        </div>`
      return html;

    } else {
      let html =
      //メッセージに画像が含まれない場合のHTMLを作る
      `<div class="chat_main__message-list__messagebox">
        <div class="chat_main__message-list__messagebox__info-ss">
          <div class="chat_main__message-list__messagebox__info-ss__name-ww">
            ${message.user_name}
          </div>
          <div class="chat_main__message-list__messagebox__info-ss__date-ww">
            ${message.created_at}
          </div>
        </div>
        <div class="chat_main__message-list__messagebox__message-ss">
          <p class="chat_main__message-list__messagebox__message-ss__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.chat_main__message-form3__longbox4').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){     // 非同期通信に成功した時の記述
      let html = buildHTML(data);
      $('.chat_main__message-list').append(html);      
      $('.chat_main__message-form3__longbox4')[0].reset();
      $('.chat_main__message-list').animate({ scrollTop: $('.chat_main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.chat_main__message-form3__longbox4__sendtcontent5').prop('disabled', false);
    })
  });
});