var config = require('./config')
const fetch = require('node-fetch');    // issues http requests with same syntax as js fetch api
const qs = require('qs');       // url-encodes and stringifies the parameters

let xsuaa_access_token;
let em_access_token;
let notif_id;

function getAuthTokenXSUAA(){
    return new Promise((resolve, reject) => {
        var req_url = config.token_url
        var req_headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        console.log('REQUEST URL: POST', req_url)
        console.log('REQUEST HEADERS:', req_headers)
        // console.log('REQUEST BODY:', config.xsuaa)
        fetch( req_url, {
            method: 'POST',
            body: qs.stringify(config.xsuaa),
            headers: req_headers
        })
        .then(response => {
            console.log('RESPONSE STATUS:', response.status)
            return response.json()
        })
         .then(json => {
            //  console.log('RESPONSE BODY:',json)
             if(json.access_token){
                 xsuaa_access_token = json.access_token
             }
             resolve(json)
         })
        .catch(err => {
            resolve(err)
        })
    })
}

function getAuthTokenEM(){
    return new Promise((resolve, reject) => {
        var req_url = config.token_url
        var req_headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        console.log('REQUEST URL: POST',req_url)
        console.log('REQUEST HEADERS:', req_headers)
        // console.log('REQUEST BODY:',config.enterprise_messaging)
        fetch( req_url, {
            method: 'POST',
            body: qs.stringify(config.enterprise_messaging),
            headers: req_headers
        })
        .then(response => {
            console.log('RESPONSE STATUS:', response.status)
            return response.json()
        })
        .then(json => {
            // console.log('RESPONSE BODY:',json)
            if(json.access_token){
                em_access_token = json.access_token
            }
            resolve(json)
        })
        .catch(err => {
            resolve(err)
        })
    })
}

function getProjects(){
    return new Promise((resolve, reject) => {
        var req_url = config.service_domain+'/admin/Project'
        var req_headers = {
            'Authorization':'Bearer '+ xsuaa_access_token
        }
        console.log('REQUEST URL: GET', req_url)
        // console.log('REQUEST HEADERS:', req_headers)
        fetch( req_url, {
            method: 'GET',
            headers: req_headers
        })
        .then(response => {
            console.log('RESPONSE STATUS:', response.status)
            return response.json()
        })
        .then(json => {
            console.log('RESPONSE BODY:',json)
            resolve(json)
        })
        .catch(err => {
            resolve(err)
        })
    })
}

function sendNotification(){
    return new Promise((resolve, reject) => {
        var req_url = config.em_queue_url
        var req_headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+em_access_token,
            'x-qos': '1'
        }
        var req_body = {"message":"Resigned","employeeId":"106020","managerId":config.xsuaa.username}
        console.log('REQUEST URL: POST', req_url)
        // console.log('REQUEST HEADERS:', req_headers)
        console.log('REQUEST BODY:', req_body)
        fetch( req_url, {
            method: 'POST',
            headers: req_headers,
            body: JSON.stringify(req_body)
        })
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            resolve(err)
        })
    })
}

function getNotification(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             var req_url = config.service_domain+"/admin/Notifications?$count=true&$select=HasActiveEntity,HasDraftEntity,ID,IsActiveEntity,createdAt,employeeId&$expand=DraftAdministrativeData($select=DraftUUID,InProcessByUser,LastChangedByUser)&$filter=IsActiveEntity%20eq%20false%20or%20SiblingEntity/IsActiveEntity%20eq%20null&$skip=0&$top=30"
            var req_headers = {
                'Authorization':'Bearer '+ xsuaa_access_token
            }
            console.log('REQUEST URL: GET', req_url)
            // console.log('REQUEST HEADERS:', req_headers)
            fetch( req_url, {
                method: 'GET',
                headers: req_headers
            })
            .then(response => {
                console.log('RESPONSE STATUS:', response.status)
                return response.json()
            })
            .then(json => {
                console.log('RESPONSE BODY:',json)
                if(json.value && json.value.length){
                    notif_id = json.value[0].ID
                }
                resolve(json)
            })
            .catch(err => {
                resolve(err)
            })
        }, 2000)
    })
}

function deleteNotification(){
    return new Promise((resolve, reject) => {
        var req_url = config.service_domain+"/admin/Notifications(ID="+notif_id+",IsActiveEntity=true)"
        var req_headers = {
            'Authorization':'Bearer '+ xsuaa_access_token
        }
        console.log('REQUEST URL: DELETE', req_url)
        // console.log('REQUEST HEADERS:', req_headers)
        fetch( req_url, {
            method: 'DELETE',
            headers: req_headers
        })
        .then(response => {
            resolve(response)
        })
        .catch(err => {
            resolve(err)
        })
    })
}


module.exports = { getAuthTokenXSUAA, getAuthTokenEM, getProjects, sendNotification, getNotification, deleteNotification }
