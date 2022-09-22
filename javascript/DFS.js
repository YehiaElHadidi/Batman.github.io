function DFS(i,j,vis,DFSpath){
    if(vis[second.i][second.j])
        return;
    var box = getBox(i,j);
    if(!isValidDFS(vis,i,j)){
        return;
    }
    if(i == second.i && j == second.j){
        vis[i][j] = true;
        checkDFS(DFSpath);
        
        return;
    }
    vis[i][j] = true;
    DFSpath += i + "-" + j + "*";
    checked.push(box);

    for (var z = 0; z < 4; z++) {
        var adjx = i + dRow[z];
        var adjy = j + dCol[z];
    
        DFS(adjx,adjy,vis,DFSpath);
    }
}

function isValidDFS(vis, row, col,td)
{
    if (row < 0 || col < 0
        || row >= ROW || col >= COL)
        return false;
 
    if (vis[row][col])
        return false;
    var td = document.getElementById(row + "-" + col);
    if(td.className == "wall")
        return false;
 
    // Otherwise
    return true;
}

function getBox(i,j){
    var box = {f : i, s :j};
    return box;
}
