import { useState } from "react";

export default function useFetch(baseUrl){
    const [loading, setLoading] = useState(false);


    const get = (url) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url)
            .then(response => response.json())
            .then(data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(e => {
                setLoading(false);
                reject(e);
            });
        });
    }


    const post = (url, body) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(body)
                }
            })
            .then(response => response.json())
            .then(data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(e => {
                setLoading(false);
                reject(e);
            });
        })
    }

    const postString = (url, body) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(body)
                }
            })
            .then(response => response.text())
            .then(data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(e => {
                setLoading(false);
                reject(e);
            });
        })
    }

    const postImage = (url, body) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    body : body
                }
            })
            .then(response => response.text())
            .then(data => {
                if(!data){
                    setLoading(false);
                    return reject(data);
                }
                setLoading(false);
                resolve(data);
            })
            .catch(e => {
                setLoading(false);
                reject(e);
            });
        })
    }

    const deleteRequest = (url, body) => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                method : "DELETE",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(body)
            })
            .then(response => response.text())
            .then(data => {
                if(!data){
                    return reject(data);
                }
                resolve(data);
            })
            .catch(e => {
                reject(e);
            });
        });
    }

    return {get, post, postImage, postString, deleteRequest, loading};
}