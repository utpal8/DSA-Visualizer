



document.getElementById("cav1").remove();

skipbtn.style.display = "none";



let conwaygrid = document.getElementById("conwaygrid");

let CellularAutomata = [];
let FutureCA = [];

let cellrow = 70, cellcol = 130;

if (ismob) {
    cellcol = 85;
    cellrow = 130;
}


for (let i = 0; i < cellrow; i++) {

    CellularAutomata.push([])
    FutureCA.push([])

    conwaygrid.insertAdjacentHTML("beforeend", `<div id="cgr${i}" class="knuthtable"></div>`)


    for (let j = 0; j < cellcol; j++) {


        document.getElementById(`cgr${i}`).insertAdjacentHTML("beforeend", `<div id=cgc${i}-${j} class="conwaycells" style="background-color: #8ab6d6;"><p style="display:none;">${i}</p><p style="display:none;">${j}</p></div>`)


        CellularAutomata[i][j] = 0;
        FutureCA[i][j] = 0;



        document.getElementById(`cgc${i}-${j}`).onclick = function () {


            let children = document.getElementById(`cgc${i}-${j}`).children

            let rowc = children[0].innerHTML
            let colc = children[1].innerHTML


            if (CellularAutomata[rowc][colc] == 0) {

                document.getElementById(`cgc${rowc}-${colc}`).style.backgroundColor = "black";

                CellularAutomata[rowc][colc] = 1;
            }

            else if (CellularAutomata[rowc][colc] == 1) {

                document.getElementById(`cgc${rowc}-${colc}`).style.backgroundColor = "#8ab6d6";
                CellularAutomata[rowc][colc] = 0;

            }






        }

        document.getElementById(`cgc${i}-${j}`).onmouseenter = function(e) {

               if (!e.ctrlKey) {
                    return;
               }

               document.getElementById(`cgc${i}-${j}`).style.backgroundColor = "black";

               CellularAutomata[i][j] =1;





        }





    }



}



function countAliveNeighbor(m, n) {


    let neg = 0;

    for (let i = m - 1; i <= m + 1; i++) {


        for (let j = n - 1; j <= n + 1; j++) {

            neg += CellularAutomata[i][j];


        }

    }


    return neg - CellularAutomata[m][n];

}


function Generation() {


    for (let i = 1; i < cellrow - 1; i++) {


        for (let j = 1; j < cellcol - 1; j++) {


            let aliveadjacent = countAliveNeighbor(i, j);


            // rule for alive cells
            if (CellularAutomata[i][j] == 1 && aliveadjacent < 2) {

                FutureCA[i][j] = 0;

            }

            else if ((CellularAutomata[i][j] == 1) && (aliveadjacent > 3)) {
                FutureCA[i][j] = 0;
            }



            else if ((CellularAutomata[i][j] == 1) && (aliveadjacent == 2 || aliveadjacent == 3)) {
                FutureCA[i][j] = 1;
            }


            // rule for dead cells
            else if (CellularAutomata[i][j] == 0 && (aliveadjacent == 3)) {

                FutureCA[i][j] = 1;

            }



            if (FutureCA[i][j] == 1) document.getElementById(`cgc${i}-${j}`).style.backgroundColor = "black";

            else if (FutureCA[i][j] == 0) document.getElementById(`cgc${i}-${j}`).style.backgroundColor = "#8ab6d6";





        }


    }


    for (let i = 0; i < cellrow; i++) {


        for (let j = 0; j < cellcol; j++) {

            CellularAutomata[i][j] = FutureCA[i][j];
            FutureCA[i][j] = 0;



        }



    }


}


var stopper = 0;

async function startgeneration() {


    for (; ;) {

        Generation();


        await waitforme(speed);

        if (stopper == 1) {
            stopper = 0;
            break;
        };


    }



}


document.getElementById("play-btn2").onclick = function () {

    document.getElementById("play-btn2").style.display = "none";
    document.getElementById("pause-btn2").style.display = "";


    startgeneration();

}

document.getElementById("pause-btn2").onclick = function () {

    document.getElementById("play-btn2").style.display = "";
    document.getElementById("pause-btn2").style.display = "none";

    stopper = 1;

};
