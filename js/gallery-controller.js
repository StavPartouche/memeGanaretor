function onInit() {
    init();
    renderGallery(gImgs)
}

function renderCanvas() {
    var imgID = gMeme.selectedImgId
    drawImg(imgID)
}

function renderGallery(imgs) {
    var strHtml = '';
    imgs.forEach(img => {
        strHtml += `<img onclick="onSelectImg(this)" src=${img.url} alt="" id="${img.id}">`
    })
    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtml
}

function onUpdateMemeTxt(value) {
    updateMemeTxt(value);
    renderCanvas()
}

function onSelectImg(el) {
    var elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('hide')
    elEditorContainer.classList.add('flex')
    selectImg(el.id)
    renderCanvas()
}

function onChangeFontSize(num) {
    changeFontSize(num)
    renderCanvas()
}

function onChangeLineLoc(num) {
    changeLineLoc(num)
    renderCanvas()
}

function onChangeLineFocus() {
    changeLineFocus();
    renderCanvas()
}

function onAddLineClick() {
    addLine();
    renderCanvas()
}

function onDeleteLineClick() {
    deleteLine()
    renderCanvas()
}

function onDownloadClick(elLink) {
    var img = new Image()
    img.src = `img/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
        downloadCanvas(elLink)
    }
}

function onSaveClick() {
    var img = new Image()
    img.src = `img/${gMeme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText()
        saveMeme();
    }
}

function onSearchMeme(str) {
    var searchedImgs = searchMeme(str);
    console.log(searchedImgs);
    renderGallery(searchedImgs)
}

function showAllOptions() {
    var toggle = toggleShowOptions()
    var elSearchOption = document.querySelectorAll('.search-option')
    var elButton = document.querySelector('.more-btn')
    elSearchOption.forEach(elOption => {
        if(toggle) {
            elOption.classList.remove('hide')
            elButton.innerText = 'Less'
        }
        else{
            elOption.classList.add('hide')
            elButton.innerText = 'More'
        }
    })


}


