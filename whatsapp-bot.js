const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // ✅ Terminal me QR code print karne ke liye

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true, // AWS pe GUI nahi chahiye, background me chalega
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// ✅ QR Code Terminal pe Print Karo (AWS ke liye best)
client.on('qr', (qr) => {
    console.log('Scan this QR Code from your mobile:');
    qrcode.generate(qr, { small: true }); // ✅ Terminal me QR code dikhega
});

// ✅ Bot Ready Event
client.on('ready', async () => {
    console.log('✅ WhatsApp Client is Ready!');
});

// ✅ WhatsApp Group me Message Send Karne Ka Function
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

// ✅ Bot Initialize Karo
client.initialize();

// ✅ Export Function for External Usage
module.exports = { sendToWhatsAppGroup };
