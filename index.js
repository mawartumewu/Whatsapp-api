// versi api
const express = require('express');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;

//cors setup
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept');
  next()
})

app.use(bodyParser.json());
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" 
     })
})

router.post('/', (req, res) => {
    const { wa_number, message} = req.body
    console.log("req.body:",req.body);
      /* const send_message = [
         "6281287765680",
         "6285244097783",
     ]*/
    client.on("ready", () => {
        console.log("succesfully send")
        wa_number.map(value => {
            const chatId = value +"@c.us"
            client.sendMessage(chatId,message)
          })
          res.status(200).send({
             message: "succesfully send message",
           });
        })
  });
  
  app.use('/wamessage', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

client.on("qr", qr => {
  qrcode.generate(qr, {small: true} );
})

client.initialize();


/////===================================

// // // versi bukan api dan save session
// const qrcode = require('qrcode-terminal');
// const fs = require("fs")
// const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');

// const client = new Client({
//      authStrategy: new LocalAuth({
//           clientId: "client-one" 
//      })
// })

// client.on("qr", qr => {
//     qrcode.generate(qr, {small: true} );
// })

// // client.on('authenticated', (session) => {
//     //     console.log("user session:",session);
//     // });
    
//     const send_message = [
//         "6281287765680",
//         "6285244097783",
//     ]
    
//     client.initialize();

// client.on("ready", () => {
//     console.log("Listen")
//     send_message.map(value => {
//         const chatId = value +"@c.us"
//         message = "testing pesan otomatis"
//         client.sendMessage(chatId,message);
// })})
