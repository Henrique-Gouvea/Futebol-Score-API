import Matches from '../../database/models/matches';
import { IMatches } from '../../interfaces/Matches/Matches';

export const mockMatches: IMatches =  {
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
