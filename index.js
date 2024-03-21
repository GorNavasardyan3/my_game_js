const canvas  = document.querySelector('canvas');
const context = canvas.getContext('2d')
const start = document.querySelector('.btn');
start.style.color = 'greenyellow';
start.style.backgroundColor = 'green'
const startAudio = document.createElement('audio');
startAudio.src = 'http://www.superluigibros.com/downloads/sounds/GAMECUBE/SUPERMARIOSUNSHINE/WAV/coin.wav'
const loadingAnime = document.querySelector('.anime');
hide(loadingAnime)
const end = document.querySelector('.end')
end.style.color = 'green'
const $timeID = document.querySelector('#time');
$timeID.style.fontSize = '30px'
const $timeClass = document.querySelector('.time');
$timeClass.style.fontSize = '30px'
$timeClass.style.color = 'green'
const keysText = document.querySelector('.keys');
const backgroundImg = document.createElement('img');
backgroundImg.src = 'bg.jpg'
const heroImg = document.createElement('img');
heroImg.src = 'hero.webp'
const bulletImg = document.createElement('img');
bulletImg.src = 'suriken.png'
const audioShoot = document.createElement('audio');
audioShoot.src = 'http://inventwithpython.com/match5.wav'
const dogImg = document.createElement('img');
dogImg.src = 'dog.png'
const keys = document.querySelector('.changeDiv')
let data = {
    hero: {
        x:10,
        y:180,
        width:100,
        height:100,
        xDeta:0,
        yDeta:0
    },
    bullets:[],
    dogs:[]
}


function intersect(rect1,rect2) {
    const x = Math.max(rect1.x,rect2.x),
    num1 = Math.min(rect1.x + rect1.width,rect2.x + rect2.width),
    y = Math.max(rect1.y,rect2.y),
    num2 = Math.min(rect1.y + rect1.height,rect2.y + rect2.height)
    return (num1 >= x && num2 >= y);
}



function update() {
    data.hero.x += data.hero.xDeta
    data.hero.y += data.hero.yDeta
    data.bullets.forEach((bullet) => {
        data.dogs.forEach((dog) => {
            if(intersect(dog,bullet)) {
               bullet.deleteMe = true;
               dog.deleteMe = true
            }
        })
    })

    data.bullets = data.bullets.filter((bullet) => {
        return bullet.deleteMe !== true
    })
    data.dogs = data.dogs.filter((dog) => {
        return dog.deleteMe !== true
    })

    data.bullets.forEach((bullet) => {
        bullet.x += bullet.xDeta
    })

    data.bullets = data.bullets.filter((bullet) => {
        if(bullet.x > canvas.width) {
            return false
        } 
            return true
    })
    data.dogs.forEach((dog) => {
        dog.x += dog.xDeta
    })

    if(data.dogs.length === 0) {
        data.dogs.push({
            xDeta:-1,
            x:canvas.width - 100,
            y:data.hero.y,
            width:100,
            height:100,
        })
    }
}


function startGame() {
   hide(start)
      startAudio.play()
      loop()
      show(loadingAnime)
    setTimeout(() => {
      hide(loadingAnime)
   },2000)
   setTimeout(() => {
      let interval = setInterval(() => {
         let time = +$timeID.textContent - 0.1
         $timeID.textContent = time.toFixed(1)
         if(time === 0) {
            clearInterval(interval);
              endGame()
          }
      },100)
   },2000)
}


function drow() {
    
    context.drawImage(backgroundImg, 0,0,canvas.width,canvas.height);
    context.drawImage(heroImg,data.hero.x,data.hero.y,data.hero.width,data.hero.height)
    data.bullets.forEach((bullet) => {
        context.drawImage(bulletImg,bullet.x,bullet.y,bullet.width,bullet.height)
    })
    data.dogs.forEach((dog) => {
        context.drawImage(dogImg,dog.x,dog.y,dog.width,dog.height)
    })
}

function loop() {
   requestAnimationFrame(loop)
   update()
   setTimeout(() => {
      drow()
   },2000)
}

start.addEventListener('click',startGame)


document.addEventListener('keydown',function(evt){
    if(evt.code === 'ArrowRight') {
        data.hero.xDeta = 2
    } else if(evt.code === 'ArrowLeft') {
        data.hero.xDeta = -2
    } else if(evt.code === 'ArrowDown') {
        data.hero.yDeta = 2
    } else if(evt.code === 'ArrowUp') {
        data.hero.yDeta = -2
    } else if(evt.code === 'Space') {
        audioShoot.currentTime = 0
        audioShoot.play()
        data.bullets.push({
            xDeta:5,
            x:data.hero.x + 80,
            y:data.hero.y + 40,
            width:30,
            height:30
            })
    }
});
document.addEventListener('keyup',() =>
    data.hero.xDeta = 0
);
document.addEventListener('keyup',() =>
    data.hero.yDeta = 0
);

function endGame() {
        hide(canvas)  
        endShow(end)
        hide($timeID)
        hide($timeClass)
        hide(keys)
        hide(keysText)
    }
    
    function hide($el) {
        $el.classList.add('hide')
    } 
    function show($el) {
        $el.classList.remove('hide')
    }

    function endHide($el) {
        $el.classList.add('end')
    }
    function endShow($el) {
        $el.classList.remove('end')
    }