import styles from "./Header.module.css";
function Header() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ADMIN.BIKE-BOOKING.COM</h1>
        </div>
    );
}

export default Header;
