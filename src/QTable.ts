interface stateAction {
    stateIndex: number
    action: number
}

class QTable {
    // 32 rader (4 riktningar för äpplet, 8 möjligheter för faror)
    table: number[][]

    constructor() {
        this.table = Array(32)
        for (let i = 0; i < this.table.length; i++) {
            this.table[i] = Array(3)
            for (let j = 0; j < this.table[i].length; j++) {
                this.table[i][j] = Math.random()
            }
        }
    }

    getBestAction(stateIndex: number): number {
        const moves = this.table[stateIndex]
        const max = Math.max(...moves)

        for (let i = 0; i < moves.length; i++) {
            if (moves[i] == max) {
                return i
            }
        }

        return 1
    }

    addWeight(state: stateAction, weight: number) {
        this.table[state.stateIndex][state.action] += weight
    }

    randomAction() {
        return Math.floor(Math.random() * 3)
    }
}

export default QTable
export type { stateAction }
