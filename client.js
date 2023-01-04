const Link = require('grenache-nodejs-link')
const {DexClient} = require("./DexCl");

if (!process.argv[2]) {
    console.log('Port number need as args')
    process.exit(1)
}

const PORT = 1024 + Math.floor(Math.random() * 1000)
const DEFAULT_KEY = 'ORDER'
const BOOK_NAME = process.argv[2]

const link = new Link({
    grape: 'http://127.0.0.1:30001'
})
link.start()

const dexClient = new DexClient({
    link,
    port: PORT,
    key: DEFAULT_KEY,
    orderBook: BOOK_NAME
})


dexClient.initialize()
void dexClient.startNodes()
void dexClient.addOrder( {
    price: process.argv[3] ?? '0',
    amount: process.argv[4] ?? '0',
    side: process.argv[4] === 'BUY' ? 1 : 0
})
