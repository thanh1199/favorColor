
import style from "../style.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { addToHistory, changeLike, selectHistory } from "../features/historySlice";
import { selectNextColor, toNextColor, updateNextColor } from "../features/nextColorSlice";
import { inIndex, deIndex, selectIndex } from "../features/indexSlice";
import { toLike, toDislike, selectLike } from "../features/likeSlice";
import { selectNextColorRule, updateNextColorRule } from "../features/nextColorRuleSlice";
import { setNoLike, selectNoLike } from "../features/noLikeSlice";
import useKeypress from 'react-use-keypress';

function Top () {
    const index = useSelector(selectIndex)
    const history = useSelector(selectHistory)
    const nextColor = useSelector(selectNextColor)
    const likedColors = useSelector(selectLike)
    const nextColorRule = useSelector(selectNextColorRule)
    const noLike = useSelector(selectNoLike)
    const dispatch = useDispatch()
    const r = history[index].value[0]
    const g = history[index].value[1]
    const b = history[index].value[2]

    const toNext = () => {
        if (index === history.length -1) {
            dispatch(addToHistory({value: nextColor[0], like: false}))
            dispatch(setNoLike(noLike + 1))
            if (noLike === 15) {
                dispatch(toNextColor({h: [-1], s: [-1], v: [-1]}))
                dispatch(updateNextColorRule("init"))
                dispatch(updateNextColor("init"))
            } else {
                const subNextColorRule = [...nextColorRule]
                const top = subNextColorRule.shift()
                dispatch(toNextColor(top))
                subNextColorRule.push(top)
                dispatch(updateNextColorRule(subNextColorRule))
            }
        }
        dispatch(inIndex())
    }
    const toPrev = () => {
        dispatch(deIndex())
    }
    const likeThisColor = () => {
        dispatch(changeLike(index))
        if (history[index].like) {
            const remove = history[index].value
            const exist = likedColors.find(c => 
                c[0] === remove[0] && 
                c[1] === remove[1] && 
                c[2] === remove[2]
            )
            if (exist) {
                const otherLiked = history.filter(c => {
                    var yes = true
                    if (c.like) {
                        const c1 = c.value
                        likedColors.forEach((c2) => {
                            if (
                                c1[0] === c2[0] && 
                                c1[1] === c2[1] && 
                                c1[2] === c2[2]
                            ) {yes = false}
                        })
                    } else yes = false 
                    return yes
                })
                const lastOtherLiked = otherLiked.length !== 0 ? otherLiked.pop().value : [-1, -1, -1]
                dispatch(toDislike([remove, lastOtherLiked])) 
            }
        } else {
            dispatch(toLike(history[index].value))
            dispatch(setNoLike(0))
        }
    }
    useKeypress(" " ,() => {
        likeThisColor()
    })
    useKeypress("ArrowLeft" ,() => {
        toPrev()
    })
    useKeypress("ArrowRight" ,() => {
        toNext()
    })
    return (
        <div className={style.top}>
            <div className={style.colorCard} style={{"backgroundImage": `linear-gradient(to bottom right, white -200%, rgb(${r}, ${g}, ${b}), black 200%)`}}><span>{index+1}</span></div>
            <div 
                className={style.left} 
                onClick = {() => toPrev()}
            >
                &#8810;
            </div>
            <div 
                className = {style.like} 
                onClick = {() => likeThisColor()}
            >{ history[index].like 
                ? <>&#9829;</>
                : <>&#9825;</>
            }</div>
            <div 
                className={style.right}
                onClick = {() => toNext()}
            >
                &#8811;
            </div>
        </div>
    )
}

export default Top