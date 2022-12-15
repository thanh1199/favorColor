
import style from "../style.module.scss";
import { SketchColor, WheelColor } from "./colorGraph";
import { selectNextColor } from "../features/nextColorSlice";
import { selectLike } from "../features/likeSlice";
import { useSelector } from "react-redux";

function Bottom () {
    const likedColors = useSelector(selectLike)
    const nextColor = useSelector(selectNextColor)
    return (
        <div className={style.bottom}>
            <div className={style.line1}>
                <WheelColor />
                <SketchColor />
            </div>
            <div className={style.line2}>{
                likedColors.map((c, i) => {
                    const background = c[0] >= 0 ?
                        {"backgroundColor": `rgb(${c[0]},${c[1]},${c[2]})`} :
                        {"backgroundColor": `rgba(0, 0, 0, 0)`}
                    return <div 
                        key={i}
                        className={style.selectedColor}
                        style = {background}
                    >×{5-i}</div>
                })
            }</div>
            <div className={style.line3}>{
                nextColor.map((c, i) => {
                    return <div 
                        key={i}
                        className={style.waitingColor}
                        style={{"backgroundColor": `rgb(${c[0]},${c[1]},${c[2]})`}}
                    >{i+1}</div>
                })
            }</div>
        </div>
    )
}

export default Bottom