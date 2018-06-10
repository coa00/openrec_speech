let isSpeech = localStorage.getItem('isSpeech');

console.log('isSpeech:', isSpeech);

if (isSpeech === undefined){
  isSpeech = '1';
  localStorage.setItem('isSpeech', isSpeech);
}

(function () {
  const isSpeech = localStorage.getItem('isSpeech');

  document.body.insertAdjacentHTML("afterbegin", `<button id="speechToggle">${isSpeech ? '読み上げストップ' : '読み上げ開始'}</button>`);
  const speechToggle = document.getElementById('speechToggle');
  speechToggle.style.zIndex = '30000';
  speechToggle.style.position = 'fixed';

  speechToggle.addEventListener('click', speechtoggle);

  const isNameSpeech = true;

  const liveChatList = document.getElementsByClassName('js-liveChatList')[0]

  // オブザーバインスタンスを作成
  const chatListObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const li = mutation.addedNodes.item(1);

      if (li){
        const item = li.getElementsByClassName('c-chart__list__item__message')[0];
        const nameItem = li.getElementsByClassName('js-chart__list__item__username')[0];
        const stamp = li.getElementsByClassName('c-chart__list__item__stamp')[0];

        const msg = item.innerText.trim();
        const name = nameItem.innerText.trim();


        if (isSpeech === '1'){
          if (isNameSpeech && name){
            console.log('name:',name);
            const nameThis = new SpeechSynthesisUtterance(`${name}の発言`);
            speechSynthesis.speak(nameThis);
          }

          if (msg){
            console.log('msg:',msg);
            const utterThis = new SpeechSynthesisUtterance(msg);
            speechSynthesis.speak(utterThis);
          }

          console.log('stamp:',stamp);
          if (stamp){
            const stampThis = new SpeechSynthesisUtterance('スタンプ貼りました');
            speechSynthesis.speak(stampThis);
          }

        }
      }
    });
  });

  // オブザーバの設定
  const listConfigs = { childList: true };

  // 対象ノードとオブザーバの設定を渡す
  setTimeout(()=>{
    chatListObserver.observe(liveChatList, listConfigs);
  }, 2000);
}());

function speechtoggle() {
  const isSpeech = localStorage.getItem('isSpeech');
  const updateFlg = (isSpeech === '1') ? '0': '1';

  if (updateFlg === '0'){
    document.getElementById('speechToggle').innerText = '読み上げ開始';
    speechSynthesis.pause();
  }else{
    document.getElementById('speechToggle').innerText = '読み上げ停止';
    speechSynthesis.resume();
  }

  localStorage.setItem('isSpeech', updateFlg);
}
