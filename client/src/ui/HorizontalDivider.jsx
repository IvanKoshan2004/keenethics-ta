import styles from "./HorizontalDivider.module.css";

function HorizontalDivider({ offset }) {
    const width = `calc(100% - ${Math.abs(offset)}px)`;
    const margin = offset > 0 ? `0 0 0 ${offset}px` : `0 ${offset}px 0 0`;
    return <div className={styles.horizontalDivider} style={{ width, margin }}></div>;
}

export default HorizontalDivider;
