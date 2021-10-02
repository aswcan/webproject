const audio = document.getElementsByTagName('audio')[0]
// 更新进度条
audio.addEventListener('timeupdate', function () {
  updateProgress(audio)
}, false)
function updateProgress (audio) {
  var value = audio.currentTime / audio.duration
  document.getElementById('progressbar').style.width = value * 100 + '%'
  document.getElementById('progressdot').style.left = value * 100 + '%'
}
// 播放完毕进度条回归原点
audio.addEventListener('ended', function () {
  audioEnded()
}, false)
function audioEnded () {
  document.getElementById('progressbar').style.width = 0
  document.getElementById('progressdot').style.left = 0
}
// 点击跳转
const progressBarbg = document.getElementsByClassName('linebar')[0]
progressBarbg.addEventListener('mousedown', function (event) {
  if (!audio.paused || audio.currentTime !== 0) {
    const pgsWidth = parseFloat(window.getComputedStyle(progressBarbg, null).width.replace('px', ''))
    const rate = event.offsetX / pgsWidth
    console.log(rate)
    if (rate !== 0) {
      audio.currentTime = audio.duration * rate
      updateProgress(audio)
    }
  }
})
// 拖动
// const dot = document.getElementById('progressdot')

// const position = {
//   originOffsetLeft: 0,
//   originX: 0,
//   maxLeft: 0,
//   maxRight: 0
// }
// let flag = false

// dot.addEventListener('mousedown', down)
// dot.addEventListener('touchstart', down)

// document.addEventListener('mousemove', move)
// document.addEventListener('touchmove', move)

// document.addEventListener('mouseup', end)
// document.addEventListener('touchend', end)

// function down (event) {
//   if (!audio.paused || audio.currentTime !== 0) { // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
//     flag = true

//     position.originOffsetLeft = dot.offsetLeft
//     position.originX = event.touches ? event.touches[0].clientX : event.clientX // 要同时适配mousedown和touchstart事件
//     position.maxLeft = position.originOffsetLeft // 向左最大可拖动距离
//     position.maxRight = document.getElementsByClassName('progressbar-bg')[0].offsetWidth - position.originOffsetLeft // 向右最大可拖动距离

//     // 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
//     if (event && event.preventDefault) {
//       event.preventDefault()
//     } else {
//       event.returnValue = false
//     }

//     // 禁止事件冒泡
//     if (event && event.stopPropagation) {
//       event.stopPropagation()
//     } else {
//       window.event.cancelBubble = true
//     }
//   }
// }

// function move (event) {
//   if (flag) {
//     var clientX = event.touches ? event.touches[0].clientX : event.clientX // 要同时适配mousemove和touchmove事件
//     var length = clientX - position.oriX
//     if (length > position.maxRight) {
//       length = position.maxRight
//     } else if (length < -position.maxLeft) {
//       length = -position.maxLeft
//     }
//     var progressBarBg = document.getElementById('progressbar-bg')
//     var pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace('px', ''))
//     var rate = (position.originOffsetLeft + length) / pgsWidth
//     audio.currentTime = audio.duration * rate
//     updateProgress(audio)
//   }
// }

// function end () {
//   flag = false
// }
