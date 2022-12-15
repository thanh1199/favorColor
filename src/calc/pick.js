
import { hsv2rgb } from '../calc/changeFunc';
import { dictA, dictBC } from '../calc/dict';

function pick (hsv = {h: [-1], s: [-1], v: [-1]}) {
  const A = dictA()
  const BC = dictBC()
  const HSV = [0, 0, 0]
  var check = {h: false, s: false, v: false}
  if (hsv.h[0] === -1) hsv.h = [0,1,2,3,4,5,6,7,8,9,10]
  if (hsv.s[0] === -1) hsv.s = [0,1,2,3]
  if (hsv.v[0] === -1) hsv.v = [0,1,2,3]

  const hArea = hsv.h.map(h => {
    const area = []
    A.forEach(a => {
      if (h === a.id) area.push(a.value)
    })
    return [...area]
  })
  var hNum = []
  hArea.forEach(h => {
    h.forEach(num => hNum = [...hNum, ...num])
  })
  const hMax = Math.max(...hNum)
  const hMin = Math.min(...hNum)
  const deltaH = hMax - hMin + 1
  while (!check.h) {
    HSV[0] = Math.floor(Math.random() * deltaH) + hMin
    hArea.forEach(h => {
      h.forEach(num => {
        if (HSV[0] >= num[0] && HSV[0] <= num[1]) check.h = true
      })
    })
  }

  const sArea = hsv.s.map(s => BC[0][s].B)
  var sNum = []
  sArea.forEach(s => sNum = [...sNum, ...s])
  const sMax = Math.max(...sNum)
  const sMin = Math.min(...sNum)
  const deltaS = sMax - sMin + 1
  while (!check.s) {
    HSV[1] = Math.floor(Math.random() * deltaS) + sMin
    sArea.forEach(s => {
      if (HSV[1] >= s[0] && HSV[1] <= s[1]) check.s = true
    })
  }

  const vArea = hsv.v.map(v => BC[v][0].C)
  var vNum = []
  vArea.forEach(v => vNum = [...vNum, ...v])
  const vMax = Math.max(...vNum)
  const vMin = Math.min(...vNum)
  const deltaV = vMax - vMin + 1
  while (!check.v) {
    HSV[2] = Math.floor(Math.random() * deltaV) + vMin
    vArea.forEach(v => {
      if (HSV[2] >= v[0] && HSV[2] <= v[1]) check.v = true
    })
  }

  return hsv2rgb(HSV)
}

export default pick