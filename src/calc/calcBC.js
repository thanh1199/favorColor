
import { rgb2hsv } from "./changeFunc"

function indexB (s) {
    if (s < 13) {return 0}
    if (s < 43) {return 1}
    if (s < 73) {return 2}
    return 3
}
function indexC (v) {
    if (v > 73) {return 0}
    if (v > 46) {return 1}
    if (v > 19) {return 2}
    return 3
}

function calcBC ( liked = [
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1]
] ) {
    const opacity = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    liked.forEach((color, i) => {
        const hsv = color[0] >= 0 ? rgb2hsv(color) : false
        const weight = Math.round((5 - i) / 15 * 100) / 100
        if (hsv) {
            const c = indexC(hsv[2])
            const b = indexB(hsv[1])
            opacity[c][b] +=  weight
        }
    })
    const opacityB = [0, 0, 0, 0]
    const opacityC = [0, 0, 0, 0]
    opacity.forEach((bc, i) => {
        bc.forEach((b, j) => {
            opacityB[j] += b
            opacityC[i] += b
        })
    })
    const neighbor = [[1], [0, 2], [1, 3], [2]]
    const centerB = []
    opacityB.forEach((b, i) => {
        if (b > 0.3) centerB.push({id: i, neighbor: neighbor[i]})
    }) 
    const centerC = []
    opacityC.forEach((c, i) => {
        if (c > 0.3) centerC.push({id: i, neighbor: neighbor[i]})
    })
    if (liked[2][0] < 0) return {
        opacity: [...opacity],
        centerB: [],
        centerC: []
    }
    return {
        opacity: [...opacity],
        centerB: centerB,
        centerC: centerC
    }
}

export default calcBC