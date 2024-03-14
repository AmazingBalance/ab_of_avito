import styles from "./styles.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../button/Button";

function Popup({ popup, closePopup, openMatrix, createMatrix }) {
    const [matrices, setMatrices] = useState([
        { name: "baseline1_matrix.sql", id: uuidv4(), type: "baseline" },
        { name: "baseline2_matrix.sql", id: uuidv4(), type: "baseline" },
        { name: "disqount1_matrix.sql", id: uuidv4(), type: "disqount" },
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
                            <select id="matrixName">
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
                                onc={() => {
                                    let select1 = document.getElementById("matrixName");
                                    //let select2 = document.getElementById("matrixType");
                                    openMatrix({ name: select1.options[select1.selectedIndex].text, id: select1.value });
                                    closePopup()
                                }}
                            />
                        </>,
                        <>
                            <h1 className={styles.PopupTitle}>
                                Создание матрицы
                            </h1>
                            <label>Название матрицы</label>
                            <input type="text" id="matrixName1"></input>
                            <label>Основа для матрицы</label>
                            <select id="matrixOption">
                                <option value={0}>
                                    Пустая матрица
                                </option>
                                {matrices.map((matrix) => (
                                    <option value={matrix}>
                                        {matrix.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                text="Создать"
                                color="white"
                                backgroundColor="#5F5F5F"
                                onc={() => {
                                    let input = document.getElementById("matrixName1");
                                    let select2 = document.getElementById("matrixOption");
                                    createMatrix({ name: input.value, id: uuidv4(), id_option: select2.value.id, type: select2.value.type });
                                    closePopup()
                                }}
                            />
                        </>,
                        <>
                            <h1 className={styles.PopupTitle}>
                                Отправка Storage
                        </h1>
                            <label>Основная матрица</label>
                            <select id="baselineSelect">
                                {matrices.map((matrix) => (matrix.type === "baseline" ?
                                    <option value={matrix}>
                                        {matrix.name}
                                    </option> : <></>
                                ))}
                            </select>
                            <label>Скидочные матрицы</label>
                            {matrices.map((matrix) => (
                                matrix.type === "disqount" ? <div className={styles.Checkbox}><input type="checkbox" id={matrix.id} value={matrix.id} name={matrix.name} /><label>{matrix.name}</label></div>
                                    : <></>
                            ))}
                            <Button
                                text="Отправить"
                                color="white"
                                backgroundColor="#5F5F5F"
                                onc={() => {
                                }}
                            />
                        </>,
                    ][popup]
                }
            </div>
        </div>
    );
}

export default Popup;
