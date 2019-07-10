<p align="center"><img src="./src/logo.jpg" align="center"></p>
<h1 align="center">pay-no-load</h1>
<p><h2 align="center">A plugin for the Alethio ethereum lite-explorer.</h2></p> 

***

## Getting started

1. Clone the lite-explorer repo  :
```git
git clone https://github.com/Alethio/ethereum-lite-explorer.git
```

follow the steps given in the alethio lite explorer repo's README file to get it running.

inside the lite explorer directory, clone the plugin github repo : 
```git
cd ethereum-lite-explorer
git clone https://github.com/smitrajput/pay-no-load.git
```

go inside the plugin repo, install node packages and build the module:
```
cd pay-no-load
npm install 
npm run build 
```

include the plugin in the explorer by running the following command in the parent repo :
```
acp install pay-no-load
```

inside the file  `config.dev.json`, add the module and page definations for loading the module :

adding the plugin : 
```
"plugins": {
...
    "plugin://aleth.io/eth-common": {
    },
    "plugin://aleth.io/pay-no-load": {}
...},
```

adding the page def : 
```
{
    "def": "page://aleth.io/payts/profile-page",
    "children": {
        "content": [
            { "def": "module://aleth.io/pay-no-load/profile" }
        ]
    }
    }
```

adding icon to the homepage :
```
{...
"def": "page://aleth.io/dashboard",
"children": {
    "content": [
        { "def": "module://aleth.io/search" },
        { "def" : "module://aleth.io/pay-no-load/home-link" }, ...
```

## Features

### Displays
1. Token contract metadata (i.e. total supply, symbol, decimals, etc.) 

<img src="./src/gifs/Token-Contract-Details.gif" alt="Waffle-CLI_apiKeySetting" style="width:70%; margin-left: auto; margin-right: auto; display: block">

2. All token balances for a given wallet address
<img src="./src/gifs/Ethereum-Lite-Blockchain-Explorer-Account-Token-Balance.gif" style="width:70%; margin-left: auto; margin-right: auto; display: block">

3. Latest transactions from/to a contract address
<img src="./src/gifs/Transaction-Decoding.gif" alt="Waffle-CLI_apiKeySetting" style="width:70%; margin-left: auto; margin-right: auto; display: block">

4. Decoded payloads (parameters/arguments) of transactions

<hr />

<p align="center">Made with ❤️ by <a href="https://www.linkedin.com/in/smit-r-417517139/">Smit Rajput</a> • <a href="https://www.linkedin.com/in/akash981/"> Akash</a> • <a href="https://www.linkedin.com/in/tezan-sahu-a85802163/">Tezan Sahu</a> </a>

