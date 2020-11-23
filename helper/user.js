require('dotenv').config();
import request from '../config/common';
const faker = require('faker');
const TOKEN = process.env.USER_TOKEN;

export const createRandomNewUser = async () => {
  const data = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    status: 'Active',
    gender: 'Male',
  };

  const res = await request
    .post(`users`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);

  return res.body.data;
};

export const createRandomUser = async () => {
  const data = {
    email: 'jmathews' + Math.floor(Math.random() * 99999) + '@mail.ca',
    name: 'John',
    status: 'Active',
    gender: 'Male',
  };
  const res = await request
    .post(`users`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);
  return res.body.data;
};
