
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
function calcNeighbor (c, b) {
    const result = []
    if (c - 1 >= 0 && b - 1 >= 0) result.push([c - 1, b - 1]) 
    if (c - 1 >= 0) result.push([c - 1, b]) 
    if (c - 1 >= 0 && b + 1 <= 3) result.push([c - 1, b + 1]) 
    if (b - 1 >= 0) result.push([c, b - 1]) 
    if (c + 1 <= 3 && b - 1 >= 0) result.push([c + 1, b - 1]) 
    if (c + 1 <= 3) result.push([c + 1, b]) 
    if (c + 1 <= 3 && b + 1 <= 3) result.push([c + 1, b + 1]) 
    if (b + 1 <= 3) result.push([c, b + 1]) 
    return [...result]
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
    const center = []
    const neighbor = []
    opacity.forEach((c, i) => {
        c.forEach((b, j) => {
            if (b > 0.1) center.push([i, j])
            if (b > 0.2) center.push([i, j])
            if (b > 0.3) {
                center.push([i, j])
                calcNeighbor(i, j).forEach(nei => neighbor.push(nei))
            }
        })
    })
    const outsideValue = neighbor.filter(nei => {
        var yes = true
        center.forEach(cen => {
            if (cen[0] === nei[0] && cen[1] === nei[1]) yes = false
        })
        return yes
    })
    if (outsideValue.length === 0) {
        const subOutsideValue = []
        center.forEach(cen => {
            calcNeighbor(cen[0], cen[1]).forEach(nei => subOutsideValue.push(nei))
        })
        subOutsideValue.filter(nei => {
            var yes = true
            center.forEach(cen => {
                if (cen[0] === nei[0] && cen[1] === nei[1]) yes = false
            })
            return yes
        }).forEach(nei => outsideValue.push(nei))
    }

    const check = []
    outsideValue.forEach((o, i) => {
        check.push(true)
        for (var j = i + 1; j < outsideValue.length - 1; j++) {
            if (o[0] === outsideValue[j][0] && o[1] === outsideValue[j][1]) check[i] = false
        }
    })
    const outside = outsideValue.filter((o, i) => check[i])
    return {
        opacity: [...opacity],
        center: [...center],
        outside: [...outside]
    }
}

export default calcBC