const gMemeFont = 'Impact'

var gCanvas;
var gCtx;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
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
    gCtx.lineWidth = '2'
    gCtx.font = `48px ${gMemeFont}`
    gCtx.textAlign = 'start'
    gCtx.fillText(text, 80, 60)
    gCtx.strokeText(text, 0, 0)
}