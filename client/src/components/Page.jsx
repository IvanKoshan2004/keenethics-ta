import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import styles from "./Page.module.css";

function Page() {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default Page;
