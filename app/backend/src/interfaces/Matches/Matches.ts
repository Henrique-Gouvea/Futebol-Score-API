export interface GoalsMatches {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatches extends GoalsMatches {
  id: number;
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
