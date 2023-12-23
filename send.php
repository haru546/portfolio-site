<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $to = "hisakuro@limelizard98.sakura.ne.jp";
    $subject = "お問い合わせがありました";
    $headers = "From:hisakuro@limelizard98.sakura.ne.jp";
    $body = "名前: $name\nメールアドレス: $email\n\n$message";
    if (mail($to, $subject, $body, $headers)) {
        $message = "お問い合わせが送信されました。ありがとうございます！";
    } else {
        $message = "エラーが発生しました。もう一度お試しください。";
    }
} else {
    header("Location: contact.php");
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>contact -transmission</title>
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
            <h1 class="text-3xl font-semibold mb-10">お問い合わせ - 送信完了画面</h1>
            <h2 class="text-xl font-semibold mb-5" style="border-bottom: 1px solid"><?php echo $message; ?></h2>
            <p>
                <?php
                if ($message === "お問い合わせが送信されました。ありがとうございます！") {
                    echo "1週間以内に送信いただいたメールアドレスまで返信させて頂きます。";
                }
                ?>
            </p>
            <div class="text-center">
                <p class="mt-10"><a href="contact.php" class="rounded-full bg-gray-300 hover:bg-gray-500 px-4 py-2">お問い合わせフォームに戻る</a></p>
            </div>
        </main>
    </div>
</body>

</html>