const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'open') {
            console.log('✅ البوت اشتغل مرة واحدة فقط')
        }

        if (connection === 'close') {
            const code = lastDisconnect?.error?.output?.statusCode

            console.log('⚠️ الاتصال اتقفل:', code)

            if (code !== DisconnectReason.loggedOut) {
                console.log('🔄 إعادة تشغيل...')
                startBot()
            } else {
                console.log('❌ لازم QR جديد')
            }
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (text === '.ping') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'pong 🏓' })
        }
    })
}

startBot()