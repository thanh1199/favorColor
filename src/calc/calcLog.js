
import { dictA } from "./dict";

function calcLog ( centerA = [], centerB = [], centerC = [], noLike = 0 ) {
    const result = ["広範囲", "広範囲", "広範囲", "確定中"]

    var color = []
    if (centerA.length !== 0) {
        const A = dictA()
        A.shift()
        centerA.forEach(c => {
            A.forEach(a => {
                if (a.id === c.id) color = [...color, a.name]
            })
        })
        result[0] = color.join(", ")
    }

    color = []
    if (centerB.length !== 0) {
        centerB.forEach(c => {
            switch (c.id) {
                case 0: color = [...color, "薄い"]; break
                case 1: color = [...color, "やや薄い"]; break
                case 2: color = [...color, "やや濃い"]; break
                default : color = [...color, "濃い"]; break
            }
        })
        result[1] = color.join(", ")
    }

    color = []
    if (centerC.length !== 0) {
        centerC.forEach(c => {
            switch (c.id) {
                case 0: color = [...color, "明るい"]; break
                case 1: color = [...color, "やや明るい"]; break
                case 2: color = [...color, "やや暗い"]; break
                default : color = [...color, "暗い"]; break
            }
        })
        result[2] = color.join(", ")
    }

    if (centerA.length === 1 && centerB.length === 1 && centerC.length === 1) result[3] = "確定"
    if (noLike > 15) result[3] = "変更中"
    return [...result]
}

export default calcLog