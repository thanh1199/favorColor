
import { dictA } from "./dict";

function calcLog ( centerA = [], centerBC = [], noLike = 0 ) {
    const result = ["広範囲", "広範囲", "広範囲", "確定中"]

    const h = []
    if (centerA.length !== 0) {
        const A = dictA()
        A.shift()
        centerA.forEach(cen => {
            A.forEach(a => {
                if (a.id === cen) h.push(a.name)
            })
        })
        result[0] = h.join(", ")
    }

    const s = [], v = []
    var check
    if (centerBC.length !== 0) {
        check = []
        const centerBValue = centerBC.map(bc => bc[1])
        check = centerBValue.map((b, i) => {
            for (var j = i + 1; j < centerBValue.length; j++) {
                if (b === centerBValue[j]) return false
            }
            return true
        })
        const centerB = centerBValue.filter((b, i) => check[i])
        centerB.forEach(b => {
            switch (b) {
                case 0: s.push("薄い"); break
                case 1: s.push("やや薄い"); break
                case 2: s.push("やや濃い"); break
                default : s.push("濃い"); break
            }
        })
        result[1] = s.join(", ")

        check = []
        const centerCValue = centerBC.map(bc => bc[0])
        check = centerCValue.map((c, i) => {
            for (var j = i + 1; j < centerCValue.length; j++) {
                if (c === centerCValue[j]) return false
            }
            return true
        })
        const centerC = centerCValue.filter((c, i) => check[i])
        centerC.forEach(c => {
            switch (c) {
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