
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
function calcRule (centerA = [], outsideA = [], centerBC = [], outsideBC = []) {
    var i
    if (centerBC.length > 0) {
        if (centerA.length > 0) {
            for (i = 0; i < 8; i++) nextColorArr[i].h = [...centerA]
            for (i = 8; i < 12; i++) nextColorArr[i].h = [...outsideA]
        }
        for (i = 0; i < 4; i++) {
            nextColorArr[i].s = centerBC.map(out => out[1])
            nextColorArr[i].v = centerBC.map(out => out[0])
        }
        for (i = 4; i < 8; i++) {
            nextColorArr[i].s = outsideBC.map(out => out[1])
            nextColorArr[i].v = outsideBC.map(out => out[0])
        }
        for (i = 8; i < 12; i++) {
            nextColorArr[i].s = [centerBC[0][1]]
            nextColorArr[i].v = [centerBC[0][0]]
        }
    }
    return [...nextColorArr]
}

export default calcRule