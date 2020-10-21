function onInit(){
    init();
}

function renderCanvas(){
    var imgID = gMeme.selectedImgId
    drawImg(imgID)
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

