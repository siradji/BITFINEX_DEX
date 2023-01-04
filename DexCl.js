const { PeerRPCClient, PeerRPCServer} = require('grenache-nodejs-http')
const {OrderBook} = require("./Book");

class DexClient {
    constructor({
                    link,
                    port,
                    key,
        orderBook
                }) {
        this.orderBook = new OrderBook(orderBook)
        this.link = link
        this.port = port
        this.key = key
        this.client = undefined
        this.service = undefined
        this.server = undefined
        this.hasInit = false
        this.instanceId = String(10000 + Math.floor(Math.random() * 1000))
    }


    initialize () {
        if(this.hasInit) {
            return true
        }

        this.client  = new PeerRPCClient(this.link, {})
        this.client.init()
        this.server = new PeerRPCServer(this.link, {})
        this.server.init()
        this.service = this.server.transport('server')
        this.service.listen(this.port)
        this.hasInit = true

        this.service.on('request', this.handleReq.bind(this))
    }


    handleReq(rid, key, payload, handler) {
            const matched  = this.orderBook.matchOrder(payload)
            matched && this.orderBook.addOrder(payload)
        handler.reply(null, true)
    }

    async startNodes () {
        await Promise.any([
           this.link.announce(this.key, this.service.port, {}, () => {}),
           this.link.announce(this.instanceId, this.service.port, {}, () => {})
       ])

        console.log(`Node ${this.instanceId} started`)
    }

    async addOrder ({price, amount, side}) {
        // ask order
        const orderPayload =  {
            orderId: this.instanceId,
            side,
            price,
            amount,
            timestamp:"1472506127.0"
        }
        this.orderBook.addOrder(orderPayload)
        await this.client.map(this.key, orderPayload, {}, )
    }
}

module.exports.DexClient = DexClient
