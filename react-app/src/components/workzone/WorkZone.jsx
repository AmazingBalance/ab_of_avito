import styles from "./styles.module.css";

import Button from "../button/Button";

function WorkZone({ text, color, borderColor, backgroundColor, onc }) {
    return (
        <div className={styles.WorkZoneMain}>
            <div className={styles.SearchPair}>
                <input
                    type="text"
                    id="SearchPairLocation"
                    placeholder="Локация"
                ></input>
                <input
                    type="text"
                    id="SearchPairCategory"
                    placeholder="Категория"
                ></input>
                <button>Найти</button>
            </div>
            <div>
                <Button
                    text="Локации"
                    color="white"
                    borderColor=""
                    backgroundColor="#965EEB"
                    onc={() => {}}
                />
                <Button
                    text="Категории"
                    color="#5f5f5f"
                    borderColor="#965EEB"
                    backgroundColor="white"
                    onc={() => {}}
                />
            </div>
        </div>
    );
}

export default WorkZone;
