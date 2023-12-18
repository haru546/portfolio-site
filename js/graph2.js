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

    // 横軸ラベルの数
    let horizontalLength = config.data.labels.length;
    let horizontalStep = (stage.canvas.width * (1 - padding * 2)) / horizontalLength;

    // 縦軸ラベルの数
    let verticalLength = 5;

    // 縦軸ラベルの間隔
    let verticalStep = (stage.canvas.height * (1 - padding * 2)) / verticalLength;

    let waitTime = 0;

    // 前のデータ点座標を保持する
    let prevX = baseX;
    let prevY = baseY;


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

    // 横軸ラベル
    for (let i = 0; i < horizontalLength; i++) {
        let labels = new createjs.Text(config.data.labels[i], "12px serif", "gray");
        labels.x = baseX + horizontalStep * i;
        labels.y = baseY + 10;
        labels.textAlign = "center";
        stage.addChild(labels);
    }

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

    // データ点
    for (let key in config.data.datasets) {
        for (let i = 0; i < horizontalLength - 3; i++) {
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

            if (i === 6) {
                pointSixX = dot.x;
                pointSixY = dot.y;
            }

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
}

setTimeout(function () {
    let padding = 0.1;

    // 軸の基準
    let baseX = stage.canvas.width * padding;
    let baseY = stage.canvas.height * (1.0 - padding);

    // 横軸ラベルの数
    let horizontalLength = config.data.labels.length;
    let horizontalStep = (stage.canvas.width * (1 - padding * 2)) / horizontalLength;

    // 縦軸ラベルの数
    let verticalLength = 5;

    // 縦軸ラベルの間隔
    let verticalStep = (stage.canvas.height * (1 - padding * 2)) / verticalLength;

    let waitTime = 0;

    // 前のデータ点座標を保持する
    let prevX = baseX;
    let prevY = baseY;

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

    // 横軸ラベル
    for (let i = 0; i < horizontalLength; i++) {
        let labels = new createjs.Text(config.data.labels[i], "12px serif", "gray");
        labels.x = baseX + horizontalStep * i;
        labels.y = baseY + 10;
        labels.textAlign = "center";
        stage.addChild(labels);
    }

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

        // データ点
        for (let key in config.data.datasets) {
            for (let i = 0; horizontalLength - 3 <= i; i++) {
                if (config.data.datasets[key].data[i] == null) {
                    continue;
                }
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
        }, 2500);