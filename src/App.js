
import Top from "./app/top";
import Bottom from "./app/bottom";
import Result from "./app/result";
// import clsx from 'clsx'
import style from "./style.module.scss";

function App() {
  return (
    <div className={style.container} > 
      <Top />
      <Bottom />
      <Result />
    </div>
  );
}

export default App;
