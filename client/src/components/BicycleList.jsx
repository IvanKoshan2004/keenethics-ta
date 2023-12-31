import { useEffect } from "react";
import { useBicycleContext } from "../context/BicycleContext";
import styles from "./BicycleList.module.css";
import BicycleListItem from "./BicycleListItem";
import { API_BASE_URL } from "../constants";
import { useBicycleStatsContext } from "../context/BicycleStatsContext";

function BicycleList() {
    const { bicycles, dispatch, isLoading, isLoadingError } = useBicycleContext();
    const { fetchStats } = useBicycleStatsContext();
    const statusOrder = ["available", "busy", "unavailable"];
    const orderedBicycles = [...bicycles].sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    useEffect(() => {
        const fetchBicycles = async () => {
            try {
                dispatch({ type: "bicycles/loading" });
                const res = await fetch(`${API_BASE_URL}/bicycle`);
                const { success, data } = await res.json();
                if (!success) {
                    throw Error();
                }
                dispatch({ type: "bicycles/loaded", payload: { bicycles: data.bicycles } });
                fetchStats();
            } catch (err) {
                dispatch({ type: "bicycles/loadingFailed" });
            }
        };
        fetchBicycles();
    }, [dispatch, fetchStats]);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isLoadingError && <p>Error happened while loading the bicycles</p>}
            {!isLoadingError && !isLoading && (
                <div className={styles.container}>
                    {orderedBicycles.map((bicycle) => (
                        <BicycleListItem key={bicycle._id} bicycle={bicycle} />
                    ))}
                </div>
            )}
        </>
    );
}

export default BicycleList;
