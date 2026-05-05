const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

const BOT_NAME = "MalekBot" // 👈 اسم البوت

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')

  const sock = makeWASocket({
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ""

    const from = msg.key.remoteJid

    // ===== الأوامر =====

    // 📌 أمر: .ping
    if (text === ".ping") {
      await sock.sendMessage(from, { text: `🏓 ${BOT_NAME} شغال` })
    }

    // 📌 أمر: .menu
    if (text === ".menu") {
      await sock.sendMessage(from, {
        text: `📋 أوامر ${BOT_NAME}:

.ping
.hello
.time
`
      })
    }

    // 📌 أمر: .hello
    if (text === ".hello") {
      await sock.sendMessage(from, {
        text: `👋 اهلا بيك من ${BOT_NAME}`
      })
    }

    // 📌 أمر: .time
    if (text === ".time") {
      const now = new Date().toLocaleTimeString()
      await sock.sendMessage(from, {
        text: `⏰ الوقت: ${now}`
      })
    }

  })
}

start()
