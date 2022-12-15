
import { rgb2hsv, rgb2Hex } from "./changeFunc"

function calcPosition (liked = [[-1, -1, -1]]) {
    const radian = Math.PI / 180
    const points = liked.filter((c) => c[0] >= 0)
    const hsvArr = points.map((p) => rgb2hsv(p))
    const onA = hsvArr.map((hsv) => {
        var x, y
        if (hsv[0] > 0 && hsv[0] < 90) {
            x = 15 - 15 * hsv[1] / 100 * Math.cos(hsv[0] * radian)
            y = 15 - 15 * hsv[1] / 100 * Math.sin(hsv[0] * radian)
        }
        if (hsv[0] > 90 && hsv[0] < 180) {
            x = 15 + 15 * hsv[1] / 100 * Math.cos((180 - hsv[0]) * radian)
            y = 15 - 15 * hsv[1] / 100 * Math.sin((180 - hsv[0]) * radian)
        }
        if (hsv[0] > 180 && hsv[0] < 270) {
            x = 15 + 15 * hsv[1] / 100 * Math.cos((hsv[0] - 180) * radian)
            y = 15 + 15 * hsv[1] / 100 * Math.sin((hsv[0] - 180) * radian)
        }
        if (hsv[0] > 270 && hsv[0] < 360) {
            x = 15 - 15 * hsv[1] / 100 * Math.cos((360 - hsv[0]) * radian)
            y = 15 + 15 * hsv[1] / 100 * Math.sin((360 - hsv[0]) * radian)
        }
        if (hsv[0] === 0 || hsv[0] === 360) {x = 15 - 15 * hsv[1] / 100; y = 15}
        if (hsv[0] === 90) {x = 15; y = 15 - 15 * hsv[1] / 100}
        if (hsv[0] === 180) {x = 15 + 15 * hsv[1] / 100; y = 15}
        if (hsv[0] === 270) {x = 15; y = 15 + 15 * hsv[1] / 100}
        return [x, y]
    })
    const onBC = hsvArr.map((hsv) => {
        const x = 30 * hsv[1] / 100
        const y = 30 * (100 - hsv[2]) / 100
        return [x, y]
    })
    const hex = points.map((p) => rgb2Hex(p))
    return {
        onA: [...onA],
        onBC: [...onBC],
        hex: [...hex],
    }
}

export default calcPosition