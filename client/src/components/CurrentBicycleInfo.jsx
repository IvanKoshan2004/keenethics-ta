import { useBicycleContext } from "../context/BicycleContext";
import styles from "./CurrentBicycleInfo.module.css";

function CurrentBicycleInfo() {
    const { currentBicycle } = useBicycleContext();
    const { id, name, type, status, color, wheelSize, price, description } = currentBicycle;
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.infoHeader}>SELECTED BIKE</h3>
            <p>
                ID: <span className={styles.id}>{id}</span>
            </p>
            <p>
                Name: <span className={styles.name}>{name}</span>
            </p>
            <p>
                Type: <span className={styles.type}>{type}</span>
            </p>
            <p>
                Status: <span className={styles.status}>{status}</span>
            </p>
            <p>
                Color: <span className={styles.color}>{color}</span>
            </p>
            <p>
                Wheel size: <span className={styles.wheelSize}>{wheelSize}</span>
            </p>
            <p>
                Price: <span className={styles.price}>{price}</span>
            </p>
            <p>
                Description: <span className={styles.description}>{description}</span>
            </p>
        </div>
    );
}

export default CurrentBicycleInfo;
