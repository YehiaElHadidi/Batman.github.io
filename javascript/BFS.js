
async function BFS( i,j,shortestpath,string)
{
    let q = [{f : i, s : j}];
    shortestpath[i][j] = {i,j};
    while(q.length != 0){
        var node = q[0];
        
        q.shift();  
        for(let z = 0; z < 4; z++){
            var adjx = node.f + dRow[z];
            var adjy = node.s + dCol[z];
            
            if(isValidBFS(adjx,adjy,shortestpath)){
                shortestpath[adjx][adjy] = {f : node.f, s :node.s}
                if(adjx == second.i && adjy == second.j){
                    var start = {row : i, col : j};
                   getShortestPath(start,shortestpath);
                    return;
                }
                checked.push({f:adjx,s:adjy});
                checkBFS(adjx,adjy);
                q.push({f:adjx,s:adjy});
            }
        }
        await timer(TIME);

    }
    restBoard();
}

function getShortestPath(start,path){
    var node = {f: second.i, s: second.j};
    var shortestpath = [{}];
    while(node.f != start.row || node.s != start.col){
        var temp = path[node.f][node.s];
        shortestpath.push(temp);
        node = temp;
    }
    runBatmanBFS(shortestpath);
}

function isValidBFS(row,col,vis){
    if (row < 0 || col < 0
        || row >= ROW || col >= COL)
        return false;
 
    if (vis[row][col].f != -1)
        return false;

    var td = document.getElementById(row + "-" + col);
    if(td.className == "wall")
        return false;
    return true;
}