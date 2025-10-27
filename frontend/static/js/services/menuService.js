import { apiUrl } from "../utils/config.js";
import fetchData from "../utils/fetchData.js";

export function getAllMenu(){
    return fetchData(apiUrl("menu"))
}

export function getMenuById(id){
    return fetchData(apiUrl(`menu/${id}`))
};