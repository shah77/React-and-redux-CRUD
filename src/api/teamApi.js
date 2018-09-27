import delay from './delay';

const teams = [
  {
    id: '1',
    name: 'team A'
  },
  {
    id: '2',
    name: 'team B'
  },
  {
    id: '3',
    name: 'team C'
  }
];

const generateId = (team) => {
  return team.name.toLowerCase();
};

class TeamApi {
  static getTeams() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], teams));
      }, delay);
    });
  }

  static saveTeam(team) {
	team = Object.assign({}, team); 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        if (team.name < 1) {
          reject(`Name must be at least characters.`);
        }

        if (team.id) {
          const existingTeamIndex = teams.findIndex(a => a.id == team.id);
          teams.splice(existingTeamIndex, 1, team);
        } else {
         
          team.id = generateId(team);
          teams.push(team);
        }

        resolve(team);
      }, delay);
    });
  }

  static deleteTeam(teamId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTeamToDelete = teams.findIndex(team => {
            team.id == teamId;
        });
        teams.splice(indexOfTeamToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TeamApi;