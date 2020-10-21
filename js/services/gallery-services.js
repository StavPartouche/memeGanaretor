const gMemeFont = 'Impact'

var gCanvas;
var gCtx;

var gImgs = [
    {id: 1, url: './img/1.jpg'},
    {id: 2, url: './img/2.jpg'},
    {id: 3, url: './img/3.jpg'},
    {id: 4, url: './img/4.jpg'},
    {id: 5, url: './img/5.jpg'},
    {id: 6, url: './img/6.jpg'},
    {id: 7, url: './img/7.jpg'},
    {id: 8, url: './img/8.jpg'},
    {id: 9, url: './img/9.jpg'},
    {id: 10, url: './img/10.jpg'},
    {id: 11, url: './img/11.jpg'},
    {id: 12, url: './img/12.jpg'},
    {id: 13, url: './img/13.jpg'},
    {id: 14, url: './img/14.jpg'},
    {id: 15, url: './img/15.jpg'},
    {id: 16, url: './img/16.jpg'},
    {id: 17, url: './img/17.jpg'},
    {id: 18, url: './img/18.jpg'},
]

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
    img.src = `img/${id}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
        drawFocus()
    }
}

function drawText() {
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
        height: (gMeme.lines.length === 1) ? 400 : 225
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