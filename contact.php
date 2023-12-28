<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>harukahisakuro portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css" />
    <script
      src="https://kit.fontawesome.com/84fcae9cc5.js"
      crossorigin="anonymous"
    ></script>
    <!-- 折れ線グラフ -->
    <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
    <script src="https://code.createjs.com/1.0.0/tweenjs.min.js"></script>
  </head>
  <body
    class="w-screen text-gray-800"
    style="font-family: 'M PLUS Rounded 1c', sans-serif"
  >
    <div class="lg:flex">
      <nav
        class="lg:w-1/4 lg:h-screen lg:fixed sm:flex lg:flex-col lg:items-center w-full h-20"
      >
        <a href="index.html#">
          <img
            id="logo"
            src="images/logo.png"
            alt="logo"
            class="lg:max-w-full lg:h-auto h-20 w-auto"
        /></a>
        <div class="menu-toggle mr-14">&#9776;</div>
        <ul
          class="lg:text-3xl font-semibold lg:text-center sm:flex lg:flex-col lg:justify-evenly lg:mb-10"
        >
          <li class="lg:mb-12">
            <a href="self_introduction.html" class="hover:text-yellow-500"
              ><i class="fa-regular fa-face-smile"></i> 自己紹介</a
            >
          </li>
          <li class="lg:mb-12">
            <a href="skills.html" class="hover:text-yellow-500"
              ><i class="fa-regular fa-keyboard"></i> スキル</a
            >
          </li>
          <li class="lg:mb-12">
            <a href="projects.html" class="hover:text-yellow-500"
              ><i class="fa-regular fa-folder-open"></i> 成果物</a
            >
          </li>
          <li>
            <a href="contact.php" class="hover:text-yellow-500"
              ><i class="fa-solid fa-phone"></i> お問い合わせ</a
            >
          </li>
        </ul>
      </nav>
      <main class="lg:w-3/4 h-screen w-full">
        <h1 class="lg:text-4xl font-semibold lg:mb-10 text-2xl mb-4">お問い合わせ</h1>
        <h2 class="lg:text-2xl font-semibold mb-5 text-xl" style="border-bottom: 1px solid">
          いつでもお問合せお待ちしております。
        </h2>
        <form
          action="confilm.php"
          method="post"
          onsubmit="return validateForm()"
        >
          <label for="name">
            <p class="lg:text-lg text-base">
              お名前（必須）<br />
              <input id="name" type="text" name="name" class="w-full h-8 border border-black mb-5" required />
            </p>
          </label>
          <label for="email">
            <p class="lg:text-lg text-base">
              メールアドレス（必須）<br />
              <input id="email" type="email" name="email" class="w-full h-8 border border-black mb-5" required />
            </p>
          </label>
          <label for="massage">
            <p class="lg:text-lg text-base">
              内容（必須）<br />
              <textarea id="message" name="message" class="w-full h-56 border border-black mb-5 text-justify:top" required></textarea>
            </p>
          </label>
          <div>
            <p class="lg:text-lg text-base">プライバシーポリシー</p>
            <div class="w-full h-40 border border-black overflow-auto lg:text-base text-sm">
              <p>
                私、久黒悠はお客様が安心してこのウェブサイトをご利用頂けるよう、個人情報保護に取り組んでいます。
              </p>
              <p class="mt-2">
                1&rpar;個人情報の収集と利用<br />
                私が収集するお客様の個人情報は、収集目的を明確にした上で、目的の範囲内に限ります。<br />
                また、個人情報の利用は、その収集目的から逸脱しない範囲とします。
              </p>
              <p class="mt-1">
                2&rpar;個人情報の管理<br />
                個人情報の管理は、お客様にご承諾頂いた場合を除き第三者に対しデータを開示・提供することはしません。
              </p>
              <p class="mt-1">
                3&rpar;準拠法等<br />
                私が保有する個人情報に関して適用される法令、規範を遵守します。
              </p>
              <p class="mt-1">
                4&rpar;個人情報保護管理体制および仕組みの継続的な改善<br />
                私は、個人情報保護に関する管理の体制と仕組みについて継続的改善を実施します。
              </p>
              <p class="mt-3">
                2024年12月<br />
                久黒悠
              </p>
            </div>
            <label for="privacy_agree">
              <input
                id="privacy_agree"
                type="checkbox"
                name="agree"
                value="1"
                class="lg:text-lg text-base"
              />プライバシーポリシーに同意する
            </label>
            <p id="privacyError" class="error-message text-rose-800 lg:text-lg text-base"></p>
          </div>
          <div class="text-center last-tag">
          <input type="submit" value="送信" class="mt-10 mb-5 rounded-full bg-gray-300 hover:bg-gray-500 px-4 py-2 lg:text-lg text-base">
          </div>
        </form>
      </main>
    </div>

    <script src="js/script.js"></script>
  </body>
</html>
