import styles from "./BicycleForm.module.css";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useBicycleContext } from "../context/BicycleContext";
import { API_BASE_URL } from "../constants";

function validateStringLength(string, min = 0, max = Infinity) {
    return string.length <= max && string.length >= min;
}
function validateIsPositiveNumber(string) {
    return /[0-9]+/.test(string);
}
function BicycleForm() {
    const { isSaving, isSavingError, dispatch } = useBicycleContext();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [wheelSize, setWheelSize] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [isValidationError, setIsValidationError] = useState(false);

    useEffect(() => {
        setIsValidationError(false);
    }, [name, type, color, wheelSize, price, description]);

    function handleSave(e) {
        e.preventDefault();
        const fetchBicycles = async () => {
            try {
                dispatch({ type: "bicycles/saving" });
                const isValidated =
                    validateStringLength(name) &&
                    validateStringLength(type) &&
                    validateStringLength(color) &&
                    validateIsPositiveNumber(wheelSize) &&
                    validateIsPositiveNumber(price) &&
                    validateStringLength(description);
                if (!isValidated) {
                    setIsValidationError(true);
                    throw Error();
                }
                const res = await fetch(`${API_BASE_URL}/bicycle`, {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        type,
                        color,
                        description,
                        wheelSize,
                        price,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const { success, data } = await res.json();
                if (!success) {
                    throw Error();
                }
                dispatch({ type: "bicycles/saved", payload: { bicycle: data.bicycle } });
            } catch (err) {
                dispatch({ type: "bicycles/savingFailed" });
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
                placeholder="ID (slug): XXXXXXXXX"
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
            {isValidationError && (
                <p className={styles.validationErrorMessage}>
                    Invalid input, text field should be at least 5 characters long and number fields should not contain text
                </p>
            )}
            {isSavingError && <p className={styles.validationErrorMessage}>Error happened while saving the bicycle</p>}
        </form>
    );
}

export default BicycleForm;
