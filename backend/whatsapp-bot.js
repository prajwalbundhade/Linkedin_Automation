const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // ✅ Terminal QR code print

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// ✅ QR Code Terminal
client.on('qr', (qr) => {
    console.log('Scan this QR Code from your mobile:');
    qrcode.generate(qr, { small: true }); 
});

// ✅ Bot Ready Event
client.on('ready', async () => {
    console.log('✅ WhatsApp Client is Ready!');
});

// ✅ WhatsApp Group Message Send Function
async function sendToWhatsAppGroup(groupName, message) {
    try {
        const chats = await client.getChats();
        const group = chats.find(chat => chat.name === groupName);

        if (!group) {
            console.log('❌ Group not found:', groupName);
            return;
        }

        await group.sendMessage(message);
        console.log('✅ Message sent to:', groupName);
    } catch (error) {
        console.error('❌ Error sending message:', error);
    }
}

// ✅ Bot Initialize
client.initialize();

// ✅ Export Function for External Usage
module.exports = { sendToWhatsAppGroup };
