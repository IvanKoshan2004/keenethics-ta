import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import { useBicycleContext } from "../context/BicycleContext";
import CrossIcon from "../ui/icons/CrossIcon";
import styles from "./BicycleListItem.module.css";
import Selection from "../ui/Selection";
import { useBicycleStatsContext } from "../context/BicycleStatsContext";

function BicycleListItem({ bicycle }) {
    const { _id, id, name, type, color, price, status: loadedBicycleStatus } = bicycle;
    const { currentBicycle, dispatch } = useBicycleContext();
    const { fetchStats } = useBicycleStatsContext();
    const [status, setStatus] = useState(loadedBicycleStatus);
    const halfOpacityClass = status === "unavailable" ? "halfOpacity" : "";
    useEffect(() => {
        setStatus(loadedBicycleStatus);
    }, [loadedBicycleStatus]);
    function handleClick(e) {
        if (currentBicycle && currentBicycle._id === _id) {
            dispatch({ type: "bicycles/deselected" });
        } else {
            dispatch({ type: "bicycles/selected", payload: { id: _id } });
        }
    }
    function handleDelete(e) {
        e.stopPropagation();
        const deleteBicycle = async () => {
            try {
                dispatch({ type: "bicycles/deleting" });
                const res = await fetch(`${API_BASE_URL}/bicycle/${_id}`, {
                    method: "DELETE",
                });
                const { success, data } = await res.json();
                if (!success) {
                    throw Error();
                }
                dispatch({ type: "bicycles/deleted", payload: { id: data.bicycle._id } });
                fetchStats();
            } catch (err) {
                dispatch({ type: "bicycles/deletionFailed" });
            }
        };
        deleteBicycle();
    }
    function handleChangeStatus(e, value) {
        e.stopPropagation();
        const changeStatus = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/bicycle/${_id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ status: value }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const { success, data } = await res.json();
                if (!success) {
                    throw Error();
                }
                dispatch({ type: "bicycles/statusChanged", payload: { id: _id, status: data.bicycle.status } });
                dispatch({ type: "bicycles/selected", payload: { id: _id } });
                setStatus(value);
                fetchStats();
            } catch (err) {}
        };
        changeStatus();
    }
    return (
        <div
            className={`${styles.bicycleContainer} ${
                status === "unavailable"
                    ? "unavailableBicycle"
                    : status === "available"
                    ? "availableBicycle"
                    : status === "busy"
                    ? "busyBicycle"
                    : ""
            } ${currentBicycle && currentBicycle._id === _id ? "selectedBicycle" : ""}`}
            onClick={handleClick}
        >
            <div className={styles.bicycleContainerLeftColumn}>
                <p className={halfOpacityClass}>
                    <span className={styles.bicycleName}>{name}</span> - {type} ({color})
                </p>
                <p className={`${styles.bicycleId} ${halfOpacityClass}`}>ID: {id}</p>
                <div className={`${styles.bicycleStatusContainer}`}>
                    <p>STATUS:</p>
                    <Selection
                        isOpen={true}
                        onChange={handleChangeStatus}
                        onClick={() => dispatch({ type: "bicycles/selected", payload: { id: _id } })}
                        options={[
                            { option: "Available", value: "available" },
                            { option: "Busy", value: "busy" },
                            { option: "Unavailable", value: "unavailable" },
                        ]}
                        value={status}
                    />
                </div>
            </div>
            <div className={`${styles.bicycleContainerRightColumn} ${halfOpacityClass}`}>
                <span onClick={handleDelete}>
                    <CrossIcon />
                </span>
                <p className={styles.bicyclePrice}>{price.toFixed(2)} UAH/hr.</p>
            </div>
        </div>
    );
}

export default BicycleListItem;
