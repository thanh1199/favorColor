
function solveCenter (center) {
    const area = []
    var neighborArr = []
    center.forEach(c => {
        area.push(c.id)
        neighborArr = [...neighborArr, ...c.neighbor]
    })
    var outsideValue = neighborArr.filter(n => ! area.find(a => a=== n))
    const check = []
    outsideValue.forEach((o, i) => {
        check.push(true)
        for (var j = i + 1; j < outsideValue.length - 1; j++) {
            if (o === outsideValue[j]) check[i] = false
        }
    })
    const outside = outsideValue.filter((o, i) => check[i])
    return {area: [...area], outside: [...outside]}
}

const nextColorArr = [
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]},
    {h: [-1], s: [-1], v: [-1]}
]
function calcRule (centerA = [], centerB = [], centerC = []) {
    var i
    if (centerA.length !== 0) {
        const h = solveCenter(centerA)
        for (i = 0; i < 11; i++) nextColorArr[i].h = [...h.area]
        for (i = 11; i < 15; i++) nextColorArr[i].h = [...h.outside]
    }
    if (centerB.length !== 0) {
        const s = solveCenter(centerB)
        for (i = 0; i < 7; i++) nextColorArr[i].s = [...s.area]
        for (i = 11; i < 15; i++) nextColorArr[i].s = [...s.area]
        for (i = 7; i < 11; i++) nextColorArr[i].s = [...s.outside]
    }
    if (centerC.length !== 0) {
        const v = solveCenter(centerC)
        for (i = 0; i < 3; i++) nextColorArr[i].v = [...v.area]
        for (i = 7; i < 15; i++) nextColorArr[i].v = [...v.area]
        for (i = 3; i < 7; i++) nextColorArr[i].v = [...v.outside]
    }
    return [...nextColorArr]
}

export default calcRule