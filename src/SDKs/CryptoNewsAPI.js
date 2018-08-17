import CryptoNewsAPI from 'crypto-news-api';

const API_key = process.env.REACT_APP_CRYPTO_NEWS_API_KEY;
const NewsAPI = new CryptoNewsAPI(API_key);

export default NewsAPI;
