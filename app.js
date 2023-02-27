const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const app = express()
const port = 3000

const mirakl = require('./scripts/Forem.main.js')

const { success, error} = require('./scripts/helper.js')

/****************************************************************************************
 * Middlewares
 ****************************************************************************************/
// Ce middleware sera exécuté à chaque appel de cette application (HTTP entrante)
//app.use((req,res,next)=>{
//    console.log("Current Time:" + Date.now());
//    next()
//})
// middleware de traitement d'erreur
/*app.use((err, req, res, next) =>{
    console.error(err)
    res.send('Erreur')
})*/
// middleware logger personnalisé pour écrir l'url appelant sur un HTTP entrant
/*app.use((req,res,next) =>{
    console.log(`URL : ${req.url}`)
    next()
});*/
// Utilisation du middleware morgan pour le loggin, au lieu de notre middleware perso
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(cors())

/****************************************************************************************
 * Routage
 ****************************************************************************************/
app.get('/',(req,res) => res.send('Hello Express'))

app.get('/api/orders',(req,res) => {
    const _max = parseInt((req.query.max | 10))
    const _offset = parseInt((req.query.offset | 0))
    mirakl.getOrders(_max,_offset).then((orders)=>{
		res.json(orders)
	}).catch((reason) =>{
		console.error(reason);
	});
});

app.get('/api/topics',(req,res) => {

    mirakl.getTopics().then((topics)=>{
		res.json(topics)
	}).catch((reason) =>{
		console.error(reason);
	});
});

app.get('/api/orders/:id',(req,res)=>{
    const id = req.params.id
    mirakl.getOrder(id).then((orders)=>{
        if(orders != null && orders.length >0){
            const _order = orders[0]
            const message = "La commande a été trouvée."
            res.json(success(message, _order));
        }
        else{
            const message = "Commande non trouvée"
            res.json(error(message))
        }
	}).catch((reason) =>{
		console.error(reason);
	});
})

app.listen(port,()=>console.log(`Server is listening on http://localhost:${port}`))
