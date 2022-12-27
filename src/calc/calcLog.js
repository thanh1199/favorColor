
import { dictA } from "./dict";

function calcLog ( centerA = [], centerBC = [], noLike = 0 ) {
    const result = ["広範囲", "広範囲", "広範囲", "確定中"]

    const h = []
    if (centerA.length !== 0) {
        const A = dictA()
        A.shift()
        centerA.forEach(c => {
            A.forEach(a => {
                if (a.id === c.id) h.push(a.name)
            })
        })
        result[0] = h.join(", ")
    }

    const s = [], v = []
    if (centerBC.length !== 0) {
        const centerB = centerBC.map(bc => bc[1])
        centerB.forEach(c => {
            switch (c.id) {
                case 0: s.push("薄い"); break
                case 1: s.push("やや薄い"); break
                case 2: s.push("やや濃い"); break
                default : s.push("濃い"); break
            }
        })
        result[1] = s.join(", ")

        const centerC = centerBC.map(bc => bc[0])
        centerC.forEach(c => {
            switch (c.id) {
                case 0: v.push("明るい"); break
                case 1: v.push("やや明るい"); break
                case 2: v.push("やや暗い"); break
                default : v.push("暗い"); break
            }
        })
        result[2] = v.join(", ")
    }

    if (centerA.length === 1 && centerBC.length === 1) result[3] = "確定"
    if (noLike > 15) result[3] = "変更中"
    return [...result]
}

export default calcLog