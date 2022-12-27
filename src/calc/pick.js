
import { hsv2rgb } from '../calc/changeFunc';
import { dictA, dictBC } from '../calc/dict';

function pick (hsv = {h: [-1], s: [-1], v: [-1]}) {
  const A = dictA()
  const BC = dictBC()
  const HSV = [0, 0, 0]
  if (hsv.h[0] === -1) hsv.h = [0,1,2,3,4,5,6,7,8,9,10]
  if (hsv.s[0] === -1) hsv.s = [0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3]
  if (hsv.v[0] === -1) hsv.v = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3]

  if (hsv.s.length !== hsv.v.length) {
    console.log("!!! ERROR s-v in pick file")
    var i
    if (hsv.s.length > hsv.v.length) {
      for (i = 0; i < hsv.s.length - hsv.v.length; i++) hsv.v.push(0)
    }
    if (hsv.v.length > hsv.s.length) {
      for (i = 0; i < hsv.v.length - hsv.s.length; i++) hsv.s.push(0)
    }
  }

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
  const checkH = [false]
  while (!checkH[0]) {
    HSV[0] = Math.floor(Math.random() * deltaH) + hMin
    hArea.forEach(h => {
      h.forEach(num => {
        if (HSV[0] >= num[0] && HSV[0] <= num[1]) checkH[0] = true
      })
    })
  }


  const index = Math.floor(Math.random() * hsv.s.length)
  const s = hsv.s[index]
  const v = hsv.v[index]

  const sArea = BC[0][s].B
  const deltaS = sArea[1] - sArea[0] + 1
  HSV[1] = Math.floor(Math.random() * deltaS) + sArea[0]

  const vArea = BC[v][0].C
  const deltaV = vArea[1] - vArea[0] + 1
  HSV[2] = Math.floor(Math.random() * deltaV) + vArea[0]

  return hsv2rgb(HSV)
}

export default pick