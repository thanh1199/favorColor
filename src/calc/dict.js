
function dictA () {
    return [
        {
            id: 0,
            name: "red",
            value: [0, 15],
            weight: 0
        },
        {
            id: 0,
            name: "red",
            value: [341, 360],
            weight: 0
        },
        {
            id: 1,
            name: "orange",
            value: [16, 40],
            weight: 0
        },
        {
            id: 2,
            name: "yellow",
            value: [41, 65],
            weight: 0
        },
        {
            id: 3,
            name: "young_green",
            value: [66, 90],
            weight: 0
        },
        {
            id: 4,
            name: "green",
            value: [91, 165],
            weight: 0
        },
        {
            id: 5,
            name: "cyan",
            value: [166, 190],
            weight: 0
        },
        {
            id: 6,
            name: "young_blue",
            value: [191, 210],
            weight: 0
        },
        {
            id: 7,
            name: "blue",
            value: [211, 260],
            weight: 0
        },
        {
            id: 8,
            name: "violet",
            value: [261, 285],
            weight: 0
        },
        {
            id: 9,
            name: "pink",
            value: [286, 325],
            weight: 0
        },
        {
            id: 10,
            name: "old_pink",
            value: [326, 340],
            weight: 0
        }
    ]
}

function dictBC () {
    const B = [[0, 12], [13, 42], [43, 72], [73, 100]]
    const C = [[74, 100], [47, 73], [20, 46], [0, 19]]
    return [
        [{B: B[0], C: C[0]}, {B: B[1], C: C[0]}, {B: B[2], C: C[0]}, {B: B[3], C: C[0]}],
        [{B: B[0], C: C[1]}, {B: B[1], C: C[1]}, {B: B[2], C: C[1]}, {B: B[3], C: C[1]}],
        [{B: B[0], C: C[2]}, {B: B[1], C: C[2]}, {B: B[2], C: C[2]}, {B: B[3], C: C[2]}],
        [{B: B[0], C: C[3]}, {B: B[1], C: C[3]}, {B: B[2], C: C[3]}, {B: B[3], C: C[3]}]
    ]
}
export { dictA, dictBC }