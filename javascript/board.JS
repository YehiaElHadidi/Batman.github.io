
let board = document.getElementById("board");
for(let i = 0; i < window.screen.height-300; i = i + 25){
    const tr = board.insertRow();
    for(let j = 0; j < window.screen.width; j = j+25){
        const td = tr.insertCell();
        if(i == 100 && j == 400){
            const div = document.createElement("div");
            div.className = "redips-drag start";
            div.id = "start";
            td.appendChild(div);
        }
        else if(i == 400 && j == 1000){
            const div = document.createElement("div");
            div.className = "redips-drag end";
            div.id = "end";
            td.appendChild(div);
        }
        td.className = "unvisited";
        td.setAttribute("onmouseover","placeWall(this.id)") 
        td.setAttribute('id',(i/25) + "-" + (j/25));
        tr.appendChild(td);
    }
    board.appendChild(tr);
}

function clearBoard(){
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            var td = document.getElementById(i + "-" + j);
            td.className = "unvisited";
        }
    }
}


const timer = ms => new Promise(res => setTimeout(res, ms))

async function checkDFS(DFSpath){
    for(let i = 1; i < checked.length; i++){
        var td = document.getElementById(checked[i].f + "-" +  checked[i].s);
        td.className = "check border";
        await timer(TIME); // then the created Promise can be awaited
    }
    runBatmanDFS(DFSpath);
}
var TT = 0;var T = 0;
async function runBatmanDFS(path){
    T = 1;
    let i = 0;
    var idd = "";

    while(path[i] != '*'){
        idd += path[i];
        i++;
    }
    i++;
    TT++
    var old = document.getElementById(idd);
    old.className = "shortestpath run";
    while(i < path.length){
        var id = "";
        while(path[i] != '*'){
            id += path[i];
            i++;
        }
        i++;TT++;
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
    TT = 0; T = 0;
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


