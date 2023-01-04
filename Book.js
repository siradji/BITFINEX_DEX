const {FibonacciHeap} = require('@tyriar/fibonacci-heap')
const Order = {
    SIDE: {
        ASK: 0,
        BID: 1
    }
}

/**
 * An order book instance that stores orders in a Fibonacci heap data structure.
 */
 class OrderBook {
    constructor(name = "book") {
        this.name = name;

        // Buy orders heap
        this._bids = new FibonacciHeap();

        // Sell orders heap
        this._asks = new FibonacciHeap();

    }


    askToArray () {
        const askArray = []
        const prevAskHeap = this._asks
        this._asks = new FibonacciHeap()
        while (!prevAskHeap.isEmpty()) {
           const ask = prevAskHeap.extractMinimum().key;
            this._asks.insert(ask);
            askArray.push(ask);
        }
        return askArray
    }


    bidsToArray () {
        const bidsArray = []
        const prevBidHeap = this._bids
        this._bids = new FibonacciHeap()
        while (!prevBidHeap.isEmpty()) {
            const bid = prevBidHeap.extractMinimum().key;
            this._bids.insert(bid);
            bidsArray.push(bid);
        }
        return bidsArray
    }
    addOrder(order) {
        const opposingSide = order.side === Order.SIDE.BID ?  Order.SIDE.ASK :  Order.SIDE.BID

        //A unique identifier for matching orders
        order.key =  `${opposingSide}@${order.price}:${order.amount}`
        if (order.side === Order.SIDE.BID) {
            this._bids.insert(order);
        } else if (order.side === Order.SIDE.ASK) {
            this._asks.insert( order);

        }
        return true;
    }


    matchOrder (order) {
        const opposingSide = order.side === Order.SIDE.BID ?  Order.SIDE.ASK :  Order.SIDE.BID
        const key = `${opposingSide}@${order.price}:${order.amount}`

        if(order.side === Order.SIDE.ASK) {
            const askOrders = this.askToArray()
           return askOrders.some( _order =>  _order.key === key && _order.orderId !== order.orderId)
        } else if(order.side === Order.SIDE.BID) {
            const bidOrders =  this.bidsToArray()
            return bidOrders.some( _order => _order.key === key && _order.orderId !== order.orderId)
        }

        return false
    }
}

module.exports = {
    OrderBook
}
