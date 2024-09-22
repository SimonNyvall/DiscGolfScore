import { Game, Course, Hole, Player } from '@/data/model';

export function createGame(course: Course, players: Player[]): Game {
  return {
    course,
    players
  };
}

// Example usage
const exampleCourse: Course = {
  name: "Example Course",
  holes: [
    { par: 3 },
    { par: 4 },
    { par: 5 }
  ]
};

const examplePlayers: Player[] = [
  {
    firstName: "John",
    lastName: "Doe",
    scores: [3, 4, 5]
  },
  {
    firstName: "Jane",
    lastName: undefined,
    scores: [4, 5, 6]
  }
];