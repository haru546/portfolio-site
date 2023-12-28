// indexのみ　logoクリックでページをreloadする方法
function doReload() {
    window.location.reload();
}

// お問い合わせ
function validateForm() {
    // チェックボックスの状態を取得
    let privacyCheckbox = document.getElementById("privacy_agree");
    let privacyError = document.getElementById("privacyError");

    // チェックが入っていない場合にエラーメッセージを表示
    if (!privacyCheckbox.checked) {
      privacyError.textContent = "※プライバシーポリシーに同意してください";
      return false; // 送信を中止
    } else {
      privacyError.textContent = ""; // エラーメッセージをクリア
      return true; // 送信を許可
    }
  }

 // ハンバーガーメニュー
 document.addEventListener('DOMContentLoaded', function () {
  let menuToggle = document.querySelector('.menu-toggle');
  let navMenu = document.querySelector('nav ul');

  menuToggle.addEventListener('click', function () {
      if (navMenu.style.display === 'none' || navMenu.style.display === '') {
          navMenu.style.display = 'flex';
          menuToggle.innerHTML = '&#10006;'; // ハンバーガーアイコンからばつに変更
      } else {
          navMenu.style.display = 'none';
          menuToggle.innerHTML = '&#9776;'; // ばつからハンバーガーアイコンに変更
      }
  });
});

// スマホの時、テキスト書き換え
document.addEventListener('DOMContentLoaded', function () {
  const githubText = document.querySelector('.github-text');
  const googlesheetsText = document.querySelector('.googlesheets-text');

  function updateText() {
    if (window.innerWidth <= 639) {
      githubText.textContent = 'Github:';
      googlesheetsText.textContent = 'Google Sheets:';
    } else {
      githubText.textContent = 'Github';
      googlesheetsText.textContent = 'Google Sheets';
    }
  }

  // 初期ロード時とウィンドウサイズの変更時に関数を実行
  updateText();
  window.addEventListener('resize', updateText);
});