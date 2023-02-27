var request = require('request');




function getOrders(_max,_offset,callback){
    var options = {
        url:'https://marketplace-decathlon-eu.mirakl.net/api/orders?max=' + _max + '&offset=' + _offset,
        headers: {
            'Content-Type':'application/json',
            'Authorization':''
        }
    }
    request.get(options, function (error, response, body) {
        if(error){
            callback(error);
        }
        else{
            if (!error && response.statusCode == 200) {
                let orders = JSON.parse(body);
                callback(null,orders);
            }              
        }
    });
}
function getOrder(order_id,callback){
    var options = {
        url:'https://marketplace-decathlon-eu.mirakl.net/api/orders?order_id=' + order_id,
        headers: {
            'Content-Type':'application/json',
            'Authorization':'8db2f98b-bba9-4969-a7da-0f15b2555b57'
        }
    }
    request.get(options, function (error, response, body) {
        if(error){
            callback(error);
        }
        else{
            if (!error && response.statusCode == 200) {
                let orders = JSON.parse(body);
                callback(null,orders);
            }              
        }
    });
}
function getTopics(callback){
    var options = {
        url:'https://myapim0001.azure-api.net/conf/topics',
        headers: {
            'Content-Type':'application/json',
            'Ocp-Apim-Subscription-Key': '7b6a6a2be39c4434a5dec118d980356d'
        }
    }
    request.get(options, function (error, response, body) {
        if(error){
            callback(error);
        }
        else{
            if (!error && response.statusCode == 200) {
                let topics = JSON.parse(body);
                callback(null, topics);
            }              
            if (!error && response.statusCode == 401) {
                callback("401: Unauthorized");
            }
        }
    });
}

function getBuildings(callback){
    var options = {
        url:'http://esb-dev.forem.be/services/Referentiels/EntitesTransversales/Immeubles',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Basic SUFkZmluaXR5X0JhY2tlbmQ6SUFkZmluaXR5X0JhY2tlbmQwMQ=='
        }
    }
    request.get(options, function (error, response, body) {
        if(error){
            callback(error);
        }
        else{
            if (!error && response.statusCode == 200) {
                let buildings = JSON.parse(body);
                callback(null, buildings);
            }              
        }
    });
    
}

module.exports = {
    GetOrder:getOrder,
    GetOrders:getOrders,
    GetBuildings:getBuildings,
    GetTopics:getTopics
}
