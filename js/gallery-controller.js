function onInit(){
    init();
    renderGallery()
}

function renderCanvas(){
    var imgID = gMeme.selectedImgId
    drawImg(imgID)
}

function renderGallery(){
    var strHtml = '';
    gImgs.forEach(img => {
        strHtml += `<img onclick="onSelectImg(this)" src=${img.url} alt="" id="${img.id}">`
    })
    var elGallery = document.querySelector('.gallery-container');
    elGallery.innerHTML = strHtml
}

function onUpdateMemeTxt(value){
    updateMemeTxt(value);
    renderCanvas()
}

function onSelectImg(el){
    var elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('hide')
    elEditorContainer.classList.add('flex')
    selectImg(el.id)
    renderCanvas()
}

function onChangeFontSize(num){
    changeFontSize(num)
    renderCanvas()
}

function onChangeLineLoc(num){
    changeLineLoc(num)
    renderCanvas()
}

function onChangeLineFocus(){
    changeLineFocus();
    renderCanvas()
}

function onAddLineClick(){
    addLine();
    renderCanvas()
}

