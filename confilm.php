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
    <title>harukahisakuro portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css" />
    <script src="https://kit.fontawesome.com/84fcae9cc5.js" crossorigin="anonymous"></script>
    <!-- 折れ線グラフ -->
    <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
    <script src="https://code.createjs.com/1.0.0/tweenjs.min.js"></script>
</head>

<body class="w-screen text-gray-800" style="font-family: 'M PLUS Rounded 1c', sans-serif">
    <div class="lg:flex">
        <nav class="lg:w-1/4 lg:h-screen lg:fixed flex lg:flex-col lg:items-center w-full h-20">
            <a href="index.html#">
                <img id="logo" src="images/logo.png" alt="logo" class="lg:max-w-full lg:h-auto h-20 w-auto" /></a>
            <ul class="lg:text-3xl font-semibold lg:text-center flex lg:flex-col lg:justify-evenly lg:mb-10">
                <li class="lg:mb-12">
                    <a href="self_introduction.html" class="hover:text-yellow-500"><i class="fa-regular fa-face-smile"></i> 自己紹介</a>
                </li>
                <li class="lg:mb-12">
                    <a href="skills.html" class="hover:text-yellow-500"><i class="fa-regular fa-keyboard"></i> スキル</a>
                </li>
                <li class="lg:mb-12">
                    <a href="projects.html" class="hover:text-yellow-500"><i class="fa-regular fa-folder-open"></i> 成果物</a>
                </li>
                <li>
                    <a href="contact.php" class="hover:text-yellow-500"><i class="fa-solid fa-phone"></i> お問い合わせ</a>
                </li>
            </ul>
        </nav>
        <main class="lg:w-3/4 h-screen w-full">
            <h1 class="lg:text-4xl font-semibold mb-10 text-2xl">お問い合わせ - 確認画面</h1>
            <h2 class="lg:text-2xl font-semibold mb-5 text-xl" style="border-bottom: 1px solid">
                以下の内容で送信します。よろしいですか？</h2>

            <p class="lg:text-lg text-base">名前：<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?></p>
            <p class="lg:text-lg text-base">メールアドレス：<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?></p>
            <p class="mb-5 lg:text-lg text-base">お問い合わせ内容：<?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>

            <form method="post" action="send.php">
                <input type="hidden" name="name" value="<?php echo $name; ?>">
                <input type="hidden" name="email" value="<?php echo $email; ?>">
                <input type="hidden" name="message" value="<?php echo $message; ?>">
                <div class="flex justify-around">
                    <input type="submit" value="送信" class="mt-10 mb-5 rounded-full bg-gray-300 hover:bg-gray-500 px-4 py-2 lg:text-lg text-base">
                    <button type="button" onclick="history.back()" class="mt-10 mb-5 rounded-full bg-gray-300 hover:bg-gray-500 px-4 py-2 lg:text-lg text-base">戻る</button>
                </div>
            </form>
        </main>
    </div>
</body>

</html>