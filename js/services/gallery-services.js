const gMemeFont = 'Impact'
const STORAGE_KEY = 'memesDB';

var gCanvas;
var gCtx;
var gSavedMemes;
var showOptions = false;



var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 48,
            y: 60,
            x: 225
        }
    ]
}

function init() {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if(!gSavedMemes) gSavedMemes = [];
    
    gCanvas = document.querySelector('#main-canvas')
    gCtx = gCanvas.getContext('2d')
    
    // creatImgsArr()
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
        gCtx.font = `${fontSize}px  ${gMemeFont}`
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
        y: (gMeme.lines.length === 1) ? 400 : 225,
        x: 250
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    drawFocus()
}

function deleteLine(){
    var idx = gMeme.selectedLineIdx;
    gMeme.lines.splice(idx, 1)
    console.log(gMeme.lines);
    if(!gMeme.lines.length){
        gMeme.lines = [
            {
                txt: '',
                size: 48,
                y: 60,
                x: 250
            }
        ]
    }
    console.log(gMeme.lines);
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
    gCtx.rect((20), (textHeight - fontSize), (gCanvas.width - 40), (fontSize + 10))
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

}

function saveMeme() {
    var newMemeUrl = gCanvas.toDataURL()
    gSavedMemes.push(newMemeUrl)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}
function searchMeme(str){
    if(str === '') return gImgs;
        
    var selectedMemes = [];
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
            if(word.includes(str)){
                selectedMemes.push(img)
                return
            }
        })
    })
    return selectedMemes;
}

function toggleShowOptions(){
    showOptions = !showOptions
    return showOptions
}

function creatImgsArr(){
    for(var i = 1 ; i < 19; i++){
        var newImg = {
            id: i,
            url: `./img/${i}.jpg`
        }
        gImgs.push(newImg)
    }
}