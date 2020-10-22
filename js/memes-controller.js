function onInit(){
    init();
    renderMemes()
}

function renderMemes(){
    var strHtml = ''
    gSavedMemes.forEach(memeUrl => {
        strHtml += `<img id="${gImgsId}" src="${memeUrl}" onclick="onSelectSavedImg(this)" alt="">`
        gImgsId++;
        
    });
    var elSavedMemes = document.querySelector('.saved-memes');
    elSavedMemes.innerHTML = strHtml;
}

function onSelectSavedImg(el){
    var elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('hide')
    elEditorContainer.classList.add('flex')

    gSavedCtx.canvas.width = el.naturalWidth
    gSavedCtx.canvas.height = el.naturalHeight

    gSelectedImgId = el.id

    renderSavedCanvas(el.src)
}

function renderSavedCanvas(imgSrc){
    var img = new Image()
    img.src = `${imgSrc}`;
    img.onload = () => {
        gSavedCtx.drawImage(img, 0, 0, gSavedCanvas.width, gSavedCanvas.height)
    }
}

function onDeleteMeme(){
    console.log('click');
    deleteMeme();
    var elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('flex')
    elEditorContainer.classList.add('hide')
    onInit();
}