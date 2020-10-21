function onInit(){
    init();
    renderMemes()
}

function renderMemes(){
    var strHtml = ''
    gSavedMemes.forEach(memeUrl => {
        strHtml += `<img src="${memeUrl}" alt="">`
    });
    var elSavedMemes = document.querySelector('.saved-memes');
    elSavedMemes.innerHTML = strHtml;
}