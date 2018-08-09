const API_key = process.env.REACT_APP_COIN_API_KEY;
const CoinSDK = window.COIN_API_SDK;
const coinAPI = new CoinSDK(API_key)

export default coinAPI;
