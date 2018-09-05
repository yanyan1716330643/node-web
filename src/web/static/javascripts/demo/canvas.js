let canvasWidth = Math.min(400, $(window).width() - 20);
let canvasHeight = canvasWidth;
let strokeColor = 'black';
let isMouseDown = false;
let lastLoc = {x: 0, y: 0};
let lastTimestamp = 0;
let lastLineWidth = -1;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let drawCanvas = document.getElementById('drawCanvas');//img
drawCanvas.width = canvasWidth;
drawCanvas.height = canvasHeight;
$('#controller').css('width', canvasWidth + 'px');

/**
 *  画
 * @param point
 */
function moveStroke(point) {
    var curLoc = windowToCanvas(point.x, point.y)
    var curTimestamp = new Date().getTime()
    var s = calcDistance(curLoc, lastLoc)
    var t = curTimestamp - lastTimestamp

    var lineWidth = calcLineWidth(t, s)
    // console.log('lineWidth', lineWidth)
    //draw
    context.beginPath()
    context.moveTo(lastLoc.x, lastLoc.y)
    context.lineTo(curLoc.x, curLoc.y)

    context.strokeStyle = strokeColor
    context.lineWidth = lineWidth
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.stroke()

    lastLoc = curLoc
    lastTimestamp = curTimestamp
    lastLineWidth = lineWidth
}

/**
 * 计算距离
 * @param loc1
 * @param loc2
 * @returns {number}
 */
function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
}

/**
 * 计算线宽
 * @param t
 * @param s
 * @returns {number}
 */
function calcLineWidth(t, s) {
    var v = s / t
    var resultLineWidth = 0
    if (v <= 0.1) {
        resultLineWidth = 10
    } else if (v >= 10) {
        resultLineWidth = 1
    } else {
        resultLineWidth = 10 - (v - 0.1) / (10 - 0.1) * (10 - 1)
    }
    if (lastLineWidth == -1) {
        return resultLineWidth
    } else {
        return lastLineWidth * 2 / 3 + resultLineWidth * 1 / 3
    }

}




/**
 * canvas 鼠标down事件
 * @param e
 */
canvas.onmousedown = function (e) {
    e.preventDefault(); //阻止默认的动作发生
    beginStroke({x: e.clientX, y: e.clientY});
}

/**
 * 开始画(准备开始)
 * @param point
 */
function beginStroke(point) {
    isMouseDown = true
    lastLoc = windowToCanvas(point.x, point.y)
    lastTimestamp = new Date().getTime()
    polling();
}

/**
 * 结束画
 */
function endStroke() {
    // returnData()
    isMouseDown = false;
    clearInterval(longPolling);
}

/**
 * socket.io 传canvasData
 */
function returnData() {
    socket.emit('startConnect', canvas.toDataURL())
}


var longPolling;
/**
 * 定时任务(每200ms执行)
 */
function polling() {
    longPolling = setInterval(function () {
        returnData()
    }, 200);
}

/**
 * 绑定清空事件
 */
$("#clear_btn").click(
    function (e) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid();
        returnData();
    }
);



/**
 * 切换颜色控件绑定事件
 */
$(".color_btn").click(
    function (e) {
        $('.color_btn').removeClass('color_btn_selected')
        $(this).addClass('color_btn_selected')
        strokeColor = $(this).css('background-color')
    }
)

/**
 * 坐标转换 (获取以canvas)
 * @param x
 * @param y
 * @returns {{x: number, y: number}}
 */
function windowToCanvas(x, y) {
    var box = canvas.getBoundingClientRect()
    return {x: Math.round(x - box.left), y: Math.round(y - box.top)}
}



drawGrid();
/**
 * 画方格子
 */
function drawGrid() {
    context.save()
    context.strokeStyle = "rgb(230, 11, 9)"

    context.beginPath()
    context.moveTo(3, 3)
    context.lineTo(canvasWidth - 3, 3)
    context.lineTo(canvasWidth - 3, canvasHeight - 3)
    context.lineTo(3, canvasHeight - 3)
    context.closePath()

    context.lineWidth = 6
    context.stroke()

    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(canvasWidth, canvasHeight)
    context.moveTo(canvasWidth, 0)
    context.lineTo(0, canvasHeight)
    context.moveTo(canvasWidth / 2, 0)
    context.lineTo(canvasWidth / 2, canvasHeight)
    context.moveTo(0, canvasHeight / 2)
    context.lineTo(canvasWidth, canvasHeight / 2)
    context.closePath()

    context.lineWidth = 1
    context.stroke()
    context.restore()
}



//canvas-touch
/**
 * touch移动事件
 */
canvas.addEventListener('touchmove', function (e) {
    e.preventDefault()
    if (isMouseDown) {
        touch = e.touches[0]
        moveStroke({x: touch.pageX, y: touch.pageY})
        // console.log('onmousemove')
    }
});

/**
 * canvas 设置触摸开始监听事件
 */
canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    touch = e.touches[0];
    beginStroke({x: touch.pageX, y: touch.pageY});
});

/**
 * 结束touch事件
 */
canvas.addEventListener('touchend', function (e) {
    e.preventDefault()
    endStroke()
})



//canvas-mouse
/**
 * 鼠标移动
 * @param e
 */
canvas.onmousemove = function (e) {
    console.log(e.clientX, e.clientY)
    if (isMouseDown) {
        e.preventDefault()
        moveStroke({x: e.clientX, y: e.clientY})
        // console.log('onmousemove')
    }
}



/**
 * 鼠标离开
 * @param e
 */
canvas.onmouseout = function (e) {
    e.preventDefault()
    endStroke()
    // console.log('onmouseout')
}