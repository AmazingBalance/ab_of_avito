import styles from "./styles.module.css";

function Button({ text, color, borderColor, backgroundColor, border, onc }) {
    return (
        <button
            className={styles.Button}
            style={{
                color: color,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
            }}
            onClick={() => onc()}
        >
            {text}
        </button>
    );
}

export default Button;
