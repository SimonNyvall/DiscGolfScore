type Game = {
    course: Course,
    players: Player[],
}

type Course = {
    name: string,
    holes: Hole[]
}

type Hole = {
    par: number
}

type Player = {
    firstName: string,
    lastName: string | undefined,
    scores: number[]
}