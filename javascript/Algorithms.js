var second;
var ROW;
var COL;
var checked=[{
    f:1,
    S:2
}]
var dRow = [-1, 0, 1, 0 ];
var dCol = [0, 1, 0, -1 ];
async function choose(n){
    var start = document.getElementById("start");
    var first = getID(start);
    var end = document.getElementById("end");
    second = getID(end);
    var vis = Array.from(Array(ROW), ()=> Array(COL).fill(false));
    var shortestpath = Array.from(Array(ROW), ()=> Array(COL).fill({f:-1,s:-1}));
    checked =[{
        f:1,
        s:2
    }]
    var string = "";
    if(n == 1){
        DFS(first.i*1,first.j*1,vis, string);
        await timer(1000);
        if(!vis[second.i][second.j]){
            checkDFS();
            await timer(500);
            await timer(checked.length*(TIME+2));
            restBoard();
        }
    }
    if(n == 2){
        BFS(first.i*1,first.j*1,shortestpath);
    }
}

function getID(node){
    node = node.parentNode;
    let temp1 = node.id.substring(0,2);
    let temp2 = node.id.substring(node.id.length - 2);
    if(temp1[1] == '-'){
        temp1 = temp1.substring(0,1);
    }
    if(temp2[0] == '-'){
        temp2 = temp2.substring(temp2.length-1);
    }
    const ID = {i: temp1 * 1,j:temp2 * 1}
    return ID;
}
var TIME = 20;
function speed(time){
    TIME = time;
}


