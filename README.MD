## DISTRIBUTED EXCHANGE

Leveraging the `grenache` lib, we created a distributed node. Each node has an orderbook
that stores orders. When a single node adds an order, it saves and broadcast the order the other nodes where matchers will match an  
and map an existing opposite order (ie BUY, SELL). Then adds it to there its order book


## Improvements that could have been made in absent of time constraint
I had to spent hours looking into documentation on how orderbook, grenache and trade execution based microservice works. 
This took a large proportion of my time. I hope it will be taking into considaration. 
- Storage: We are currently using a fibbionaci heap for storage. This is relatively slow
 compared to binarytree. Which could be implemented
- Matchers: This could be improved and reduce execution time by using a binary tree
- Code improvement: Code structure could have been improved.


## NOTES on the technical challenge
The task is  bit ambigious. `f a client's order matches with another order, any remainer is added to the orderbook, too.` This point here is something i did not understand
I translated it as when a new order request comes in, it should be broadcasted to the other nodes and run a matcher. If matched, it should be added to node's orderbook 


## Run project
install project
```shell
npm install
```

run grenache two grapes

```shell
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
```

create nodes by running 
```shell
node client.js 'port' 'price' 'amount' 'ORDER_SIDE'
```


