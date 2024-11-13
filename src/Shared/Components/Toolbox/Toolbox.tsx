import { COLORS } from '@/Shared/Constants';
import styles from './Toolbox.module.css'
import classes from "classnames";

const Toolbox = () => {
  return (<div className={styles.toolboxContainer}>
     <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
            <div className={classes(styles.colorBox)} style={{backgroundColor: COLORS.BLACK}}/>
            <div className={classes(styles.colorBox)} style={{backgroundColor: COLORS.RED}} />
            <div className={classes(styles.colorBox)} style={{backgroundColor: COLORS.GREEN}}/>
            <div className={classes(styles.colorBox)} style={{backgroundColor: COLORS.BLUE}}/>
            <div className={classes(styles.colorBox)} style={{backgroundColor: COLORS.ORANGE}}/>
            <div className={classes(styles.colorBox)} style={{backgroundColor: COLORS.YELLOW}} />
        </div>
    </div>
    <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush Size</h4>
        <div className={styles.itemContainer}>
            <input type="range" min={1} max={10} step={1}/>
        </div>
    </div>
</div>)

}

export default Toolbox