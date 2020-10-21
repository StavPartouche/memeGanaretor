const gMemeFont = 'Impact'

var gCanvas;
var gCtx;

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
        }
    ]
}   

function init(){
    gCanvas = document.querySelector('#main-canvas')
    gCtx = gCanvas.getContext('2d')
}

function drawImg(id,txt) {
    var img = new Image()
    img.src = `../img/${id}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText(txt)
    }
}

function drawText(text) {
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '1'
    gCtx.font = `48px ${gMemeFont}`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, 250, 60)
    gCtx.strokeText(text, 250, 60)
}

function updateMemeTxt(txt){
    gMeme.lines[0].txt = txt
    console.log(gMeme.lines[0].txt);
}

function selectImg(imgID){
    gMeme.selectedImgId = imgID;
}