import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { IMatches } from '../interfaces/Matches/Matches';
import {mockMatches} from './mocks/match'
import Matches from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste para rota matches', () => {

  beforeEach(() => {
    sinon.stub(Matches,'findAll').resolves([mockMatches as unknown as Matches]);
  })

  afterEach(() => {
    sinon.restore();
  })

  it('retorno status = 200', async () => {
    const response  = await chai.request(app).get('/matches')
    expect(response.status).to.equal(200);
  });

//   it('retorno para filtro partida em progresso', async () => {
//     const response = await chai.request(app).get('/matches');
//     const match = response.body[0] as IMatches;
//     expect(match).to.be.deep.equal(mock);
//     expect(response.status).to.equal(200);
//   });

//   it('retorno para filtro partida finalizada', async () => {
//     const response = await chai.request(app).get('/matches');
//     const match = response.body[0] as IMatches;
//     expect(match).to.be.deep.equal(mock[0]);
//     expect(response.status).to.equal(200);
//   });
});