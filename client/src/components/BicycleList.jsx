import { useEffect } from "react";
import { useBicycleContext } from "../context/BicycleContext";
import styles from "./BicycleList.module.css";
import BicycleListItem from "./BicycleListItem";
import { API_BASE_URL } from "../constants";

function BicycleList() {
    const { bicycles, dispatch } = useBicycleContext();
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
            } catch (err) {
                dispatch({ type: "bicycles/loadingFailed" });
            }
        };
        fetchBicycles();
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {orderedBicycles.map((bicycle) => (
                <BicycleListItem key={bicycle._id} bicycle={bicycle} />
            ))}
        </div>
    );
}

export default BicycleList;
