import styles from "./styles.module.css";
import { useEffect } from "react";
import plus from "../../images/plus.svg";
import minus from "../../images/minus.svg";

function TreeItem({
    id,
    name,
    parent,
    childrens,
    isOpened,
    isChanged,
    active,
    onc,
    oncV,
}) {
    childrens = childrens || [];
    return (
        <div className={styles.TreeItem}>
            {parent === null ? (
                <></>
            ) : (
                <div className={styles.HorizontalLineContainer}>
                    <span className={styles.HorizontalLine}></span>
                </div>
            )}
            <div className={styles.CircleValueLine}>
                <div className={styles.CircleValue}>
                    <span className={styles.Circle} onClick={() => onc(id)}>
                        {childrens.length === 0 ? (
                            ""
                        ) : isOpened ? (
                            <img src={minus} />
                        ) : (
                            <img src={plus} />
                        )}
                    </span>
                    <p
                        className={styles.Value}
                        style={active === id ? { color: "#965EEB" } : {}}
                        onClick={() => oncV(id)}
                    >
                        <span className={styles.IdColor}>{id.toString()}</span>
                        {" - " + name}
                    </p>
                </div>
                {childrens.length === 0 || !isOpened ? (
                    <></>
                ) : (
                    <div className={styles.Childrens}>
                        <div className={styles.VerticalLine}></div>
                        <div className={styles.ChildrensList}>
                            {childrens.map((child) => (
                                <TreeItem
                                    id={child.id}
                                    name={child.name}
                                    childrens={child.childrens}
                                    parent={{
                                        id: id,
                                        parent: parent,
                                        name: name,
                                    }}
                                    isOpened={child.isOpened}
                                    isChanged={child.isChanged}
                                    active={active}
                                    onc={onc}
                                    oncV={oncV}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TreeItem;
