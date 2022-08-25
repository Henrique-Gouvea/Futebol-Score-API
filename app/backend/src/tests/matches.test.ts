import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { IMatches } from '../interfaces/Matches/Matches';
import {mockMatches, mockCreateMatches} from './mocks/match'
import Matches from '../database/models/matches';
import { IToken } from '../interfaces/Providers/IToken';
import TokenProvider from '../providers/tokenProvider';



chai.use(chaiHttp);

const { expect } = chai;

describe('Teste para rota matches', () => {
  describe('List', () => {
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

    it('retorno body matches', async () => {
      const response  = await chai.request(app).get('/matches')
      const [match] = response.body;
      expect(match.id).to.equal(mockMatches.id)
      expect(match.homeTeam).to.equal(mockMatches.homeTeam)
      expect(match.homeTeamGoals).to.equal(mockMatches.homeTeamGoals)
      expect(match.awayTeam).to.equal(mockMatches.awayTeam)
      expect(match.awayTeamGoals).to.equal(mockMatches.awayTeamGoals)
      expect(match.inProgress).to.equal(mockMatches.inProgress)
    });
  });

  describe('Create', () => {
    beforeEach(() => {
      sinon.stub(Matches,'create').resolves(mockCreateMatches as unknown as Matches);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('retorno status = 401', async () => {
      const response  = await chai.request(app).post('/matches')
      expect(response.status).to.equal(401);
    });

    it('Retorno mensagem invalid token', async () => {
      const response  = await chai.request(app).post('/matches')
      expect(response.body.message).to.equal('Invalid token');
    });
  });
});