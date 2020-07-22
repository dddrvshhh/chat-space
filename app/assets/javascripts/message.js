$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if ( message.image ) {
      let html =
      //メッセージに画像が含まれる場合のHTMLを作る
        `<div class="chat_main__message-list__messagebox" data-message-id=${message.id}>
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
      `<div class="chat_main__message-list__messagebox" data-message-id=${message.id}>
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

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.MessageBox:last').data("message-id") || 0;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.MessageField').append(insertHTML);
      }
    })
    .fail(function() {
      alert('error');
    });
  };



});