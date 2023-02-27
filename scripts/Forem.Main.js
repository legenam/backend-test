var api = require('../api/api')


var Forem = Forem || {};

Forem.Main = {
    orders : null,
    topics:null,
    buildings : null,

    initialize:function() {
        
    },
    getOrder: function(id){
        return new Promise((resolve, reject)=>{
            
            api.GetOrder(id,function(error, data){
                if (error) {
                    console.error('An error occurred:', error);
                    reject(error);
                } else {
                    this.orders = data.orders;

                    resolve(this.orders);
                }
            });
        });
        
    },
    getOrders: function(_max,_offset){
        return new Promise((resolve, reject)=>{
            
            api.GetOrders(_max,_offset,function(error, data){
                if (error) {
                    console.error('An error occurred:', error);
                    reject(error);
                } else {
                    this.orders = data.orders;

                    resolve(this.orders);
                }
            });
        });
        
    },
    getTopics: function(){
        return new Promise((resolve, reject)=>{
            
            api.GetTopics(function(error, data){
                if (error) {
                    console.error('An error occurred:', error);
                    reject(error);
                } else {
                    this.topics = data.collection.items;

                    resolve(this.topics);
                }
            });
        });
        
    },
    getBuildings: function(){
        return new Promise((resolve,reject) =>{
            api.GetBuildings(function(error, data){
                if (error) {
                    console.error('An error occurred:', error);
                    reject(error);
                } else {
                    this.buildings = data.items;
                    
                    resolve(this.buildings);
                }
            })
        });
       
    }
    
};


module.exports = Forem.Main;