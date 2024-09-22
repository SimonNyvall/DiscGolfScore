export interface Game {
    course: Course,
    players: Player[],
}

export interface Course {
    name: string,
    holes: Hole[]
}

export interface Hole {
    par: number
}

export interface Player {
    firstName: string,
    lastName: string | undefined,
    scores: number[]
}