'use strict'
const cacheDuration = 86400
let cache = require('node-cache')
cache = new cache()

function createCache(cacheName, dataToStore) {
    return cache.set(cacheName, dataToStore, cacheDuration)
}

function cacheExists(cacheName){
    return cache.has(cacheName)
}

function getCacheData(cacheName){
    return cache.get(cacheName)
}

function deleteCache(cacheName){
    return cache.del(cacheName)
}

module.exports = {
    createCache,
    cacheExists,
    getCacheData,
    deleteCache
}