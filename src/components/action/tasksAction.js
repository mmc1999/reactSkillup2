import { TASKS_SUCCESS, TASKS_REQUEST, TASKS_FAILED } from "../../store/reducer/type"

const {REACT_APP_API_ENDPOINT} = process.env

export const tasksRequest = () => ({
    type: TASKS_REQUEST,
})
export const tasksSuccess = (data) => ({
    type: TASKS_SUCCESS,
    payload: data
})
export const tasksFailed = (error) => ({
    type: TASKS_FAILED,
    payload: error
})

export const getTasks = (path) => dispatch => {
    dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}task/${path}`,{
        headers: {'Content-Type': "application/json", Authorization: "Bearer "+localStorage.getItem("logged")}
    })
    .then(response => response.json())
    .then(data => dispatch(tasksSuccess(data.result)))
    .catch(error => dispatch(tasksFailed(error)))
}

export const deleteTask = (id) => dispatch => {
    //dispatch(tasksRequest())
    fetch(`${REACT_APP_API_ENDPOINT}task/${id}`,{
        method: "DELETE",
        headers: {'Content-Type': "application/json", Authorization: "Bearer "+localStorage.getItem("logged")}
    })
    .then(response => response.json())
    .then(() => dispatch(getTasks("")))
    .catch(error => dispatch(tasksFailed(error)))
}

export const editTaskStatus = (data) => dispatch => {
    const statusArray = ["NEW", "IN PROGRESS", "FINISHED"]
    
    const newStatusIndeX = 
        statusArray.indexOf(data.status) > 1 
            ? 0 
            : statusArray.indexOf(data.status) + 1

    fetch(`${REACT_APP_API_ENDPOINT}task/${data._id}`,{
        method: "PATCH",
        headers: {'Content-Type': "application/json", Authorization: "Bearer "+localStorage.getItem("logged")},
        body: JSON.stringify({
            "task": {
                "title":data.title,
                "importance": data.importance,
                "status": statusArray[newStatusIndeX],
                "description": data.description 
            }
        })
    
    })
    .then(response => response.json())
    .then(() => dispatch(getTasks("")))
    .catch(error => dispatch(tasksFailed(error)))
}