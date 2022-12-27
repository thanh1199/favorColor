
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
            center: [],
            outside: []
        }
    }
    const hueArr = []
    liked.forEach((like, i) => {
        if (like[0] > -1) hueArr.push(
            {value: Math.round(rgb2hsv(like)[0]), weight: 5 - i}
        )
    })
    
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
    const neighbor = []
    const neighborDict = [
        [10, 1], [0, 2], [1, 3], [2, 4],
        [3, 5], [4, 6], [5, 7], [6, 8],
        [7, 9], [8, 10], [9, 0]
    ]
    result.forEach((c) => {
        if (c.weight > 0.1) center.push(c.id)
        if (c.weight > 0.3) {
            neighborDict[c.id].forEach(nei => neighbor.push(nei))
        }
    })
    const outsideValue = neighbor.filter(nei => {
        var yes = true
        center.forEach(cen => {
            if (cen === nei) yes = false 
        })
        return yes
    })
    const check = []
    outsideValue.forEach((o, i) => {
        check.push(true)
        for (var j = i + 1; j < outsideValue.length - 1; j++) {
            if (o === outsideValue[j]) check[i] = false
        }
    })
    const outside = outsideValue.filter((o, i) => check[i])
    if (outside.length === 0) center.forEach(cen => outside.push(cen))
    return {
        opacity: liked[4][0] < 0 || bestArc > 180 ? [] : [...result],
        center: [...center],
        outside: [...outside]
    }
}

export default calcA