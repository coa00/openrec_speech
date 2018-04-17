(function () {

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
    });
  });

  // オブザーバの設定
  const listConfigs = { childList: true };

  // 対象ノードとオブザーバの設定を渡す
  chatListObserver.observe(liveChatList, listConfigs);

  // function populateVoiceList() {
  //   if(typeof speechSynthesis === 'undefined') {
  //     return;
  //   }
  //
  //   voices = speechSynthesis.getVoices();
  //
  //   for(i = 0; i < voices.length ; i++) {
  //     var option = document.createElement('option');
  //     option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  //
  //     if(voices[i].default) {
  //       option.textContent += ' -- DEFAULT';
  //     }
  //
  //     option.setAttribute('data-lang', voices[i].lang);
  //     option.setAttribute('data-name', voices[i].name);
  //     document.getElementsByClassName("openrec-voice").appendChild(option);
  //   }
  // }
  //
  // populateVoiceList();

  // if (typeof speechSynthesis !== 'undefined' && synth.onvoiceschanged !== undefined) {
  //   synth.onvoiceschanged = populateVoiceList;
  // }
  //
  // document.addEventListener('DOMContentLoaded',function() {
  //   document.querySelector('select[name="openrec-voice"]').onchange=changeEventHandler;
  // },false);

  // function changeEventHandler(event) {
  //   console.log(event);
  // }
}());
