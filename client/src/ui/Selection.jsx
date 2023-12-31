import { useState } from "react";
import styles from "./Selection.module.css";
import TickIcon from "./icons/TickIcon";

function Selection({ options, value, onChange, onClick }) {
    const [isOpen, setIsOpen] = useState(false);
    async function handleSelect(e, value) {
        e.stopPropagation();
        await onChange(e, value);
        setIsOpen(false);
    }
    function handleClick(e) {
        e.stopPropagation();
        setIsOpen((state) => !state);
        if (onClick) onClick();
    }
    return (
        <div className={styles.selectionContainer} onClick={handleClick}>
            <p className={styles.value}>
                {options.find((el) => el.value === value).option} <TickIcon />
            </p>
            {isOpen && (
                <ul className={styles.selectionList}>
                    {options.map((el) => (
                        <SelectionOption key={el.value} value={el.value} option={el.option} onSelect={handleSelect} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function SelectionOption({ value, option, onSelect }) {
    return (
        <li className={styles.selectionItem} onClick={(e) => onSelect(e, value)}>
            {option}
        </li>
    );
}
export default Selection;
