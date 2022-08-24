export interface GoalsMatches {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface CreateMatches extends GoalsMatches{
  homeTeam: number;
  awayTeam: number;
}

export interface IMatches extends CreateMatches {
  id: number;
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
