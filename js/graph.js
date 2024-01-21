// テキスト切り替え
setTimeout(function () {
  let visibleText = document.querySelector(".visible_text");
  let hiddenText = document.querySelector(".hidden_text");

  visibleText.style.opacity = 0;
  hiddenText.style.opacity = 1;
}, 2500);

// データ設定
let config = {
  data: {
    labels: ["0", "HTML", "CSS", "JS", "GAS", "PHP", "Laravel", "", "", ""],
    datasets: [
      {
        label: "dataset1",
        backgroundColor: "#181818",
        borderColor: "#181818",
        data: [0, 10, 25, 40, 50, 80, 100, 150, 250, 500],
      },
    ],
  },
};

let stage;

// ページ読み込み後、init関数スタート
window.addEventListener("load", init);
function init() {
  stage = new createjs.Stage("myCanvas");

  updateCanvasSize();
  drawGraph();

  // 1秒間に60回画面を更新し、アニメーションを非常に滑らかに動かす
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", stage);
}

function updateCanvasSize() {
  let windowWidth = window.innerWidth;
  let windowLg = 1024;
  if (windowLg <= windowWidth) {
    //横幅1024px以上（主にPC）時のグラフ表示サイズ
    let vwWidth = window.innerWidth * 0.75; // ビューポートの幅の75%
    stage.canvas.width = vwWidth;
    let vhHeight = window.innerHeight * 0.9; // ビューポートの幅の90%
    stage.canvas.height = vhHeight;
  } else {
    //横幅1024px未満（主にタブレット、スマホ）時のグラフ表示サイズ
    let vwWidth = window.innerWidth * 0.9; // ビューポートの幅の90%
    stage.canvas.width = vwWidth;
    let vhHeight = window.innerHeight * 0.95 - 100; // ビューポートの幅の95%-フッター幅（100px）
    stage.canvas.height = vhHeight;
  }
}

// ウィンドウのリサイズ時にCanvasのサイズを更新
window.addEventListener("resize", function () {
  updateCanvasSize();
  stage.update();
});

