import { useBicycleStatsContext } from "../context/BicycleStatsContext";
import styles from "./BicycleStats.module.css";

function BicycleStats() {
    const { totalBikes, availableBikes, bookedBikes, averageBikeCost } = useBicycleStatsContext();
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
