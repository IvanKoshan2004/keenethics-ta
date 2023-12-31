import { useBicycleContext } from "../context/BicycleContext";
import styles from "./BicycleStats.module.css";

function BicycleStats() {
    const { bicycles } = useBicycleContext();
    const totalBikes = bicycles.length;
    const availableBikes = bicycles.filter((el) => el.status === "available").length;
    const bookedBikes = bicycles.filter((el) => el.status === "busy").length;
    const averageBikeCost = bicycles.length !== 0 ? (bicycles.reduce((acc, el) => acc + el.price, 0) / totalBikes).toFixed(2) : 0;
    return (
        <div className={styles.statsContainer}>
            <h3 className={styles.statsHeader}>STATISTICS</h3>
            <p>
                Total Bikes: <span className={styles.averageStatValue}>{totalBikes}</span>
            </p>
            <p>
                Available Bikes: <span className={styles.averageStatValue}>{availableBikes}</span>
            </p>
            <p>
                Booked Bikes: <span className={styles.averageStatValue}>{bookedBikes}</span>
            </p>
            <p>
                Average bike cost: <span className={styles.averageStatValue}>{averageBikeCost}</span> UAH/hr
            </p>
        </div>
    );
}

export default BicycleStats;
