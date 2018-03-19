export const loadStorage = () => {
    try {
        const storage = localStorage.getItem("state");
        if (storage === null) {
            return undefined;
        }
        return JSON.parse(storage)
    }
    catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const storage = JSON.stringify(state);
        localStorage.setItem('state',storage)
    }
    catch (err){
        console.log(err)
    }
}