import styles from "./Footer.module.css";

function Footer() {
    return (
        <div className={styles.footer}>
            <p className={styles.text}>
                <span className={styles.label}>Developer:</span> <span className={styles.devName}>Ivan Koshan</span>
            </p>
        </div>
    );
}

export default Footer;
