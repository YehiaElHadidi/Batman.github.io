var visMaze;
var DCmaze = [{i :-1,j : 0},{i : 0,j : 1},{i : 1, j : 0},{i : 0,j : -1}];
var mazepath = [];
async function generateMaze(){
    clearBoard();
    mazepath = [];
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            document.getElementById(i + "-" + j).className = "wall";
        }
    }
    visMaze = Array.from(Array(ROW), ()=> Array(COL).fill(false));
    nextPermutation(DCmaze);
    document.getElementById("start").parentNode.className = "unvisited";
    document.getElementById("end").parentNode.className = "unvisited";
    
    DFSMaze(Math.floor(Math.random()* ROW) , Math.floor(Math.random()* COL));
    await timer(100);

    firsthalfmaze();
    secondhalfmaze();
    
    await timer((mazepath.length/2)*30);
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            if(document.getElementById(i + "-" + j).className == "mazeGen")
                document.getElementById(i + "-" + j).className = "unvisited";
        }
    }
    
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

function DFSMaze(i, j){
    if(!isValidDFSMaze(i,j)){
        return;
    }
    var cnt = 0;
    
    
    for (var z = 0; z < 4; z++) {
        var adjx = i + DCmaze[z].i;
        var adjy = j + DCmaze[z].j;
        if(!outofbound(adjx,adjy))
            continue;

        if(!mazevalid(adjx,adjy)){
            cnt++;
        }
    }
    if(cnt > 1)
        return;
    visMaze[i][j] = true;    
    var x = Math.floor(Math.random()* COL);
    mazepath.push({i,j});

    for (var z = x; z < x+4; z++) {
        
        var adjx = i + DCmaze[z%4].i;
        var adjy = j + DCmaze[z%4].j;
        
        DFSMaze(adjx,adjy);
    }    

}


function mazevalid(row,col){
    if (visMaze[row][col])
        return false;
 
    return true;
}

function outofbound(row,col){
    if (row < 0 || col < 0
        || row >= ROW || col >= COL)
        return false;
    return true;
}

function isValidDFSMaze(row, col)
{
    if(!outofbound(row,col))
        return false;
 
    if (visMaze[row][col])
        return false;
 
    return true;
}

var nextPermutation = function(N) {
    const swap = (i, j) =>
        [N[i],N[j]] = [N[j],N[i]]

    let len = N.length - 1, i
    for (i = len - 1; N[i] >= N[i+1];) i--
    let j = i + 1, k = len
    while (j < k) swap(j++,k--)
    if (i >= 0) {
        for (j = i + 1; N[i] >= N[j];) j++
        swap(i,j)
    }
};

// SAD TRIES TO MAKE RANDOM MAZE
/*

function generateMaze1(){
    clearBoard();
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            document.getElementById(i + "-" + j).className = "wall";
        }
    }

    path = [];
    document.getElementById("start").parentNode.className = "randomPoint";
    path[0] = getID(document.getElementById("start"));
    
    document.getElementById("end").parentNode.className = "randomPoint"; 
    path[1] = getID(document.getElementById("end"));

    for(let z = 2; z < 10; z++){
        let i = Math.floor(Math.random()* ROW);
        let j = Math.floor(Math.random()* COL);
        path[z] = {i,j};
        document.getElementById(i + "-" + j).className = "randomPoint";
               
    }
    for(let k = 0; k < 10; k++){
        var shortestpath = Array.from(Array(ROW), ()=> Array(COL).fill({i:-1,j:-1}));
        bfsMaze(path[k].i,path[k].j,shortestpath);
        console.log(shortestpath);
        for(let z = 0; z < 10; z++){
            getShortestPathMaze(path[z],shortestpath);
            
        }
    }
    for(let z = 0; z < 10; z++){
        document.getElementById(path[z].i + "-" + path[z].j).className = "unvisited";
    }
}
function bfsMaze(i,j,shortestpath){
    let q = [{i: i, j: j}];
    shortestpath[i][j] = {i: i, j: j};
    while(q.length != 0){
        var node = q[0];
        q.shift();  
        for(let z = 0; z < 4; z++){
            var adjx = node.i + dRow[z];
            var adjy = node.j + dCol[z];
    
            if(isValidBFSMaze(adjx,adjy,shortestpath)){
                shortestpath[adjx][adjy] = {i : node.i, j :node.j}
                console.log(1111);
                q.push({i:adjx,j:adjy});
            }
        }
    }
    console.log(shortestpath);

}

function getShortestPathMaze(node,path){
    console.log(node);
    
    node = path[node.i][node.j];
    console.log(node);
    console.log(document.getElementById(node.i + "-" + node.j).className);
    while(document.getElementById(node.i + "-" + node.j).className != "randomPoint"){
    console.log(document.getElementById(node.i + "-" + node.j).className);
        var temp = path[node.i][node.j];
        document.getElementById(node.i + "-" + node.j).className = "unvisited";
        node = temp;
    }
}


function isValidBFSMaze(row,col,vis){
    

    if (row < 0 || col < 0
        || row >= ROW || col >= COL)
        return false;
 
    if (vis[row][col].i != -1)
        return false;
        console.log(1111);

    return true;
}

/*
function maze2(){
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            var td = document.getElementById(i+"-"+j);
            td.className = "wall";
        }
    }
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            if(i % 3 == 1 || j % 4 == 0){
                var td = document.getElementById(i+"-"+j);
                td.className = "unvisited";
            }
        }
    }
}
async function maze1(){
    clearBoard();
    for(let i = 0; i < ROW; i++){
        for(let j = 0; j < COL; j++){
            if((j % 2 == 0 && i % 2 == 1) || (i % 3 == 0 && j % 3 == 0) || (i % 4 == 1 && j % 4 == 1)){
                var td = document.getElementById(i+"-"+j);
                td.className = "wall";
            }
        }
    }
}
*/