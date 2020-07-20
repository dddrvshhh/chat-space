$(function(){
  $('.chat_main__message-form3__longbox4').on('submit', function(e){
    e.preventDefault();
    console.log("hoge")

    let formData = new FormData(this);
    let url = $(this).attr('action')

    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

  })
})

