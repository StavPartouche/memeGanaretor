const gMemeFont = 'Impact'

var gCanvas;
var gCtx;
var gFontSize = 48
var gTextHeight = 60

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 48,
            height: 60
        }
    ]
}

function init() {
    gCanvas = document.querySelector('#main-canvas')
    gCtx = gCanvas.getContext('2d')
}

function drawImg(id) {
    var img = new Image()
    img.src = `../img/${id}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
        drawFocus()
    }
}

function drawText(text) {
    gMeme.lines.forEach(line =>{
        var fontSize = line.size
    var textHeight = line.height
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = '1'
    gCtx.font = `${fontSize}px  ${gMemeFont}`
    gCtx.textAlign = 'center'
    gCtx.fillText(line.txt, 250, textHeight)
    gCtx.strokeText(line.txt, 250, textHeight)
    })
}

function updateMemeTxt(txt) {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function selectImg(imgID) {
    gMeme.selectedImgId = imgID;
}

function changeFontSize(num) {
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    if (num) fontSize += 2;
    else fontSize -= 2
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize
}

function changeLineLoc(num) {
    var textHeight = gMeme.lines[gMeme.selectedLineIdx].height
    if (num) textHeight -= 5;
    else textHeight += 5;
    gMeme.lines[gMeme.selectedLineIdx].height = textHeight
}

function addLine() {
    var newLine = {
        txt: '',
        size: 48,
        height: (gMeme.lines.length === 1) ? 450 : 225
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    drawFocus()
}

function changeLineFocus() {
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx += 1
    } else {
        gMeme.selectedLineIdx = 0;
    }
    drawFocus()
}


function drawFocus() {
    var textHeight = gMeme.lines[gMeme.selectedLineIdx].height
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
        gCtx.beginPath()
        gCtx.rect((20), (textHeight-fontSize), (gCanvas.width-40), (fontSize + 10))
        gCtx.strokeStyle = 'black'
        gCtx.stroke()
    
}