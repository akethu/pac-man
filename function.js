var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1], 
	[1,2,2,2,2,2,1,2,2,2,2,2,1], 
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

var score = 0;

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
            if(map[pacloc.y][pacloc.x-1] == 2)
                score = score + 1;
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
            map[pacloc.y][pacloc.x] = 3;
            pacloc.x++;
            map[pacloc.y][pacloc.x] = 5;
        }
    }
    else if(k.code == "ArrowUp"){
        // right
        if(map[pacloc.y-1][pacloc.x] != 1){
            if(map[pacloc.y-1][pacloc.x] == 2) {
                score = score + 1;
            }
            map[pacloc.y][pacloc.x] = 3;
            pacloc.y--;
            map[pacloc.y][pacloc.x] = 5;
        }
    }
    else if(k.code == "ArrowDown"){
        // right
        if(map[pacloc.y+1][pacloc.x] != 1){
            if(map[pacloc.y+1][pacloc.x] == 2) {
                score = score + 1;
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

function timeStart() {
    if(score >= 1){
        window.location.reload();
        score = 0;
    }
    if(document.getElementById('timetext').textContent != 'Timer started! Collect all coins as fast as possible!') {
        document.getElementById('timetext').innerHTML += 'Timer started! Collect all coins as fast as possible!';
    }
    document.getElementById('timetext2').style.border = "solid white";
    document.getElementById('timetext').style.border = "solid white";
    setTimeout("disappear()", 7000);
    document.body.classList.add("stop-scrolling"); 
    timez = setInterval("startTimer()", 1000);
}

function disappear() {
    document.getElementById('timetext').style.display = "none";
}

function timeup() {
    document.body.classList.remove("stop-scrolling"); 
    if(count == 0 && num == 0) {
        alert("Click on 'Reset' and then on 'Start' to start the timer!");
    }
    else if(num != 0) {
        document.getElementById('timetext2').style.width = "600px";
        document.getElementById('timetext2').innerHTML = "Click on 'Reset' and then on 'Start' to play again!";
    }
    else {
        num++;
        clearInterval(timez);
        alert('Your final score: ' + count + ' seconds!');
    } 
}

function endGame() {
    document.getElementById('timetext2').innerHTML = 'Score: ' + score;
    if(score == 54) {
        timeup();
    }
}

function startTimer() {
    count = count + 1;
    document.getElementById('scoreBoard').innerHTML = 'Time elapsed: ' + count + (count>1  ? ' seconds' : ' second');
}
