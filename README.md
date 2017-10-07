# BOScoin Wallet

## 설치

    yarn # or npm install

## 실행

    yarn start # or npm run start

## 설정 Config

설정은 `src/config.json` 에서 변경할 수 있습니다.

- api_url: Horizon API 주소
- passphrases: Horizon API Pass Phrases
- transaction_fee: 이체 수수료
- create_account_fee: 계좌 생성 수수료
- minimum_balance: 최소 보유 잔액
- ks_url: Kill Switch file path or API url
- ks_interval: Kill Switch 확인 주기 (초단위로 입력)

## Kill Switch data format

    {
    	"start_time": "2017-10-07T18:17:00.588208",
    	"end_time": "2017-10-07T18:18:00.588221",
    	"message": "XHTML Message<br/>Here"
    }

## 빌드

    yarn build