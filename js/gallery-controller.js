function onInit(){
    init();
    renderCanvas();
}

function renderCanvas(){
    var imgID = gMeme.selectedImgId
    var imgTxt = gMeme.lines[0].txt
    drawImg(imgID, imgTxt)
}


