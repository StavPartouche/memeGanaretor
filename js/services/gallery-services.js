const gMemeFont = 'Impact'
const STORAGE_KEY = 'memesDB';

var gCanvas;
var gCtx;
var gSavedMemes;
var showOptions = false;
var gisMouseDown = false;
var gWordSize = []
var gMeme

function init() {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if (!gSavedMemes) gSavedMemes = [];

    randomWordSize()

    gCanvas = document.querySelector('#main-canvas')
    gCtx = gCanvas.getContext('2d')
}

function createMemeData(el){
    gMeme = {
        selectImgEl: el,
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 48,
                y: null,
                x: null
            }
        ]
    }
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
    gMeme.lines.forEach(line => {
        var fontSize = line.size
        var textHeight = line.y
        var textX = line.x
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = 'white'
        gCtx.lineWidth = '1'
        gCtx.font = `${calcSize(fontSize)}px  ${gMemeFont}`
        gCtx.textAlign = 'center'
        gCtx.fillText(line.txt, textX, textHeight)
        gCtx.strokeText(line.txt, textX, textHeight)
    })
}

function updateMemeTxt(txt) {
    var lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function selectImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function changeFontSize(num) {
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    if (num) fontSize += 2;
    else fontSize -= 2
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize
}

function changeLineLoc(num) {
    var textHeight = gMeme.lines[gMeme.selectedLineIdx].y
    if (num) textHeight -= 5;
    else textHeight += 5;
    gMeme.lines[gMeme.selectedLineIdx].y = textHeight
}

function addLine() {
    var newLine = {
        txt: '',
        size: 48,
        y: (gMeme.lines.length === 1) ? (gCanvas.height - 100) : (gCanvas.height / 2),
        x: gCanvas.width / 2
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    drawFocus()
}

function deleteLine() {
    var idx = gMeme.selectedLineIdx;
    gMeme.lines.splice(idx, 1)
    if (!gMeme.lines.length) {
        gMeme.lines = [
            {
                txt: '',
                size: calcSize(48),
                y: gCtx.canvas.height / 6,
                x: gCtx.canvas.width / 6
            }
        ]
    }
}

function moveLine(num) {
    if (num === 0) gMeme.lines[gMeme.selectedLineIdx].x = 60
    if (num === 1) gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width / 2
    if (num === 2) gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - 60
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
    var textHeight = gMeme.lines[gMeme.selectedLineIdx].y
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    gCtx.beginPath()
    gCtx.rect((20), textHeight - fontSize, (gCanvas.width - 40), fontSize + 10)
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 5
    gCtx.stroke()

}

function saveMeme() {
    var newMemeUrl = gCanvas.toDataURL()
    gSavedMemes.push(newMemeUrl)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}
function searchMeme(str) {
    if (str === '') return gImgs;

    var selectedMemes = [];
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
            if (word.includes(str)) {
                selectedMemes.push(img)
                return
            }
        })
    })
    return selectedMemes;
}

function enlargeWords(id) {
    gWordSize[id]++
}

function toggleShowOptions() {
    showOptions = !showOptions
    return showOptions
}

function selectLine(ev, num) {
    toggleMouseActive()
    var offsetY;

    if (num === 0) { offsetY = ev.offsetY }
    if (num === 1) { offsetY = ev.targetTouches[0].clientY }

    var clickedLineIndex = gMeme.lines.findIndex(line => {
        return offsetY > (line.y - line.size) && offsetY < line.y
    })

    gMeme.selectedLineIdx = clickedLineIndex
}

function toggleMouseActive() {
    gisMouseDown = !gisMouseDown
}

function dragText(ev, num) {
    if (num === 0) {
        var { movementX, movementY } = ev;
        gMeme.lines[gMeme.selectedLineIdx].x += movementX
        gMeme.lines[gMeme.selectedLineIdx].y += movementY
    }
    if (num === 1){
        var touchX = ev.targetTouches[0].clientX
        var touchY = ev.targetTouches[0].clientY
        gMeme.lines[gMeme.selectedLineIdx].x = touchX
        gMeme.lines[gMeme.selectedLineIdx].y = touchY
    }
}

function randomWordSize() {
    for (var i = 0; i < 7; i++) {
        gWordSize[i] = getRndInteger(1, 7)
        document.getElementById(`${i}`).style.fontSize = `${1.3 + (gWordSize[i] / 10)}rem`
    }
}

function calcSize(num) {
    if (window.innerWidth < 850 && gMeme.selectImgEl) {
        var elEditor = document.querySelector('.editor')
        return num / (gMeme.selectImgEl.naturalWidth / elEditor.offsetWidth)
    } else {
        return num
    }
}