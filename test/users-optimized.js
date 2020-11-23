require('dotenv').config();
import request from '../config/common';

import { expect } from 'chai';
import { createRandomNewUser } from '../helper/user';

// const {
//   createRandomNewUser: createRandomNewUser,
// } = require('../helper/user');

const TOKEN = process.env.USER_TOKEN;

describe('Users', () => {
  let newUser, userId, newUserId;

  before(async () => {
    newUser = await createRandomNewUser();
    newUserId = newUser.id;
    console.log(newUser);
  });

  after(() => {
    //clean up
    // delete a user
  });

  describe('GET', () => {
    it('/users', () => {
      return request
      .get(`users?access-token=${TOKEN}`)
      .then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it('/users/:id', () => {
      return request
        .get(`users/${newUserId}?access-token=${TOKEN}`)
        .then((res) => {
          expect(res.body.data.id).to.be.eq(newUserId);
        });
    });

    it('/users with query params', () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=Female&status=Active`;

      return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq('Female');
          expect(data.status).to.eq('Active');
        });
      });
    });
  });

  describe('POST', () => {
    it('/users', () => {
      const data = {
        email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
        name: 'Test name',
        gender: 'Male',
        status: 'Inactive',
      };

      return request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body)
          expect(res.body.data).to.deep.include(data);
          userId = res.body.data.id;
        });
    });
  });

  describe('PUT', () => {
    it('/users/:id', () => {
      const data = {
        status: 'Active',
        name: `Benji - ${Math.floor(Math.random() * 9999)}`,
      };

      return request
        .put(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body)
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe('DELETE', () => {
    it('/users/:id', () => {
      return request
        .delete(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body.data).to.be.eq(null);
        });
    });
  });

});
