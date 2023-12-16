// 星点滅
// function star-blink() {
//   animation: blink-slow 1s infinite;
// }

// 文字数制限
function textTrim() {
  // テキストをトリミングする要素
  let selector = document.getElementsByClassName('js-textTrim');
  
  // 表示したい行数
  let row = 2;
  
  // 文末に追加したい文字
  let clamp = '…';
  
  for (i = 0; i < selector.length; i++) {
    //CSSプロパティを取得
    var style = window.getComputedStyle(selector[i]);
    var fontsize = parseFloat(style.fontSize); //font-sizeを取得
    var width = parseFloat(style.width); //widthを取得
    var letterSpacing = parseFloat(style.letterSpacing); //letter-spacingを取得
  
    // 収まる文字数を計算
    var wordCount = Math.floor(width / fontsize) * row;
  
    // 文字数を超えたら
    if (selector[i].innerText.length > wordCount) {
      var str = selector[i].innerText; //文字数を取得
      str = str.substr(0, (wordCount - 1)); //1文字削る
      selector[i].innerText = str + clamp; //文末にテキストを足す
    }
  }
}
textTrim();


// 成果物折り畳み
// 'openHere'というクラスに属するオブジェクトをインライン要素or非表示に変更する。
function openClose(){
    var obj = document.getElementsByClassName('openHere');
    for(var i=0;i<obj.length;i++){
        //非表示ならインライン要素に変更。表示状態なら非表示に変更。
        if(obj[i].style.display == "inline-block"){
            obj[i].style.display = "none";
        }
        else{
            obj[i].style.display = "inline-block";
        }
    }
}