import styles from "./BicycleForm.module.css";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useBicycleContext } from "../context/BicycleContext";
import { API_BASE_URL } from "../constants";
import { useBicycleStatsContext } from "../context/BicycleStatsContext";

function validateStringLength(string, min = 0, max = Infinity) {
    return string.length <= max && string.length >= min;
}
function validateIsPositiveNumber(string) {
    return /^[0-9]+$/.test(string);
}
function validateId(id) {
    console.log(id, /^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}$/.test(id));
    return /^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}$/.test(id);
}
function BicycleForm() {
    const { isSaving, savingErrorMessage, dispatch } = useBicycleContext();
    const { fetchStats } = useBicycleStatsContext();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [wheelSize, setWheelSize] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [isSavingError, setIsSavingError] = useState(false);
    useEffect(() => {
        setIsSavingError(false);
    }, [name, type, color, wheelSize, price, description, dispatch]);

    function handleSave(e) {
        e.preventDefault();
        const fetchBicycles = async () => {
            try {
                dispatch({ type: "bicycles/saving" });
                if (
                    !(
                        validateStringLength(name, 5) &&
                        validateStringLength(type, 5) &&
                        validateStringLength(color, 5) &&
                        validateStringLength(description, 5)
                    )
                ) {
                    throw Error("Invalid input, text fields should be at least 5 charactes long");
                }
                if (!(validateIsPositiveNumber(wheelSize) && validateIsPositiveNumber(price))) {
                    throw Error("Invalid input, number fields should not contain letters");
                }
                if (id !== "" && !validateId(id)) {
                    throw Error("Invalid input, invalid id format");
                }
                const payload = {
                    name,
                    type,
                    color,
                    description,
                    wheelSize,
                    price,
                };
                if (id) {
                    payload["id"] = id;
                }
                const res = await fetch(`${API_BASE_URL}/bicycle`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const { success, data } = await res.json();
                if (!success) {
                    throw Error("Error while saving the bicycle");
                }
                dispatch({ type: "bicycles/saved", payload: { bicycle: data.bicycle } });
                fetchStats();
            } catch (err) {
                dispatch({ type: "bicycles/savingFailed", payload: { message: err.message } });
                setIsSavingError(true);
            }
        };
        fetchBicycles();
    }
    function handleClear(e) {
        e.preventDefault();
        setName("");
        setType("");
        setColor("");
        setWheelSize("");
        setPrice("");
        setId("");
        setDescription("");
        setIsSavingError(false);
    }
    return (
        <form className={`${styles.bicycleForm} ${isSaving && "halfOpacity"}`}>
            <input
                className={styles.formInput}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
            />
            <input
                className={styles.formInput}
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                disabled={isSaving}
            />
            <input
                className={styles.formInput}
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                disabled={isSaving}
            />
            <input
                className={styles.formInput}
                type="number"
                placeholder="Wheel size"
                value={wheelSize}
                onChange={(e) => setWheelSize(e.target.value)}
                disabled={isSaving}
            />
            <input
                className={styles.formInput}
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isSaving}
            />
            <input
                className={styles.formInput}
                type="text"
                placeholder="ID (slug): XXX-XXX"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={isSaving}
            />
            <textarea
                className={`${styles.bicycleDescription} ${styles.formInput}`}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSaving}
            ></textarea>
            <Button onClick={handleSave}>SAVE</Button>
            <Button onClick={handleClear}>CLEAR</Button>
            {isSavingError && <p className={styles.errorMessage}>{savingErrorMessage}</p>}
        </form>
    );
}

export default BicycleForm;
