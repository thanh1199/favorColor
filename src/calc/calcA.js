
import { rgb2hsv } from "./changeFunc";
import { dictA } from "./dict";

function calcA ( liked = [
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1], 
    [-1, -1, -1]
] ) {
    const dict = dictA()
    if (liked[2][0] < 0) {
        return {
            opacity: [],
            center: []
        }
    }
    const h5 = {value: Math.round(rgb2hsv(liked[0])[0]), weight: 5}
    const h4 = {value: Math.round(rgb2hsv(liked[1])[0]), weight: 4}
    const h3 = {value: Math.round(rgb2hsv(liked[2])[0]), weight: 3}
    const h2 = {value: Math.round(rgb2hsv(liked[3])[0]), weight: 2}
    const h1 = {value: Math.round(rgb2hsv(liked[4])[0]), weight: 1}
    const hueArr = [h5, h4, h3, h2, h1]
    const num = hueArr.length
    var bestArc = 360
    var subHueArr = hueArr.map((h) => h.value)
    for (var i=0; i<num; i++) {
        const minBefore = Math.min(...subHueArr)
        subHueArr.forEach((hue, i) => {
            if (hue === minBefore) subHueArr[i] += 360
        })
        const minAfter = Math.min(...subHueArr)
        const max = Math.max(...subHueArr)
        const arc = max - minAfter
        bestArc = bestArc > arc ? arc : bestArc
    }
    if (bestArc > 180) {
        return {
            opacity: [],
            center: []
        }
    }
    dict.forEach((d) => {
        hueArr.forEach((h) => {
            if (d.value[0] <= h.value && h.value <= d.value[1]) {
                d.weight += h.weight;
            }
        })
    })
    var result = []
    const red = {id: 0, name: "red", value: [[0, 30], [330, 360]], weight: 0}
    if (dict.find(d => d.id === 0 && d.weight !== 0)) {
        dict.forEach(d => {
            if (d.id ===0) red.weight += d.weight
        })
        result = dict.filter(d => d.id !== 0 && d.weight !== 0)
        result = [...result, {...red}]
    } else result = dict.filter(d => d.weight !== 0)

    result = result.map(c => {
        const w = (c.weight / 15).toFixed(3)
        return {...c, weight: w}
    })

    const center = []
    const neighbor = [
        [10, 1], [0, 2], [1, 3], [2, 4],
        [3, 5], [4, 6], [5, 7], [6, 8],
        [7, 9], [8, 10], [9, 0]
    ]
    result.forEach((c) => {
        if (c.weight > 0.3) center.push({id: c.id, neighbor: neighbor[c.id]})
    })
    return {
        opacity: liked[4][0] < 0 ? [] : [...result],
        center: center.length === 0 ? [] : [...center]
    }
}

export default calcA