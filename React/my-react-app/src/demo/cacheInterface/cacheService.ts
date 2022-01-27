import axios from 'axios'

export interface CacheServiceState {
  store: any;
}

class CacheService {
  store: any;
  constructor() {
    this.store = {};
  }
  async fetch(params: any) {
    // 最好保证请求参数每次是唯一的，否则的话不适用这种缓存键
    const fetchCacheKey = JSON.stringify(params);
    if (this.store[fetchCacheKey]) {
      return this.store[fetchCacheKey]
    }
    const result = await axios.request(params);
    this.store[fetchCacheKey] = result;
    return result;
  }
  clearCache() {
    this.store = {};
  }
}
const CacheServiceInstance = new CacheService();
export default CacheServiceInstance;