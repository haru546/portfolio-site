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
    labels: ["0", "HTML", "CSS", "JS", "PHP", "Laravel", "Github", "", "", ""],
    datasets: [
      {
        label: "dataset1",
        backgroundColor: "DarkRed",
        borderColor: "chocolate",
        data: [0, 10, 25, 40, 65, 90, 100, 150, 250, 500],
      },
    ],
  },
};

// width: 75vw;、height:100vhにしたい場合
window.addEventListener("load", init);
function init() {
  let stage = new createjs.Stage("myCanvas");
  updateCanvasSize(stage);

  drawGraph(stage);

  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick() {
    stage.update();
  }
}

function updateCanvasSize(stage) {
  let vwWidth = window.innerWidth * 0.75; // ビューポートの幅の75%
  stage.canvas.width = vwWidth;
  let vhHeight = window.innerHeight * 1.0; // ビューポートの幅の100%
  stage.canvas.height = vhHeight;
}

// ウィンドウのリサイズ時にCanvasのサイズを更新
window.addEventListener("resize", function () {
  updateCanvasSize(stage);
  stage.update();
});

function drawGraph(stage) {
  // パディングサイズ 10%
  let padding = 0.1;

  // 軸の基準
  let baseX = stage.canvas.width * padding;
  let baseY = stage.canvas.height * (1.0 - padding);

  // 横軸の描画
  let horizontalLine = new createjs.Shape();
  horizontalLine.x = baseX;
  horizontalLine.y = baseY;
  horizontalLine.graphics
    .beginStroke("gray")
    .moveTo(0, 0)
    .lineTo(stage.canvas.width * (1 - padding * 2), 0)
    .endStroke();
  stage.addChild(horizontalLine);

  // 縦軸の描画
  let verticalLine = new createjs.Shape();
  verticalLine.x = baseX;
  verticalLine.y = baseY;
  verticalLine.graphics
    .beginStroke("gray")
    .moveTo(0, 0)
    .lineTo(0, -stage.canvas.height * (1 - padding * 2))
    .endStroke();
  stage.addChild(verticalLine);

  // 横軸ラベルの数
  let horizontalLength = config.data.labels.length;

  // 横軸ラベルの間隔
  let horizontalStep =
    (stage.canvas.width * (1 - padding * 2)) / horizontalLength;

  // 横軸ラベル
  for (let i = 0; i < horizontalLength; i++) {
    let labels = new createjs.Text(config.data.labels[i], "12px serif", "gray");
    labels.x = baseX + horizontalStep * i;
    labels.y = baseY + 10;
    labels.textAlign = "center";
    stage.addChild(labels);
  }

  // 縦軸ラベルの数
  let verticalLength = 5;

  // 縦軸ラベルの間隔
  let verticalStep = (stage.canvas.height * (1 - padding * 2)) / verticalLength;

  // 縦軸ラベル
  for (let i = 0; i < verticalLength; i++) {
    let labels = new createjs.Text(i * 100, "12px serif", "gray");
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

  let waitTime = 0;

  if (waitTime <= 1800) {
    // データ点
    for (let key in config.data.datasets) {
      for (let i = 0; i < horizontalLength; i++) {
        if (config.data.datasets[key].data[i] == null) {
          continue;
        }

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
      }
      prevX = baseX;
      prevY = baseY;
    }
  } else {
    // データ点と線のアニメーション
    for (let key in config.data.datasets) {
      for (let i = 0; i < horizontalLength; i++) {
        // ... [existing code to draw initial points and lines] ...
        // Add your existing code here to draw the initial points and lines
        // up to the "Github" point
      }

      let textTransitionDelay = 4000;

      // After the last label "Github", you want to animate additional points
      let extraPoints = [150, 250, 500]; // Extra points after "Github"
      for (let i = 0; i < extraPoints.length; i++) {
        let pointValue = extraPoints[i];
        let pointIndex = horizontalLength - 3 + i; // Starting index after "Github"

        // Calculate the position for the additional points
        let dotX = baseX + horizontalStep * pointIndex;
        let dotY = baseY - (pointValue * verticalStep) / 100;

        // Create and animate the dot for the additional point
        let dot = new createjs.Shape();
        dot.graphics.beginFill(config.data.datasets[key].backgroundColor);
        dot.graphics.drawCircle(0, 0, 5);
        dot.x = dotX;
        dot.y = dotY;
        stage.addChild(dot);

        // Animate the dot's appearance with a delay based on waitTime
        createjs.Tween.get(dot)
          .to({ scale: 0 }, 0)
          .wait(waitTime + textTransitionDelay)
          .to({ scale: 2.0 }, 200)
          .to({ scale: 1.0 }, 200, createjs.Ease.cubicOut);

        // Create and animate the line from the previous point to this new pointF
        let stroke = new createjs.Shape();
        stroke.graphics.beginStroke(config.data.datasets[key].borderColor);
        // Start the line at the previous point
        stroke.graphics.moveTo(prevX - baseX, prevY - baseY);
        // Draw the line to the new point's position relative to the baseX and baseY
        stroke.graphics.lineTo(dotX - baseX, dotY - baseY);
        stroke.endStroke();

        // Set the position of the stroke to the base, as we have adjusted the moveTo and lineTo relative to the base
        stroke.x = baseX;
        stroke.y = baseY;
        stage.addChildAt(stroke, 0);

        // Animate the line's appearance with a delay based on waitTime
        createjs.Tween.get(stroke)
          .to({ scaleX: 0, scaleY: 0 }, 0)
          .wait(waitTime + textTransitionDelay)
          .to({ scaleX: 1.0, scaleY: 1.0 }, 100);

        // Update the previous point's coordinates
        prevX = dotX;
        prevY = dotY;

        // Increase waitTime for the next point's animation
        waitTime += 300;
      }
    }

    //       let additionalData = {
    //         labels: ["", "", ""],
    //         datasets: [
    //           {
    //             data: [150, 250, 500],
    //           },
    //         ],
    //       };

    //       function drawPointsAndLines(dataset, waitTime) {

    //     createjs.Tween.get(null)
    //     .wait(waitTime)
    //     .call(() => {

    //       for (let i = 0; i < dataset.data.length; i++) {
    //         let dot = new createjs.Shape();
    //         dot.graphics.beginFill("DarkRed").drawCircle(0, 0, 5);
    //         dot.x = baseX + horizontalStep * i;
    //         dot.y = baseY - (dataset.data[i] * verticalStep) / 100;
    //         stage.addChild(dot);

    //         createjs.Tween.get(dot)
    //         .to({ scale: 2.0 }, 200)
    //         .to({ scale: 1.0 }, 200, createjs.Ease.cubicOut);

    //         if (i > 0) {
    //           let line = new createjs.Shape();
    //           line.graphics
    //             .beginStroke("chocolate")
    //             .moveTo(baseX + horizontalStep * (i - 1), baseY - (dataset.data[i - 1] * verticalStep) / 100)
    //             .lineTo(dot.x, dot.y)
    //             .endStroke();
    //           stage.addChildAt(line, 0);
    //         }
    //       }
    //     });
    // }

    // drawPointsAndLines(config.data.datasets[0], 0);

    // drawPointsAndLines(additionalData.datasets[0], 3000);

    // drawPointsAndLines(additionalData.datasets[0], 6000);
  }
}

//   let githubIndex = config.data.labels.indexOf("Github");
// let emptyIndex = config.data.labels.indexOf("");

//       createjs.Tween.get(null)
//       .wait(2500)
//       .call(() => {

//       let githubDot = new createjs.Shape();
//       githubDot.graphics.beginFill("DarkRed").drawCircle(0, 0, 5);
//       githubDot.x = baseX + horizontalStep * githubIndex;
//       githubDot.y = baseY - (100 * verticalStep) / 100;
//       stage.addChild(githubDot);

//       let emptyDot = new createjs.Shape();
//       emptyDot.graphics.beginFill("DarkRed").drawCircle(0, 0, 5);
//       emptyDot.x = baseX + horizontalStep * emptyIndex;
//       emptyDot.y = baseY - (150 * verticalStep) / 100;
//       stage.addChild(emptyDot);

//     createjs.Tween.get(emptyDot)
//       .to({ scale: 2.0 }, 200)
//       .to({ scale: 1.0 }, 200, createjs.Ease.cubicOut);
// });

//       // Draw the line 2 seconds after the initial pause
//       createjs.Tween.get(null)
//         .wait(2500)
//         .call(() => {
//           let line = new createjs.Shape();
//           line.graphics
//             .beginStroke("chocolate")
//             .moveTo(baseX + horizontalStep * githubIndex,
//               baseY - (100 * verticalStep) / 100)
//             .lineTo(baseX + horizontalStep * emptyIndex,
//               baseY - (150 * verticalStep) / 100)
//             .endStroke();
//           stage.addChildAt(line, 0);
//     });
//   });
