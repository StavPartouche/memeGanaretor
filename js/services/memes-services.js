var gImgsId;
var gSavedCanvas;
var gSelectedImgId;


function init(){
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if(!gSavedMemes) gSavedMemes = [];

    gImgsId = 1

    gSavedCanvas = document.querySelector('#saved-canvas')
    gSavedCtx = gSavedCanvas.getContext('2d')
}

function deleteMeme(){
    gSavedMemes.splice((gSelectedImgId-1), 1)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

