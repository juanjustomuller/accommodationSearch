import apiRequest from "./apiRequest";
import { defer } from 'react-router-dom';

export const singlePageLoader = async ({request, params}) => {
    //necesita el id para hacer una request, dicho id esta en params
    console.log("ID del parámetro:", params.id);
    const res = await apiRequest("/posts/"+params.id)
    return res.data;
}

export const listPageLoader = async ({request, params}) => {
    //necesita el id para hacer una request, dicho id esta en params
    const query = request.url.split("?")[1]
    console.log(query)
    const postPromise = apiRequest("/posts?" + query)
    //return res.data;
    //esto es para que cargue mas rapido la pagina
    return defer({
        postResponse: postPromise
    })
}   

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts")
    const chatPromise = apiRequest("/chats")
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise
    })
}   