<p align="center"><img src="./src/logo.jpg" align="center"></p>
<h1 align="center">pay-no-load</h1>
<p><h2 align="center">A plugin for the Alethio Ethereum lite-explorer</h2></p> 

***

## Setting up the lite-explorer and the plugin

1. Clone the lite-explorer repo, and run the following commands in your terminal, one by one :
```git
git clone https://github.com/Alethio/ethereum-lite-explorer.git
cd ethereum-lite-explorer
npm install
cp config.default.json config.dev.json
```

2. Now, in another terminal tab, clone the plugin github repo, inside *ethereum-lite-explorer* : 
```git
git clone https://github.com/smitrajput/pay-no-load.git
```

3. Make necessary modifications into `config.dev.json` if needed. You must also remove the version query strings `?v=#.#.#` from the "plugins" URIs.

4. Start continuous build:
`npm run watch`

5. Now, in another terminal tab, *while inside ethereum-lite-explorer* install `cms-plugin-tool` and the plugin by running:
```
npm i -g @alethio/cms-plugin-tool
acp install ./pay-no-load
```


4. Change into the plugin repo, install node packages and build the modules:
```
cd pay-no-load
npm install 
npm run watch 
```

5. Install the plugin into the lite-explorer by running the following command *while inside ethereum-lite-explorer* :
```
cd ..
acp install ./pay-no-load
```

6. Now, inside the file  `config.dev.json`, add the module and page definations for loading the module :

Adding the plugin : 
```
"plugins": {
...
    "plugin://aleth.io/eth-common": {
    },
    "plugin://aleth.io/pay-no-load": {}
...},
```

Adding the page definition : 
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

Adding icon to the homepage :
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
#### 1. token contract metadata (i.e. total supply, symbol, decimals, etc.) 

<img src="./src/gifs/Token-Contract-Details.gif" alt="Waffle-CLI_apiKeySetting" style="width:70%; margin-left: auto; margin-right: auto; display: block">

#### 2. all token balances for a given wallet address
<img src="./src/gifs/Ethereum-Lite-Blockchain-Explorer-Account-Token-Balance.gif" style="width:70%; margin-left: auto; margin-right: auto; display: block">

#### 3. latest transactions from/to a contract address
<img src="./src/gifs/Transaction-Decoding.gif" alt="Waffle-CLI_apiKeySetting" style="width:70%; margin-left: auto; margin-right: auto; display: block">

#### 4. *decoded payloads (parameters/arguments) of transactions* [most IMPORTANT feature; hence the repo name ;-)]

<hr />

<p align="center">Made with ❤️ by <a href="https://www.linkedin.com/in/smit-r-417517139/">Smit Rajput</a> • <a href="https://www.linkedin.com/in/akash981/"> Akash</a> • <a href="https://www.linkedin.com/in/tezan-sahu-a85802163/">Tezan Sahu</a> </a>

