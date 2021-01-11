var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1], 
	[1,2,2,2,2,2,1,2,2,2,2,4,1], 
	[1,2,1,1,1,2,1,2,1,1,1,2,1], 
    [1,2,1,2,2,2,2,2,2,2,1,2,1], 
    [1,2,2,2,1,1,5,1,1,2,2,2,1], 
	[1,2,1,2,2,2,2,2,2,2,1,2,1], 
	[1,2,1,1,2,2,1,2,2,1,1,2,1], 
	[1,2,2,2,2,2,1,2,2,2,2,2,1], 
	[1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var pacloc = {
    x: 6,
    y: 4
}

var ghostloc = {
    x: 11,
    y: 1
}

var score = 0;
var remainder = 0;

function draw() {
    document.getElementById('pacWorld').innerHTML = "";
    for(var y = 0; y < map.length; y = y + 1) {
        for(var x = 0; x < map[y].length; x = x + 1) {
            if(map[y][x] == 1)
                document.getElementById('pacWorld').innerHTML += '<div class="wall"></div>';
            else if(map[y][x] == 2) 
                document.getElementById('pacWorld').innerHTML += '<div><img id="coinlogo" src="images/coin.png" alt=""></div>';
            else if(map[y][x] == 3) 
                document.getElementById('pacWorld').innerHTML += '<div class="floor"></div>';
            else if(map[y][x] == 5)
                document.getElementById('pacWorld').innerHTML += '<div class="pac-man"></div>';
            else if(map[y][x] == 4) {
                document.getElementById('pacWorld').innerHTML += '<div class="ghost"></div>';
            }
        }
        document.getElementById('pacWorld').innerHTML += "<br>";
    }
}

draw();

document.onkeydown = function(k) {
    console.log(k);
    if(k.code == "ArrowLeft"){
        // left
        if(map[pacloc.y][pacloc.x-1] != 1){
            if(map[pacloc.y][pacloc.x-1] == 2) {
                score = score + 1;
            }
            if(map[pacloc.y][pacloc.x-1] == 4) {
                alert('Uh-oh! Game over.');
                timeup();
            }
            map[pacloc.y][pacloc.x] = 3;
            pacloc.x--;
            map[pacloc.y][pacloc.x] = 5;
        }
    }
    else if(k.code == "ArrowRight"){
        // right
        if(map[pacloc.y][pacloc.x+1] != 1){
            if(map[pacloc.y][pacloc.x+1] == 2) {
                score = score + 1;
            }
            if(map[pacloc.y][pacloc.x+1] == 4) {
                alert('Uh-oh! Game over.');
                timeup();
            }
            map[pacloc.y][pacloc.x] = 3;
            pacloc.x++;
            map[pacloc.y][pacloc.x] = 5;
        }
    }
    else if(k.code == "ArrowUp"){
        // up
        if(map[pacloc.y-1][pacloc.x] != 1){
            if(map[pacloc.y-1][pacloc.x] == 2) {
                score = score + 1;
            }
            if(map[pacloc.y-1][pacloc.x] == 4) {
                alert('Uh-oh! Game over.');
                timeup();
            }
            map[pacloc.y][pacloc.x] = 3;
            pacloc.y--;
            map[pacloc.y][pacloc.x] = 5;
        }
    }
    else if(k.code == "ArrowDown"){
        // down
        if(map[pacloc.y+1][pacloc.x] != 1){
            if(map[pacloc.y+1][pacloc.x] == 2) {
                score = score + 1;
            }
            if(map[pacloc.y+1][pacloc.x] == 4) {
                alert('Uh-oh! Game over.');
                timeup();
            }
            map[pacloc.y][pacloc.x] = 3;
            pacloc.y++;
            map[pacloc.y][pacloc.x] = 5;
        }
    }
    draw();
    endGame();
}

var count = 0;
var timez = 0;
var num = 0;
var ghostTimez = 0;
var difficulty = 1000;
var temp = Math.floor(Math.random()*4);
var guide = [[1,1], [1,7], [11,1], [11,7]];

function timeStart() {
    if(score >= 1){
        window.location.reload();
        score = 0;
        remainder = 0;
    }
    if(document.getElementById('timetext').textContent != 'Timer started! Collect all coins as fast as possible!') {
        document.getElementById('timetext').innerHTML += 'Timer started! Collect all coins as fast as possible!';
    }
    map[ghostloc.y][ghostloc.x] = 2; 
    ghostloc = {
        x: guide[temp][0],
        y: guide[temp][1]
    };
    map[ghostloc.y][ghostloc.x] = 4; 
    document.getElementById('scoreBoard').style.visibility = "visible";
    document.getElementById('timetext2').style.border = "solid white";
    document.getElementById('timetext').style.border = "solid white";
    setTimeout("disappear()", 7000);
    timez = setInterval("startTimer()", 1000);
    document.body.classList.add("stop-scrolling"); 
    ghostMoveHelper();
}

function disappear() {
    document.getElementById('timetext').style.display = "none";
}

function timeup() {
    document.body.classList.remove("stop-scrolling"); 
    if(count == 0 && num == 0) {
        setTimeout(function(){alert("Click on 'Reset' and then on 'Start' to start the timer!");}, 100); 
    }
    else if(num != 0) {
        document.getElementById('timetext2').style.width = "600px";
        document.getElementById('timetext2').innerHTML = "Click on 'Reset' and then on 'Start' to play again!";
    }
    else {
        num++;
        clearInterval(timez);
        clearInterval(ghostTimez);
        setTimeout(function(){alert('Your final score: ' + score + ' coins!');}, 100); 
    } 
}

function endGame() {
    document.getElementById('timetext2').innerHTML = 'Score: ' + score;
    if((score + remainder) == 53) {
        timeup();
    }
}

function startTimer() {
    count = count + 1;
    document.getElementById('scoreBoard').innerHTML = 'Time elapsed: ' + count + (count>1  ? ' seconds' : ' second');
}

function promode() {
    difficulty = 250;
}

function ghostMoveHelper() {
    ghostTimez = setInterval("ghostMove()", difficulty);
}

function ghostMove() {
    console.log(temp);
    if(temp === 0) {
        if(map[ghostloc.y][ghostloc.x-1] === 5) {
            alert('Uh-oh! Game over.');
            timeup();
        }
        else if(map[ghostloc.y][ghostloc.x-1] === 1) {
            temp = Math.floor(Math.random()*4);
        }
        else {
            if(map[ghostloc.y][ghostloc.x-1] == 2)
                remainder = remainder + 1;
            map[ghostloc.y][ghostloc.x] = 3;
            ghostloc.x--;
            map[ghostloc.y][ghostloc.x] = 4;
        }
    }
    else if(temp === 1) {
        if(map[ghostloc.y][ghostloc.x+1] == 5) {
            alert('Uh-oh! Game over.');
            timeup();
        }
        else if(map[ghostloc.y][ghostloc.x+1] === 1){
            temp = Math.floor(Math.random()*4);
        }
        else {
            if(map[ghostloc.y][ghostloc.x+1] == 2)
                remainder = remainder + 1;
            map[ghostloc.y][ghostloc.x] = 3;
            ghostloc.x++;
            map[ghostloc.y][ghostloc.x] = 4;
        }
    }
    else if(temp === 2) {
        if(map[ghostloc.y-1][ghostloc.x] == 5) {
            alert('Uh-oh! Game over.');
            timeup();
        }
        else if(map[ghostloc.y-1][ghostloc.x] === 1){
            temp = Math.floor(Math.random()*4);
        }
        else {
            if(map[ghostloc.y-1][ghostloc.x] == 2)
                remainder = remainder + 1;
            map[ghostloc.y][ghostloc.x] = 3;
            ghostloc.y--;
            map[ghostloc.y][ghostloc.x] = 4;
        }
    }
    else if(temp === 3) {
        if(map[ghostloc.y+1][ghostloc.x] == 5) {
            alert('Uh-oh! Game over.');
            timeup();
        }
        else if(map[ghostloc.y+1][ghostloc.x] === 1){
            temp = Math.floor(Math.random()*4);
        }
        else {
            if(map[ghostloc.y+1][ghostloc.x] == 2)
                remainder = remainder + 1;
            map[ghostloc.y][ghostloc.x] = 3;
            ghostloc.y++;
            map[ghostloc.y][ghostloc.x] = 4;
        }
    }
    draw();
}
