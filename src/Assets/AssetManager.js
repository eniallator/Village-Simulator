import villagerStill from '../../assets/images/villager/still.png'

const initializeImage = imgPath =>
    new Promise((resolve, reject) => {
        const img = new Image()
        img.src = imgPath
        img.onload = resolve
        img.onerror = reject
    })

class AssetManager {
    constructor() {
        this.imagesToLoad = [villagerStill]
    }

    onLoad() {
        return Promise.all(this.imagesToLoad.map(initializeImage))
    }
}

export default AssetManager