function drawGraph() {
  // パディング幅 10%
  let padding = 0.1;

  // 軸の基準
  let baseX = stage.canvas.width * padding;
  let baseY = stage.canvas.height * (1.0 - padding);

  // 横軸ラベルの数
  let horizontalLength = config.data.labels.length;
  let horizontalStep =
    (stage.canvas.width * (1 - padding * 2)) / horizontalLength;

  // 縦軸ラベルの数
  let verticalLength = 5;

  // 縦軸ラベルの間隔
  let verticalStep = (stage.canvas.height * (1 - padding * 2)) / verticalLength;

  let waitTime = 0;

  // 横軸の描画
  let horizontalLine = new createjs.Shape();
  horizontalLine.x = baseX;
  horizontalLine.y = baseY;
  horizontalLine.graphics
    .beginStroke("#181818")
    .moveTo(0, 0)
    .lineTo(stage.canvas.width * (1 - padding * 2), 0)
    .endStroke();
  stage.addChild(horizontalLine);

  // 縦軸の描画
  let verticalLine = new createjs.Shape();
  verticalLine.x = baseX;
  verticalLine.y = baseY;
  verticalLine.graphics
    .beginStroke("#181818")
    .moveTo(0, 0)
    .lineTo(0, -stage.canvas.height * (1 - padding * 2))
    .endStroke();
  stage.addChild(verticalLine);

  // 横軸ラベル
  let isVertical = stage.canvas.width <= 639; // 横幅に基づくラベルの方向を決定
  for (let i = 1; i < horizontalLength; i++) {
    let labels = new createjs.Text(
      config.data.labels[i],
      "12px serif",
      "#181818"
    );
    if (isVertical) {
      // 横幅が639px以下の場合、ラベルを縦書きにする
      labels.rotation = 90;
      labels.x = baseX + horizontalStep * i; // X位置を調整
      labels.y = baseY + 20; // Y位置を調整
    } else {
      // 横幅が639pxより大きい場合、ラベルを横書きにする
      labels.x = baseX + horizontalStep * i;
      labels.y = baseY + 10;
    }
    labels.textAlign = "center";
    stage.addChild(labels);
  }

  // 縦軸ラベル
  for (let i = 0; i < verticalLength; i++) {
    let labels = new createjs.Text(i * 100, "12px serif", "#181818");
    labels.x = baseX - 10;
    labels.y = baseY - verticalStep * i;
    labels.textAlign = "right";
    labels.textBaseline = "middle";
    stage.addChild(labels);
  }

  // 横軸補助線
  for (let i = 1; i < verticalLength; i++) {
    let additionalLine = new createjs.Shape();
    additionalLine.x = baseX;
    additionalLine.y = baseY - verticalStep * i;
    additionalLine.graphics
      .beginStroke("lightgray")
      .setStrokeDash([2, 2], 0)
      .moveTo(0, 0)
      .lineTo(stage.canvas.width * (1 - padding * 2), 0)
      .endStroke();
    stage.addChild(additionalLine);
  }

  // 縦軸補助線
  for (let i = 1; i < horizontalLength; i++) {
    let additionalLine = new createjs.Shape();
    additionalLine.x = baseX + horizontalStep * i;
    additionalLine.y = baseY;
    additionalLine.graphics
      .beginStroke("lightblue")
      .setStrokeDash([2, 2], 0)
      .moveTo(0, 0)
      .lineTo(0, -stage.canvas.height * (1 - padding * 2))
      .endStroke();
    stage.addChild(additionalLine);
  }

  // 前のデータ点座標を保持する
  let prevX = baseX;
  let prevY = baseY;

  // データ点
  for (let key in config.data.datasets) {
    for (let i = 0; i < horizontalLength; i++) {

      // now skillsのグラフの描写
      if (i < horizontalLength - 3) {

        // 点の描画
        let dot = new createjs.Shape();
        dot.graphics.beginFill(config.data.datasets[key].backgroundColor);
        dot.graphics.drawCircle(0, 0, 5);
        dot.x = baseX + horizontalStep * i;
        dot.y =
          baseY - (config.data.datasets[key].data[i] * verticalStep) / 100;
        dot.dataVal = config.data.datasets[key].data[i];
        stage.addChild(dot);

        // 点の動き
        createjs.Tween.get(dot)
          .to({ scale: 0 }, 0)
          .wait(500 + waitTime)
          .to({ scale: 2.0 }, 200)
          .to({ scale: 1.0 }, 200, createjs.Ease.cubicOut);

        // 線の描画
        let stroke = new createjs.Shape();
        stroke.graphics
          .beginStroke(config.data.datasets[key].borderColor)
          .moveTo(0, 0)
          .lineTo(dot.x - prevX, dot.y - prevY)
          .endStroke();
        stroke.x = prevX;
        stroke.y = prevY;
        stage.addChildAt(stroke, 0);

        // 線の動き
        createjs.Tween.get(stroke)
          .to({ scaleX: 0, scaleY: 0 }, 0)
          .wait(500 + waitTime)
          .to({ scaleX: 1.0, scaleY: 1.0 }, 100);

        prevX = baseX + horizontalStep * i;
        prevY =
          baseY - (config.data.datasets[key].data[i] * verticalStep) / 100;

        waitTime += 300;

        // future skillsのグラフの描写
      } else {

        // 点の描画
        let dot = new createjs.Shape();
        dot.graphics.beginFill("#EDB900");
        dot.graphics.drawCircle(0, 0, 5);
        dot.x = baseX + horizontalStep * i;
        dot.y =
          baseY - (config.data.datasets[key].data[i] * verticalStep) / 100;
        dot.dataVal = config.data.datasets[key].data[i];
        stage.addChild(dot);

        // 点の動き
        createjs.Tween.get(dot)
          .to({ scale: 0 }, 0)
          // 2500ミリ秒追加することで、テキスト変化後に描画スタート
          .wait(500 + waitTime + 2500)
          .to({ scale: 2.5 }, 200)
          .to({ scale: 1.5 }, 200, createjs.Ease.cubicOut)
          .call(startLoopAnimation); // ループアニメーションを開始

        // 線の描画
        let stroke = new createjs.Shape();
        stroke.graphics
          .setStrokeStyle(3)
          .beginStroke("#EDB900")
          .moveTo(0, 0)
          .lineTo(dot.x - prevX, dot.y - prevY)
          .endStroke();
        stroke.x = prevX;
        stroke.y = prevY;
        stage.addChildAt(stroke, 0);

        // 線の動き
        createjs.Tween.get(stroke)
          .to({ scaleX: 0, scaleY: 0 }, 0)
          // 2500ミリ秒追加することで、テキスト変化後に描画スタート
          .wait(500 + waitTime + 2500)
          .to({ scaleX: 1.0, scaleY: 1.0 }, 100);

        prevX = baseX + horizontalStep * i;
        prevY =
          baseY - (config.data.datasets[key].data[i] * verticalStep) / 100;

        waitTime += 300;

        // ループアニメーションの関数
        function startLoopAnimation() {
          createjs.Tween.get(dot, { loop: true })
            .to({ scale: 1.5 }, 200, createjs.Ease.cubicOut)
            .wait(2500)
            .to({ scale: 2.5 }, 200, createjs.Ease.cubicOut)
        }
      }
    }
    prevX = baseX;
    prevY = baseY;
  }
}
