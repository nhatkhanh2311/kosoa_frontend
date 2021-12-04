import SecureStorage from "secure-web-storage";

const CryptoJS = require("crypto-js");

const SECRET_KEY = "kosoa_secret_key";

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    return data.toString();
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return data.toString(CryptoJS.enc.Utf8);
  }
});

export default secureStorage;
