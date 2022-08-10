const storeItem = (key,data) =>{
    localStorage.setItem(key,JSON.stringify(data))
}

const removeStoreItem = (key) =>{
    localStorage.removeItem(key)
}

export { storeItem,removeStoreItem}
