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

function onExitInput(elInput){
    elInput.value = '';
}

function onSelectImg(el) {
    var elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('hide')
    elEditorContainer.classList.add('flex')

    createMemeData(el)

    if((el.naturalWidth > 850 && el.naturalHeight > 850) || (el.naturalWidth < 300 && el.naturalHeight < 300)){
        gCtx.canvas.width = calcSize(500) 
        gCtx.canvas.height = calcSize(500) 
    }
    else{
        gCtx.canvas.width = calcSize(el.naturalWidth)
        gCtx.canvas.height = calcSize(el.naturalHeight) 
    }
    gMeme.lines[0].x = gCtx.canvas.width / 2
    gMeme.lines[0].y = gCtx.canvas.height / 6

    selectImg(el.id)
    renderCanvas()
    document.querySelector('#main-canvas').scrollIntoView()
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

function onMoveLine(num){
    moveLine(num)
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
    var elModal = document.querySelector('.saved-modal')
    elModal.classList.add('show-modal')
    setTimeout(() =>{
        elModal.classList.remove('show-modal')
    }, 3000)
}

function onSearchMeme(str, id = null) {
    if(id){
        enlargeWords(id)
        document.getElementById(`${id}`).style.fontSize = `${1.3 + (gWordSize[id]/10)}rem`
    }
    var searchedImgs = searchMeme(str);
    renderGallery(searchedImgs)
}

function showAllOptions() {
    toggleShowOptions()
    var elSearchOption = document.querySelectorAll('.search-option')
    var elButton = document.querySelector('.more-btn')
    elSearchOption.forEach(elOption => {
        if(gIsShowOptions) {
            elOption.classList.remove('hide')
            elButton.innerText = 'Less'
        }
        else{
            elOption.classList.add('hide')
            elButton.innerText = 'More'
        }
    })
}

function toggleMenu(){
    var elSideBarCont = document.querySelector('.side-bar-container')
    elSideBarCont.classList.toggle('show-side-bar')
    var elSideBar = document.querySelector('.side-bar')
    elSideBar.classList.toggle('show-side-bar')

}

function onSelectLine(ev ,num){
    ev.preventDefault()
    selectLine(ev, num);
    renderCanvas();
}

function onDrag(ev, num){
    if(gIsMouseDown){
        ev.preventDefault()
        dragText(ev, num)
        renderCanvas();
    }
}

function onResize(){
    if(!gMeme.selectImgEl) return
    var elEditor = document.querySelector('.editor')
    if(window.innerWidth < 850){
        gCtx.canvas.width = elEditor.offsetWidth
        gCtx.canvas.height = calcSize(gMeme.selectImgEl.naturalHeight )
    }else{
        gCtx.canvas.width = gMeme.selectImgEl.naturalWidth
        gCtx.canvas.height = gMeme.selectImgEl.naturalHeight
    }

    renderCanvas();
}



