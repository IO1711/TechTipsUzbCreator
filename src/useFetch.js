import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useFetch(baseUrl){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const get = (url, authToken) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url,{
                method : "GET",
                headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${authToken}`
            }})
            .then(response => {
                if(response.status === 401) {navigate("/login"); return;}
                return response.json();
            })
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


    const post = (url, body, authToken) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : `Bearer ${authToken}`
                    },
                    body : JSON.stringify(body)
                }
            })
            .then(response => {
                if(response.status === 401) {navigate("/login"); return;}
                return response.json()
            })
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

    const postString = (url, body, authToken) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : `Bearer ${authToken}`
                    },
                    body : JSON.stringify(body)
                }
            })
            .then(response => {
                if(response.status === 401) {navigate("/login"); return;}
                return response.text()
            })
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

    const postAuth = (url, body) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json",
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

    const postImage = (url, body, authToken) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "POST",
                    headers: {
                        "Authorization" : `Bearer ${authToken}`
                    },
                    body : body
                }
            })
            .then(response => {
                if(response.status === 401) {navigate("/login"); return;}
                return response.text()
            })
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

    const deleteRequest = (url, body, authToken) => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                method : "DELETE",
                headers : {
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${authToken}`
                },
                body : JSON.stringify(body)
            })
            .then(response => {
                if(response.status === 401) {navigate("/login"); return;}
                return response.text()
            })
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

    const putString = (url, body, authToken) => {
        setLoading(true);
        return new Promise((resolve, reject) => {
            fetch(baseUrl+url, {
                ...{
                    method : "PUT",
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : `Bearer ${authToken}`
                    },
                    body : JSON.stringify(body)
                }
            })
            .then(response => {
                if(response.status === 401) {navigate("/login"); return;}
                return response.text();
            })
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

    return {get, post, postImage, postString, postAuth, putString, deleteRequest, loading};
}