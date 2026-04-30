const grid = document.getElementById('grid');
const movesEl = document.getElementById('stat-moves');
const pairsEl = document.getElementById('stat-pairs');
const timeEl = document.getElementById('stat-time');

const emojis = ["🍕","🍔","🌭","🍩","🍧","🧁","🍭","🍎",]

let cards = [];
let flipped = [];
let moves = 0;
let pairs = 0;
let timer = 0;
let interval;

function shuffle(arr){
    const a = [...arr];
    for(let i=a.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
}
function startGame(){
    grid.innerHTML="";
    let gameEmojis = shuffle([...emojis,...emojis]);

    gameEmojis.forEach(e=>{
        const card = document.createElement('div');
        card.className='card';

        card.innerHTML=`
        <div class="card-inner">
        <div class="card-face card-back-face"><span class="q">?</span></div>
        <div class="card-face card-front-face">${e}</div>
        </div>
        `;

        card.onclick=()=>flipCard(card,e);
        grid.appendChild(card);
    });

    cards = document.querySelectorAll('.card');
}

function flipCard(card,emoji){
    if(flipped.length===0 && moves===0 && pairs===0) startTimer();
    if(flipped.length===2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flipped.push({card,emoji});

    if(flipped.length===2){
        moves++;
        movesEl.textContent=moves;
        if(flipped[0].emoji === flipped[1].emoji){
            flipped[0].card.classList.add('matched');
            flipped[1].card.classList.add('matched');
            pairs++;
            pairsEl.textContent = pairs;
            flipped=[];
            checkWin();
        }else{
            setTimeout(()=>{
                flipped.forEach(f=>f.card.classList.remove("flipped"));
                flipped=[];
            },700);
        }
    }
}

function startTimer(){
    clearInterval(interval);
    timer=0;
    interval=setInterval(()=>{
        timer++;
        timeEl.textContent=timer;
    },1000);
}

function checkWin(){
    if(pairs===emojis.length){
        clearInterval(interval);
        document.getElementById("win-overlay").classList.add("show");
        document.getElementById("win-moves").textContent=moves;
        document.getElementById("win-time").textContent=timer+"s";
    }
}

function restartGame(){
    moves=0;
    pairs=0;
    movesEl.textContent=0;
    pairsEl.textContent=0;
    timeEl.textContent=0;
    document.getElementById("win-overlay").classList.remove("show");
    startGame();
}

startGame();