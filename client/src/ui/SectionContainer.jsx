import styles from "./SectionContainer.module.css";

function SectionContainer({ children, flexGrow, maxWidth, width }) {
    return (
        <div
            style={{ flexGrow: flexGrow || 0, maxWidth: maxWidth || "auto", width: width || "auto" }}
            className={styles.sectionContainer}
        >
            {children}
        </div>
    );
}

export default SectionContainer;
