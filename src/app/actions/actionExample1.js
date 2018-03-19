export function action(arg) {
    return dispatch => {
        dispatch({
            type: "Type",
            payload: arg
        })
    }
}