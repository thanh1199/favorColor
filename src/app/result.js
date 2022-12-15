
import clsx from 'clsx';
import style from '../style.module.scss';
import calcA from "../calc/calcA";
import calcBC from '../calc/calcBC';
import calcPosition from '../calc/calcPosition';
import { rgb2hsv } from '../calc/changeFunc';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { selectLike } from "../features/likeSlice";
import { selectIndex } from '../features/indexSlice';
import { selectHistory } from '../features/historySlice';
import { selectNextColor, updateNextColor } from '../features/nextColorSlice';
import { updateNextColorRule } from '../features/nextColorRuleSlice';
import { selectLog, updateLog } from '../features/logSlice';
import { selectNoLike } from '../features/noLikeSlice';
import calcRule from '../calc/calcRule';

function Result () {
    const dispatch = useDispatch()
    const likedColors = useSelector(selectLike)
    const nextColor = useSelector(selectNextColor)
    const log = useSelector(selectLog)
    const positionLiked = calcPosition(likedColors)
    const positionNext = calcPosition(nextColor)
    const noLike = useSelector(selectNoLike)
    
    const index = useSelector(selectIndex)
    const history = useSelector(selectHistory)
    const nowColorSlice = rgb2hsv(history[index].value)
    const r = history[index].value[0]
    const g = history[index].value[1]
    const b = history[index].value[2]
    
    const A = calcA(likedColors)
    const opacityA = [0,0,0,0,0,0,0,0,0,0,0]
    A.opacity.forEach(a => opacityA[a.id] = a.weight)
    
    const BC = calcBC(likedColors)
    const opacityBC = BC.opacity
    const childrenBC = []
    opacityBC.forEach((c, i) => {
        var className_
        switch (i) {
            case 0: className_ = clsx(style.filled, " ", style.filledC1); break;
            case 1: className_ = clsx(style.filled, " ", style.filledC2); break;
            case 2: className_ = clsx(style.filled, " ", style.filledC3); break;
            default: className_ = clsx(style.filled, " ", style.filledC4);
        }
        c.forEach((cb, j) => {
            var className
            switch (j) {
                case 0: className = clsx(className_, " ", style.filledB1); break;
                case 1: className = clsx(className_, " ", style.filledB2); break;
                case 2: className = clsx(className_, " ", style.filledB3); break;
                default: className = clsx(className_, " ", style.filledB4);
            }
            childrenBC.push(<div 
                key={`${i}-${j}`}
                style={{"opacity": `${cb}`}} 
                className={className}
            ></div>)
        })
    })
    
    const newRule = JSON.stringify(calcRule(A.center, BC.centerB, BC.centerC))
    useEffect(() => {
        dispatch(updateNextColorRule(JSON.parse(newRule)))
        dispatch(updateNextColor(JSON.parse(newRule)))
    }, [dispatch, newRule])

    const logParameter = JSON.stringify([A.center, BC.centerB, BC.centerC, noLike]) 
    useEffect(() => {
        dispatch(updateLog(JSON.parse(logParameter)))
    }, [dispatch, logParameter])

    return (<div className={style.result}>
        <div className={style.fakeTop}>
            <div 
                className={style.colorCard} 
                style={{"backgroundImage": `linear-gradient(to bottom left, white -200%, rgb(${r}, ${g}, ${b}), black 200%)`}}
            >
                <span>{index+1}</span>
            </div>
            <div className = {style.like} >{ 
                history[index].like 
                ? <>&#9829;</>
                : <>&#9825;</>
            }</div>
        </div>
        {/*show A*/}
        <div className={clsx(style.resultChild, style.showA)}>
            {positionLiked.onA.map((p, i) => {
                return (<div
                    key={i}
                    className={style.point}
                    style={{
                        "left": `${p[0]}vh`, 
                        "top": `${p[1]}vh`, 
                        "color": `${positionLiked.hex[i]}`,
                        "scale": `${1 + (4 - i*2) / 10}`
                    }}
                >&#10026;</div>)
            })}
            {positionNext.onA.map((p, i) => {
                return (<div
                    key={i}
                    className={style.nextPoint}
                    style={{
                        "left": `${p[0]}vh`, 
                        "top": `${p[1]}vh`, 
                        "color": `${positionNext.hex[i]}`
                    }}
                >&#10059;</div>)
            })}
            {nowColorSlice[0] === 0 ?
            <></> :
            <div className={style.colorSlice} style={{"rotate": `${nowColorSlice[0]}deg`}}>
                <div className={style.nowPoint} style={{
                    "backgroundColor": `rgb(${r},${g},${b})`,
                    "left": `calc(15vh - ${nowColorSlice[1]} / 100 * 15vh)`
                }}></div>
            </div>
            }
            <div className={style.circle}>{[
                    "red", "orange", "yellow", "young_green", 
                    "green", "cyan", "young_blue", "blue",
                    "violet", "pink", "old_pink"
                ].map((color, i) => {
                return (<div 
                    key={i}
                    style={{"opacity": `${opacityA[i]}`}} 
                    className={clsx(style.filled, style[color])}
                ></div>)
            })}
            </div>
        </div>
        {/*show B_C*/}
        <div className={style.resultChild}>
        <div className={style.showBC}>
            {positionLiked.onBC.map((p, i) => {
                return (<div
                    key={i}
                    className={style.point}
                    style={{
                        "left": `${p[0]}vh`, 
                        "top": `${p[1]}vh`, 
                        "color": `${positionLiked.hex[i]}`,
                        "scale": `${1 + (4 - i*2) / 10}`
                    }}
                >&#10026;</div>)
            })}
            {positionNext.onBC.map((p, i) => {
                return (<div
                    key={i}
                    className={style.nextPoint}
                    style={{
                        "left": `${p[0]}vh`, 
                        "top": `${p[1]}vh`, 
                        "color": `${positionNext.hex[i]}`
                    }}
                >&#10059;</div>)
            })}
            <div className={style.resultLineB} style={{"left": `${nowColorSlice[1]}%`}}></div>
            <div className={style.resultLineC} style={{"top": `${100 - nowColorSlice[2]}%`}}></div>
            <div className={style.nowPoint} style={{
                "backgroundColor": `rgb(${r},${g},${b})`,
                "top": `${100 - nowColorSlice[2]}%`,
                "left": `${nowColorSlice[1]}%`
            }}></div>
            {childrenBC.map((child) => child)}
        </div>
        </div>
        <div className={style.log}>{log.map((l, i) => {
            return (<p key={i}>
                A: {l[0]}; B: {l[1]}; C: {l[2]}. &#8658; {l[3]}
            </p>)
        })}</div>
    </div>)
}

export default Result