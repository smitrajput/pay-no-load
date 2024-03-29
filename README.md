<p align="center"><img src="./src/logo.jpg" align="center"></p>
<h1 align="center">pay-no-load</h1>
<p><h3 align="center">A plugin for the Alethio Ethereum lite-explorer</h3></p>

---

<p align="center">:tada::tada::tada::tada:</p>
<img src="src/gifs/alethio-plugin.gif" alt="alethio-plugin" style="width:80%; margin-left: auto; margin-right: auto; display: block">

## Setting up the lite-explorer and the plugin

1. Clone the lite-explorer repo, and run the following commands in your terminal, one by one :

   ```javascript
   $ git clone https://github.com/Alethio/ethereum-lite-explorer.git
   $ cd ethereum-lite-explorer
   $ npm install
   $ cp config.default.json config.dev.json
   ```

2. Remove the version query strings `?v=#.#.#` from the "plugins" URIs in `config.dev.json`.


3. Build the lite-explorer:
   `npm run build`

4. Now, in another terminal tab, _while inside ethereum-lite-explorer_ install `cms-plugin-tool` and the plugins by running:

   ```
   npm i -g @alethio/cms-plugin-tool@1.0.0-beta.3
   acp install --dev \
       @alethio/explorer-plugin-eth-common \
       @alethio/explorer-plugin-eth-lite \
       @alethio/explorer-plugin-3box
   acp install --dev smitrajput/pay-no-load
   ```

7. Now, inside the file `config.dev.json` in the lite-explorer repo, add the module and page definations for loading the module :

   Add the plugin and your Alethio API Key (Can be obtained [here](https://developers.aleth.io/)):

   ```json
   "plugins": {
       "plugin://aleth.io/eth-common": {
       },
       "plugin://aleth.io/payts": {
            "alethio_api_key": "your_API_key"
       }
      },
   ```

   Add the page definition :

   ```json
   {
     "def": "page://aleth.io/payts/profile-page",
     "children": {
       "content": [{ "def": "module://aleth.io/payts/profile" }]
     }
   }
   ```

   Add a clickable on the home page by inserting the line `{ "def": "module://aleth.io/payts/home-link" },` in:

   ```json
   {
         "def": "page://aleth.io/dashboard",
         "children": {
           "content": [
             { "def": "module://aleth.io/search" },
             { "def": "module://aleth.io/payts/home-link" },
             {
               "def": "context://aleth.io/dashboard/latestBlockRange",
   ```

8. Enter `npm run start` in the terminal while inside the `ethereum-lite-explorer` directory. The page with URL `http://localhost:3000/` will open automatically, showing the lite-explorer home page. Click on `Click here` below the search bar, to access the pay-no-load plugin.

## Features

---

### Displays:

#### 1. token contract metadata (i.e. total supply, symbol, decimals, etc.)

<img src="./src/gifs/Token-Contract-Details.gif" alt="Show Token Contract Details" style="width:70%; margin-left: auto; margin-right: auto; display: block">

#### 2. all token balances for a given wallet address

<img src="./src/gifs/Ethereum-Lite-Blockchain-Explorer-Account-Token-Balance.gif" style="width:70%; margin-left: auto; margin-right: auto; display: block">

#### 3. latest transactions from/to a contract address

<img src="./src/gifs/Transaction-Decoding.gif" alt="Decode Txn from latest" style="width:70%; margin-left: auto; margin-right: auto; display: block">

#### 4. _decoded payloads (parameters/arguments) of transactions_ [most IMPORTANT feature; hence the repo name ;-)]

<hr />

<p align="center">Made with ❤️ by <a href="https://www.linkedin.com/in/smit-r-417517139/">Smit Rajput</a> • <a href="https://www.linkedin.com/in/akash981/"> Akash</a> • <a href="https://www.linkedin.com/in/tezan-sahu-a85802163/">Tezan Sahu</a> </a>
```
