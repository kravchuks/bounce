const container = document.querySelector('.container')
container.addEventListener('click', () => window.location.reload())
const leftArrow = document.querySelector('.left-arrow')
const rightArrow = document.querySelector('.right-arrow')
const ball = document.createElement('div')
let isGameOver = false
let platformCount = 5
let platforms = []
let score = 0
let ballLeftSpace = 50
let startPoint = 150
let ballBottomSpace = startPoint
let downTimerId
let isGoingLeft = false
let isGoingRight = false
let leftTimerId
let rightTimerId
  
//class for build platform
class Platform {
    constructor(newPlatBottom) {
      this.left = Math.random() * 315
      this.bottom = newPlatBottom
      this.visual = document.createElement('div')

      const visual = this.visual
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      container.appendChild(visual)
    }
}
  
function createPlatforms() {
    for(let i =0; i < platformCount; i++) {
      let platGap = 600 / platformCount
      let newPlatBottom = 100 + i * platGap
      let newPlatform = new Platform (newPlatBottom)
      platforms.push(newPlatform)
    }
}

function movePlatforms() {
  if (ballBottomSpace > 200) {
        platforms.forEach(platform => {
          //platform goes bottom
          platform.bottom -= 4
          let visual = platform.visual
          visual.style.bottom = platform.bottom + 'px'
          //remove platform
          if(platform.bottom < 10) {
            let firstPlatform = platforms[0].visual
            firstPlatform.classList.remove('platform')
            platforms.shift()
            score++
            var newPlatform = new Platform(600)
            platforms.push(newPlatform)
          }
          //platform goes right
          if (platform.left >= 50) {
                platform.left +=0.9
                let visual = platform.visual
                visual.style.left = platform.left + 'px'
           }
           //platform goes left
          if (platform.left <= 200) {
                platform.left -=0.6
                let visual = platform.visual
                visual.style.left = platform.left + 'px'
        }
      }) 
    }
}

function createBall() {
    container.appendChild(ball)
    ball.classList.add('ball')
    ballLeftSpace = platforms[0].left + 70
    ball.style.left = ballLeftSpace + 'px'
    ball.style.bottom = ballBottomSpace - 35 + 'px'
}
  
function moveLeft() {
    if (isGoingRight) {
        clearInterval(rightTimerId)
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
      ballBottomSpace += 5
      ball.style.bottom = ballBottomSpace + 'px'
      if (ballLeftSpace >= 0) {
        ballLeftSpace -=5
        ball.style.left = ballLeftSpace + 'px'
      } else moveRight()
    },20)
    if (ballBottomSpace > (startPoint + 200)) {
      fall()
    }
    platforms.forEach(platform => {
      if (ballBottomSpace == (platform.bottom + 15)) {
        clearInterval(downTimerId)
      }
    })
}

leftArrow.addEventListener('click', moveLeft)
  
function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId)
      isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function () {
      ballBottomSpace += 5
      ball.style.bottom = ballBottomSpace + 'px'
      if (ballLeftSpace <= 313) {
        ballLeftSpace +=5
        ball.style.left = ballLeftSpace + 'px'
      } else moveLeft()
    },20)
    if (ballBottomSpace > (startPoint + 200)) {
      fall()
    }
    platforms.forEach(platform => {
      if (ballBottomSpace == (platform.bottom + 15)) {
        clearInterval(downTimerId)
      }
    })
}

rightArrow.addEventListener('click', moveRight)

//fall a ball
function fall() {
  clearInterval(leftTimerId)
  clearInterval(rightTimerId)
  downTimerId = setInterval(function () {
    ballBottomSpace -= 5
    ball.style.bottom = ballBottomSpace + 'px'
    if (ballBottomSpace <= 0) {
      gameOver()
    }  
  },20)   
}
    
function gameOver() {
    isGameOver = true
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    container.innerHTML = score + `"click here to reload"`
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
}

function start() {
    if (!isGameOver) {
      createPlatforms()
      createBall()
      setInterval(movePlatforms,30)   
    } 
};

start()
