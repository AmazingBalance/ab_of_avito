import styles from "./styles.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../button/Button";

function Popup({ popup, closePopup }) {
    const [matrices, setMatrices] = useState([
        { name: "baseline1.sql", id: uuidv4() },
        { name: "baseline2.sql", id: uuidv4() },
        { name: "baseline3.sql", id: uuidv4() },
    ]);

    return (
        <div className={styles.PopupContainer}>
            <div className={styles.Popup}>
                <div className={styles.ClosePopupButton} onClick={closePopup}>
                    ✕
                </div>
                {
                    [
                        <>
                            <h1 className={styles.PopupTitle}>
                                Открытие матрицы
                            </h1>
                            <label>Название матрицы</label>
                            <select>
                                {matrices.map((matrix) => (
                                    <option value={matrix.id}>
                                        {matrix.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                text="Открыть"
                                color="white"
                                backgroundColor="#5F5F5F"
                            />
                        </>,
                        <>
                            <h1 className={styles.PopupTitle}>
                                Создание матрицы
                            </h1>
                            <label>Название матрицы</label>
                            <input type="text"></input>
                            <label>Основа для матрицы</label>
                            <select>
                                <option value="someOption">
                                    Пустая матрица
                                </option>
                                <option value="otherOption">
                                    Other option
                                </option>
                            </select>
                        </>,
                    ][popup]
                }
            </div>
        </div>
    );
}

export default Popup;
