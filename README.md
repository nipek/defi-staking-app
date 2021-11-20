# Defi staking app 

### Install [ganache](https://www.trufflesuite.com/ganache) and import

### Import ganache wallet into metamask(Required for local testing)

- From the list of networks on metamast, click on custom RPC and input the following
    - Network Name: Ganache
    - New RPC URL: http://127.0.0.1:7545(you can get this from ganache)
    - Chain ID: 1337
- Copy a private key from one of the wallet address in Ganache and import into metamask

### Install truffle globally
`yarn global add truffle`

### compile contracts 
`truffle compiile`

### Migrate contracts on the blockchainrun 
`truffle migrate --reset `

### Mocha and Chai testing suite  
`truffle test`

### Run DAPP
`yarn start`

