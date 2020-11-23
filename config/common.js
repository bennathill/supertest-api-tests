import qa from './qa';
const supertest = require('supertest');
const request = supertest(qa.baseUrl);

export default request;
