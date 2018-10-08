'use strict'
import config from '../config'
import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config.REDIS.port,config.REDIS.server)

client.on('ready', (res) => {
	console.log('redis ready');
	log.info('redis is ready!');
});

client.on('error', (err) => {
	console.log('redis error:' + err);
});

client.on('end', (err) => {
	console.log('redis end');
});

module.exports = client;
