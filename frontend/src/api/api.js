import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/"
})



export const createTask = (taskData) => API.post("api/create_task", taskData)
export const getAllTasks = () => API.get("api/get_tasks")
