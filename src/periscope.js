(function () {
    console.log("test:",window.test);
  
    const isNameSpeech = true;
  
    const target1234 = document.querySelector('.Chat > div > div');
    const synth = window.speechSynthesis;
    let voices;
  
    // オブザーバインスタンスを作成
    const observer1234 = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        let mess = mutation.addedNodes[0].querySelector('.CommentMessage-message');
        if (mess && mess.innerText){
            const msg  = mess.innerText;
            if (msg){
                console.log('msg:',msg);
                const utterThis = new SpeechSynthesisUtterance(msg);
                speechSynthesis.speak(utterThis);
              }    
        }  
      });
    })
  
    // オブザーバの設定
    const config1234 = { childList: true };
  
    // 対象ノードとオブザーバの設定を渡す
    observer1234.observe(target1234, config1234);
  }());
  