const { Client,LocalAuth,Buttons} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }


});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});    
}); 

client.on('authenticated', () => {
    console.log('AUTHENTICATED'); 
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log(msg);
    if (msg.body == '!ping') {
        msg.reply('pong');
    }else if (msg.body === '!buttons') {
        let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
        client.sendMessage(msg.from, button);
    }else if (msg.body ==='bt1'){
        client.sendMessage(msg.from, 'Este es el boton 1');
    }else if (msg.body ==='bt2'){
        client.sendMessage(msg.from, 'Este es el boton 2');       
    }else if (msg.body ==='bt3'){
        client.sendMessage(msg.from,'Este es el boton 3');
    }
});

client.initialize();

