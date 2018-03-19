const reducer = (state , action) => {
    console.log(state);
    switch (action.type) {
        case "Action1":
            console.log("Action1");
            state = {
                ...state,
                username: action.payload
            };
            break;
        case "Login":
            state = action.payload;
            break;
        case "courses":
            state={
                ...state,
                courses: action.payload
            };
            break;
    }
    console.log("UserReducer has ran ", action.type);
    console.log(state);
    return state;
};
export default reducer

