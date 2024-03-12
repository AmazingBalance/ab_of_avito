import "./style.module.css";

function ActiveMatrixItem({ name, isActive }) {
    return (
        <li
            className={
                isActive
                    ? "ActiveMatrixList_Item .ActiveMatrixList_Item__Active"
                    : "ActiveMatrixList_Item"
            }
        >
            <div>
                <p>{name}</p>
            </div>
            <div>
                <span>✕</span>
            </div>
        </li>
    );
}

export default ActiveMatrixItem;
