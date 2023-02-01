let board = document.getElementById("board");
console.log(window.innerHeight);
console.log(window.innerWidth);
ROW = Math.ceil(window.innerHeight/25) - 3;
COL = Math.ceil(window.innerWidth/25);
console.log(ROW);
console.log(COL);
let sr = (Math.floor(Math.random()* ROW));
let sc = (Math.floor(Math.random()* COL));

let er = (Math.floor(Math.random()* ROW));
let ec = (Math.floor(Math.random()* COL));
for(let i = 0; i < ROW; i++){
    const tr = board.insertRow();
    for(let j = 0; j < COL; j ++){
        const td = tr.insertCell();
        if(i == sr && j == sc){
            const div = document.createElement("div");
            div.className = "redips-drag start";
            div.id = "start";
            td.appendChild(div);
        }
        else if(i == er && j == ec){
            const div = document.createElement("div");
            div.className = "redips-drag end";
            div.id = "end";
            td.appendChild(div);
        }
        td.className = "unvisited";
        td.setAttribute("onmouseover","placeWall(this.id)") 
        td.setAttribute('id',i + "-" + j);
        tr.appendChild(td);
    }
    board.appendChild(tr);
}

function clearBoard(){
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            var td = document.getElementById(i + "-" + j).className = "unvisited";
        }
    }
}


const timer = ms => new Promise(res => setTimeout(res, ms))

async function checkDFS(DFSpath){
    for(let i = 1; i < checked.length; i++){
        var td = document.getElementById(checked[i].f + "-" +  checked[i].s).className = "check border";
        await timer(TIME); // then the created Promise can be awaited
    }
    runBatmanDFS(DFSpath);
}
async function runBatmanDFS(path){

    let i = 0;
    var idd = "";

    while(path[i] != '*'){
        idd += path[i];
        i++;
    }
    i++;
    var old = document.getElementById(idd);
    old.className = "shortestpath run";
    while(i < path.length){
        var id = "";
        while(path[i] != '*'){
            id += path[i];
            i++;
        }
        i++;
        var td = document.getElementById(id);
        td.className = "shortestpath run";
        old.className = "shortestpath border";
        old = td;
        await timer(TIME); // then the created Promise can be awaited
    }
    console.log(i);
    await timer(1000);
    restBoard();
}

async function restBoard(){            

    for(let i = 1; i < checked.length; i++){
        var td = document.getElementById(checked[i].f + "-" +  checked[i].s);
        td.className = "unvisited";
    }
}

var spacebarpressed = false;
document.body.onkeydown = function(e)
{
    if(e.key == " " ||
    e.code == "Space" ||      
    e.keyCode == 32 ){
        if(spacebarpressed)
            spacebarpressed = false;
        else 
            spacebarpressed = true ;
    }
}



function placeWall(id){
    if(spacebarpressed){
        var box = document.getElementById(id);
        if(box.className == "wall"){
            box.className = "unvisited"
        }
        else{
            box.className = "wall";
        }
    }
}

function checkBFS(i,j){
    var td = document.getElementById(i+"-"+j);
    td.className = "check border";
}

async function runBatmanBFS(arr){
    var old = document.getElementById(arr[arr.length-2].f + "-" + arr[arr.length-2].s);
    old.className = "shortestpath run";
    await timer(TIME);
    for(let i = arr.length-3; i > 0; i--){
        var td = document.getElementById(arr[i].f + "-" +  arr[i].s);

        td.className = "shortestpath run";
        old.className = "shortestpath border";
        old = td;
        await timer(TIME);
    }
     TT = arr.length-1; 
     await timer(1000);
     restBoard();  
}

async function buildMaze(){
    firsthalfmaze();
    secondhalfmaze();
}

async function firsthalfmaze(){
    for(let z = 0; z < mazepath.length/2; z++){
        document.getElementById(mazepath[z].i + "-" + mazepath[z].j).className = "mazeGen"
        await timer(20);
    }
}
/*for(let z = mazepath.length-1 ; z >= (mazepath.length/2*1); z--){
        document.getElementById(mazepath[z].i + "-" + mazepath[z].j).className = "mazeGen"
        await timer(20);
    }*/ 

async function secondhalfmaze(){
    
    for(let z = Math.ceil(mazepath.length/2) ; z < mazepath.length; z++){
        document.getElementById(mazepath[z].i + "-" + mazepath[z].j).className = "mazeGen"
        await timer(20);
    }
}

async function resetMazeTounvisted(){
    console.log("sssss");
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            if(document.getElementById(i + "-" + j).className == "mazeGen")
                document.getElementById(i + "-" + j).className = "unvisited";
        }
    }
}


