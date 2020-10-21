function init(){
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if(!gSavedMemes) gSavedMemes = [];
}