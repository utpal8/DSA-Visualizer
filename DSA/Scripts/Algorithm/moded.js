

function createleaves(nnodes) {

    $(document).scrollLeft(0)
    $(document).scrollTop(0)

let i = 0
for (; i < nnodes.length ; ++i) {


heapleaf( nnodes[i])

}


counttreenodes = i;

if (i > 30) {

    counttreenodes = 30;
}


}
