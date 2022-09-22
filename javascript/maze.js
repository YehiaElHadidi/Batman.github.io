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