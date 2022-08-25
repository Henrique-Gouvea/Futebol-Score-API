import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import {
  mockLoginUser,
  mockUser,
  mockLoginPasswordError,
  mockLoginEmailError,
  mockLoginNoEmail,
  mockLoginNoPassword,
} from './mocks/user'
import Matches from '../database/models/matches';
import Users from '../database/models/users';



chai.use(chaiHttp);

const { expect } = chai;

describe('Teste para rota login', () => {
  describe('Verifica login', () => {
    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(mockUser as unknown as Users);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('retorno status = 200', async () => {
      const response = await chai.request(app).post('/login').send(mockLoginUser);
      expect(response.status).to.equal(200);
    })

    it('retorno contem token', async () => {
      const response = await chai.request(app).post('/login').send(mockLoginUser);
      expect(response.body).to.have.property('token');
    })

    it('Validacao sem email,status: e message', async () => {
      const response = await chai.request(app).post('/login').send(mockLoginNoEmail);
      expect(response.body.message).to.equal('All fields must be filled');
      expect(response.status).to.equal(400);
    })

    it('Validacao sem Password, status: e message', async () => {
      const response = await chai.request(app).post('/login').send(mockLoginNoPassword);
      expect(response.body.message).to.equal('All fields must be filled');
      expect(response.status).to.equal(400);
    })

    it('Validacao email errado, status: e message', async () => {
      const response = await chai.request(app).post('/login').send(mockLoginEmailError);
      expect(response.body.message).to.equal('Incorrect email or password');
      expect(response.status).to.equal(401);
    })

    it('Validacao email errado, status: e message', async () => {
      const response = await chai.request(app).post('/login').send(mockLoginPasswordError);
      expect(response.body.message).to.equal('Incorrect email or password');
      expect(response.status).to.equal(401);
    })
  });
});