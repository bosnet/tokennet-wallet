# BOScoin Wallet

## Install

    yarn # or npm install

## Run

    yarn start # or npm run start

## Config

You can change `src/config.json`.

- test_mode: If you set `true`, change background and main page view.
- api_url: Horizon API URL
- passphrases: Horizon API Pass Phrases
- transaction_fee: Transaction Fee
- minimum_balance: Minimum Balance
- ks_url: Kill Switch file path or API url
- ks_interval: Kill Switch check cycle (second unit)
- active_make_a_new_key: Show `Make a new key` Button
- active_create_test_account: Show `Create new account on TestNet` Button
- ga_id: Google Analytics ID

## Kill Switch data format

    {
    	"start_time": "2017-10-07T18:17:00.588208",
    	"end_time": "2017-10-07T18:18:00.588221",
    	"message": "XHTML Message<br/>Here"
    }

## Build

    yarn build