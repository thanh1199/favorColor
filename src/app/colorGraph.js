
import Wheel from '@uiw/react-color-wheel';
import Sketch from '@uiw/react-color-sketch';
import style from "../style.module.scss";
import { useSelector } from 'react-redux';
import { selectIndex } from '../features/indexSlice';
import { selectHistory } from '../features/historySlice';
import { rgb2hsv, rgb2Hex } from '../calc/changeFunc';

function WheelColor() {
    const index = useSelector(selectIndex)
    const history = useSelector(selectHistory)
    const rgb = history[index].value
    
    const hsv = rgb2hsv(rgb)
    //h:0~360 red-blue-green, s:0~100 nhat-dam, v:0~100 toi-sang, a:...
    const hsva = {h: hsv[0], s: hsv[1], v: 100, a: 1}
    return (
        <div className={style.colorWheel}>
            <div className={style.nameA}>&#127312;</div>
            <div className={style.colorSlice} style={{"rotate": `${hsv[0]}deg`}}></div>
            <Wheel color={hsva} />
        </div>
    );
}
//-----------------------

function SketchColor() {
    const index = useSelector(selectIndex)
    const history = useSelector(selectHistory)
    const rgb = history[index].value
    const hex = rgb2Hex(rgb)

    const hsv = rgb2hsv(rgb)
    const left = hsv[1] * 1.98 + 3
    const top = 150 - (hsv[2] / 100 * 150) + 10
    return (
        <div className={style.colorSketch}>
            <div className={style.lineB} style={{"left": `${left + 7}px`}}></div>
            <div className={style.lineC} style={{"top": `${top}px`}}></div>
            <div className={style.nameB}>&#127313;</div>
            <div className={style.nameC}>&#127314;</div>
            <div className={style._0_1}>0</div>
            <div className={style._0_2}>0</div>
            <div className={style._100}>100</div>
            <Sketch
                style={{ marginLeft: 0 }}
                color={hex}
            />
        </div>
    );
}


export { WheelColor, SketchColor } 