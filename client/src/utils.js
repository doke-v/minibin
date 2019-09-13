const saveToStorage = (key, value) => {
    localStorage.setItem(key, value);
    
}

const getFromStorage = (key) => {
    return localStorage.getItem(key);
}

export {saveToStorage, getFromStorage}