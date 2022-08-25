import Matches from '../../database/models/matches';
import { CreateMatches, IMatches } from '../../interfaces/Matches/Matches';

export const mockMatches: IMatches = {
  id: 42,
  homeTeam: 6,
  homeTeamGoals: 1,
  awayTeam: 1,
  awayTeamGoals: 0,
  inProgress: true,
  teamHome: {
    teamName: 'Ferroviária'
  },
  teamAway: {
    teamName: 'Avaí/Kindermann'
  }
}

export const mockCreateMatches: CreateMatches = {
  homeTeam: 16, // O valor deve ser o id do time
  awayTeam: 8, // O valor deve ser o id do time
  homeTeamGoals: 2,
  awayTeamGoals: 2
}
