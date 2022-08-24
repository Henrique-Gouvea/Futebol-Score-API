export interface GoalsMatches {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface CreateMatches extends GoalsMatches{
  homeTeam: number;
  awayTeam: number;
  inProgress?: boolean;
}

export interface IMatches extends CreateMatches {
  id: number;
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
