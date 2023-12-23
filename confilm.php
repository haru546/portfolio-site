<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
} else {
    header("Location: contact.php");
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>contact -confirmation</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700&display=swap" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://kit.fontawesome.com/84fcae9cc5.js" crossorigin="anonymous"></script>
    <!-- 折れ線グラフ -->
    <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
    <script src="https://code.createjs.com/1.0.0/tweenjs.min.js"></script>
</head>

<body class="w-screen text-gray-800" style="padding: 35px; font-family: 'M PLUS Rounded 1c', sans-serif">
    <div class="flex">
        <nav class="w-1/4 h-screen fixed flex flex-col items-center">
            <a href="index.html#" style="flex: 1; flex-basis: 0"><img id="logo" src="images/logo.png" alt="logo" class="max-w-full h-auto" /></a>
            <ul class="text-3xl font-semibold text-center flex flex-col justify-evenly mb-10" style="flex: 2; flex-basis: 0">
                <li class="mb-12">
                    <a href="self_introduction.html" class="hover:text-yellow-500"><i class="fa-regular fa-face-smile"></i> 自己紹介</a>
                </li>
                <li class="mb-12">
                    <a href="skills.html" class="hover:text-yellow-500"><i class="fa-regular fa-keyboard"></i> スキル</a>
                </li>
                <li class="mb-12">
                    <a href="projects.html" class="hover:text-yellow-500"><i class="fa-regular fa-folder-open"></i> 成果物</a>
                </li>
                <li>
                    <a href="contact.php" class="hover:text-yellow-500"><i class="fa-solid fa-phone"></i> お問い合わせ</a>
                </li>
            </ul>
        </nav>
        <main class="w-3/4 h-screen" style="margin-left: 25vw">
            <h1 class="text-3xl font-semibold mb-10">お問い合わせ - 確認画面</h1>
            <h2 class="text-xl font-semibold mb-5" style="border-bottom: 1px solid">
                以下の内容で送信します。よろしいですか？</h2>

            <p>名前：<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?></p>
            <p>メールアドレス：<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?></p>
            <p class="mb-5">お問い合わせ内容：<?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>

            <form method="post" action="send.php">
                <input type="hidden" name="name" value="<?php echo $name; ?>">
                <input type="hidden" name="email" value="<?php echo $email; ?>">
                <input type="hidden" name="message" value="<?php echo $message; ?>">
                <div class="flex justify-around">
                    <input type="submit" value="送信" class="mt-10 mb-5 rounded-full bg-gray-300 hover:bg-gray-500 px-4 py-2">
                    <button type="button" onclick="history.back()" class="mt-10 mb-5 rounded-full bg-gray-300 hover:bg-gray-500 px-4 py-2">戻る</button>
                </div>
            </form>
        </main>
    </div>
</body>

</html>