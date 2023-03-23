
// // versi disconected
// const qrcode = require('qrcode-terminal');
// const express = require('express');
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const dotenv = require('dotenv').config();
// const app = express();
// const port = process.env.PORT
// const client = new Client({
//   authStrategy: new LocalAuth({
//     clientId: "client-one"
//   }),
//   puppeteer: {
//     args: ['--no-sandbox'],
//   }
// });

// app.use(express.json());

// app.post('/send-message', async (req, res) => {
//   const { wa_numbers, message } = req.body;
//   try {
//     wa_numbers.map(value => {
//       const chatId = value + "@c.us";
//       client.sendMessage(chatId, message);
//     });
//     res.send('Message sent successfully!');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// function keepSessionAlive() {
//   if (client.state !== 'PAIRED') {
//     client.initialize();
//   }
// }

// client.on('qr', qr => {
//   console.log(qr);
//   qrcode.generate(qr, { small: true });
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
// });

// client.on('disconnected', () => {
//   console.log('Client is disconnected!');
//   keepSessionAlive();
// });

// client.initialize();

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// ini code fix
const qrcode = require('qrcode-terminal');
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT

let isClientReady = false;

const client = new Client({
  authStrategy: new LocalAuth({
       clientId: "client-one" 
  }),
  puppeteer: {
   args: ['--no-sandbox'],
 }
})


app.use(express.json());
app.post('/send-message', async (req, res) => {
  const { wa_numbers, message } = req.body;
  try {
    if (isClientReady) {
      wa_numbers.map((value) => {
        const chatId = value + '@c.us';
        client.sendMessage(chatId, message);
      });
      res.status(200).send({message:'Message sent successfully!'});
    } else {
      res.status(200).send({message:'WhatsApp client is not ready. Please wait until it is ready!'});
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

client.on("qr", qr => {
  console.log(qr);
    qrcode.generate(qr, {small: true} );
})

client.initialize();

client.on('ready', () => {
  isClientReady = true;
  console.log('WhatsApp client is ready!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

client.on('disconnected', () => {
  console.log('Client is disconnected!');
});



// /////===================================

// // // versi bukan api dan save session
// const qrcode = require('qrcode-terminal');
// const { Client, NoAuth } = require('whatsapp-web.js');
// const fs = require('fs');

// const client = new Client({
//   authStrategy: new NoAuth()
// });

// client.on("qr", qr => {
//   qrcode.generate(qr, {small: true} );
// });

// client.on('authenticated', (session) => {
//   console.log('Autentikasi berhasil!');
// });

// const send_message = [
//   "6281287765680",
//   "6285244097783",
// ]

// client.on("ready", () => {
// console.log("Listen")
// send_message.map(value => {
//   const chatId = value +"@c.us"
//   message = "testing pesan otomatis2"
//   client.sendMessage(chatId,message);
// })})

// client.initialize();
