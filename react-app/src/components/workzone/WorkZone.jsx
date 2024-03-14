import styles from "./styles.module.css";
import { useState, useReducer, useEffect } from "react";

import Button from "../button/Button";
import TreeItem from "../treeitem/Treeitem";

function WorkZone() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [activeFilterIndex, setActiveFilterIndex] = useState(0);
    const [activeLocationID, setActiveLocation] = useState(-1);
    const [activeCategoryID, setActiveCategory] = useState(-1);
    const [treeLocations, setTreeLocations] = useState({
        id: "1",
        name: "Россия",
        isOpened: true,
        isChanged: false,
        childrens: [
            {
                id: "2",
                name: "Ивановская область",
                isOpened: true,
                isChanged: false,
                childrens: [
                    {
                        id: "3",
                        name: "Кинешма",
                        isOpened: false,
                        isChanged: false,
                    },
                    {
                        id: "4",
                        name: "Родники",
                        isOpened: false,
                        isChanged: false,
                    },
                    {
                        id: "5",
                        name: "Заволжск",
                        isOpened: false,
                        isChanged: false,
                    },
                ],
            },
            {
                id: "6",
                name: "Московская область",
                isOpened: false,
                isChanged: false,
                childrens: [
                    {
                        id: "7",
                        name: "Москва",
                        isOpened: false,
                        isChanged: false,
                        childrens: [
                            {
                                id: "13",
                                name: "Химки",
                                isOpened: false,
                                isChanged: false,
                            },
                            {
                                id: "14",
                                name: "Садовники",
                                isOpened: false,
                                isChanged: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: "8",
                name: "Мурманская область",
                isOpened: false,
                isChanged: false,
                childrens: [
                    {
                        id: "9",
                        name: "Мурманск",
                        isOpened: false,
                        isChanged: false,
                    },
                ],
            },
        ],
    });

    const [treeCategories, setCategoriesTree] = useState({
        id: "100",
        name: "Пылесосы",
        isOpened: true,
        isChanged: false,
        childrens: [
            {
                id: "101",
                name: "Круглые",
                isOpened: true,
                isChanged: false,
                childrens: [
                    {
                        id: "103",
                        name: "Шероховатые",
                        isOpened: false,
                        isChanged: false,
                    },
                    {
                        id: "102",
                        name: "Гладкие",
                        isOpened: false,
                        isChanged: false,
                    },
                ],
            },
            {
                id: "105",
                name: "Алмазные",
                isOpened: false,
                isChanged: false,
            },
        ],
    });

    function ChangeActiveFilterIndex(ind) {
        if (activeFilterIndex !== ind) {
            setActiveFilterIndex(ind);
            forceUpdate();
        }
    }

    function ChangeActiveCategoryID(id) {
        setActiveCategory(id);
        forceUpdate();
    }

    function ChangeActiveLocationID(id) {
        setActiveLocation(id);
        forceUpdate();
    }

    function ToggleLocationsBranch(id) {
        let d = SearchBranch([treeLocations], id);
        d.isOpened = !d.isOpened;
        forceUpdate();
    }

    function ToggleCategoriesBranch(id) {
        let d = SearchBranch([treeCategories], id);
        d.isOpened = !d.isOpened;
        forceUpdate();
    }

    var tcp = [
        [1, 100, 216],
        [1, 102, 300],
        [3, 100, 100],
        [6, 105, 89],
    ];
    function CheckPrice(locId, catId) {
        for (let i = 0; i < tcp.length; i++) {
            if (catId == tcp[i][0] && locId == tcp[i][1]) {
                console.log(tcp[i][2]);
                return tcp[i][2];
            }
        }
        return -1;
    }

    function SearchBranch(s, id) {
        let t;
        for (let i = 0; i < s.length; i++) {
            if (s[i].id == id) {
                return s[i];
            }
            if (s[i].childrens != null) {
                t = SearchBranch(s[i].childrens, id);
                if (t !== undefined) {
                    return t;
                }
            }
        }
        return t;
    }

    return (
        <div className={styles.WorkZoneMain}>
            <div className={styles.WorkZoneTree}>
                <div className={styles.WorkZoneMain_FilterGroup}>
                    <Button
                        text="Локации"
                        color={activeFilterIndex === 0 ? "white" : "#5f5f5f"}
                        borderColor={activeFilterIndex === 0 ? "" : "#965EEB"}
                        backgroundColor={
                            activeFilterIndex === 0 ? "#965EEB" : "white"
                        }
                        onc={() => {
                            ChangeActiveFilterIndex(0);
                        }}
                    />
                    <Button
                        text="Категории"
                        color={activeFilterIndex === 1 ? "white" : "#5f5f5f"}
                        borderColor={activeFilterIndex === 1 ? "" : "#965EEB"}
                        backgroundColor={
                            activeFilterIndex === 1 ? "#965EEB" : "white"
                        }
                        onc={() => {
                            ChangeActiveFilterIndex(1);
                        }}
                    />
                </div>
                <div className={styles.TreeContainer}>
                    <div className={styles.Tree}>
                        <h2 className={styles.TreeTitle}>
                            {["Локации", "Категории"][activeFilterIndex]}
                        </h2>
                        {
                            [
                                <TreeItem
                                    id={treeLocations.id}
                                    name={treeLocations.name}
                                    parent={null}
                                    childrens={treeLocations.childrens}
                                    isOpened={treeLocations.isOpened}
                                    isChanged={false}
                                    active={activeLocationID}
                                    onc={ToggleLocationsBranch}
                                    oncV={ChangeActiveLocationID}
                                />,
                                <TreeItem
                                    id={treeCategories.id}
                                    name={treeCategories.name}
                                    parent={null}
                                    childrens={treeCategories.childrens}
                                    isOpened={treeCategories.isOpened}
                                    isChanged={false}
                                    active={activeCategoryID}
                                    onc={ToggleCategoriesBranch}
                                    oncV={ChangeActiveCategoryID}
                                />,
                            ][activeFilterIndex]
                        }
                    </div>
                </div>
            </div>
            <div className={styles.InfoBlock}>
                <div className={styles.ActiveTitles}>
                    {activeLocationID === -1 ? (
                        <></>
                    ) : (
                            <h2 className={styles.ActiveTitle}>
                                {activeLocationID} -{" "}
                                {
                                    SearchBranch([treeLocations], activeLocationID)
                                        .name
                                }
                            </h2>
                        )}
                    {activeCategoryID === -1 ? (
                        <></>
                    ) : (
                            <h2 className={styles.ActiveTitle}>
                                {activeCategoryID} -{" "}
                                {
                                    SearchBranch([treeCategories], activeCategoryID)
                                        .name
                                }
                            </h2>
                        )}
                </div>
                <input
                    id="priceInput"
                    type="text"
                    disabled={
                        activeCategoryID === -1 || activeLocationID === -1
                    }
                    placeholder={
                        CheckPrice(activeCategoryID, activeLocationID) !== -1
                            ? CheckPrice(
                                activeCategoryID,
                                activeLocationID
                            ).toString()
                            : "Цена"
                    }
                ></input>
                <Button
                    text="Изменить"
                    color="white"
                    backgroundColor="#5F5F5F"
                    onc={
                        () => {
                            let pi = document.getElementById("priceInput");
                            pi.value = ""
                        }
                    }
                />
            </div>
        </div>
    );
}

export default WorkZone;
