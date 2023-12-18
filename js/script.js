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