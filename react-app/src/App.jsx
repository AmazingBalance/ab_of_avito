import logo from "./images/logo48.png";
import "./App.css";
import React, { useEffect, useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "./components/button/Button";
import WorkZone from "./components/workzone/WorkZone";
import Popup from "./components/popup/Popup";

function App() {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    //Opened Matrix States
    const [openedMatrixList, setOpenedMatrixList] = useState([
        {
            name: "baseline_matrix_1.sql",
            id: uuidv4(),
            type: "baseline",
            active: false,
        },
        {
            name: "baseline_matrix_2.sql",
            id: uuidv4(),
            type: "baseline",
            active: false,
        },
        {
            name: "baseline_matrix_3.sql",
            id: uuidv4(),
            type: "baseline",
            active: false,
        },
        {
            name: "discount_matrix_1.sql",
            id: uuidv4(),
            type: "discount",
            active: false,
        },
        {
            name: "discount_matrix_2.sql",
            id: uuidv4(),
            type: "discount",
            active: false,
        },
        {
            name: "discount_matrix_3.sql",
            id: uuidv4(),
            type: "discount",
            active: false,
        },
    ]);

    //Active Matrix States
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeMatrixList, setActiveMatrixList] = useState([]);

    //Active Matrix Functions
    function AddActiveMatrix(name, id) {
        setActiveMatrixList([...activeMatrixList, { name: name, id: id }]);

        if (activeIndex === -1) {
            setActiveIndex(id);
        }
    }

    function HandleActiveClick(ind) {
        setActiveIndex(ind);
    }

    function HandleActiveDeleteClick(ind) {
        for (let i = 0; i < openedMatrixList.length; i++) {
            console.log(openedMatrixList[i], ind);
            if (openedMatrixList[i].id === ind) {
                openedMatrixList[i].active = false;
                break;
            }
        }
        if (activeMatrixList.length === 1) {
            setActiveIndex(-1);
            setActiveMatrixList([]);
        } else {
            if (activeMatrixList[0].id === ind) {
                setActiveIndex(activeMatrixList[1].id);
                activeMatrixList.splice(0, 1);
            } else {
                let t = -1;
                for (let i = 0; i < activeMatrixList.length; i++) {
                    if (activeMatrixList[i].id === ind) {
                        activeMatrixList.splice(i, 1);
                        break;
                    }
                    t = activeMatrixList[i].id;
                }
                setActiveIndex(t);
            }
        }
        forceUpdate();
    }
    //Opened Matrix Functions

    function ActivateOpenedMatrix(name, id, n) {
        if (!openedMatrixList[n].active) {
            AddActiveMatrix(name, id);
            openedMatrixList[n].active = true;
        }
    }

    function HandleOpenedDeleteClick(ind) {
        for (let i = 0; i < openedMatrixList.length; i++) {
            if (openedMatrixList[i].id === ind) {
                openedMatrixList.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < activeMatrixList.length; i++) {
            if (activeMatrixList[i].id === ind) {
                activeMatrixList.splice(i, 1);
                break;
            }
        }
        forceUpdate();
    }

    function openMatrix(g) {
        let f = true;
        for (let i = 0; i < openedMatrixList.length; i++) {
            if (openedMatrixList[i].id === g.id) {
                f = false;
                break;
            }
        }
        if (f) {
            openedMatrixList.push({ name: g.name, id: g.id, active: false, type: g.name.substring(0, 8) })
        }
    }

    function createMatrix(g) {
        //Creating Matrix in storage...
        openMatrix(g)
    }

    //Popup

    const [popupOpen, setPopupOpen] = useState(-1);

    function closePopup() {
        setPopupOpen(-1);
        forceUpdate();
    }

    return (
        <div className="App">
            {popupOpen === -1 ? (
                <></>
            ) : (
                    <Popup popup={popupOpen} closePopup={closePopup} openMatrix={openMatrix} createMatrix={createMatrix} />
                )}
            <header className="App-header">
                <div className="App-header-LogoContainer">
                    <img
                        src={logo}
                        className="App-logo"
                        alt="logo"
                        width="48"
                        height="48"
                    />
                    <h1 className="App-title">Amazing Balance</h1>
                </div>
                <div className="ToolsContainer">
                    <Button
                        text="Открыть"
                        color="white"
                        borderColor=""
                        backgroundColor="#00AAFF"
                        onc={() => {
                            setPopupOpen(0);
                            forceUpdate();
                        }}
                    />
                    <Button
                        text="Создать"
                        color="white"
                        borderColor=""
                        backgroundColor="#00AAFF"
                        onc={() => {
                            setPopupOpen(1);
                            forceUpdate();
                        }}
                    />
                    <Button
                        text="Storage"
                        color="white"
                        borderColor=""
                        backgroundColor="#965EEB"
                        onc={() => {
                            setPopupOpen(2);
                            forceUpdate();
                        }}
                    />
                </div>
            </header>
            <main className="App-main">
                <div className="OpenedMatrix">
                    <h2 className="OpenedMatrixTitle">Основные матрицы</h2>
                    <ul className="OpenedMatrixListMain">
                        {openedMatrixList.map((elem) =>
                            elem.type === "baseline" ? (
                                <div className="OpenedMatrixList_ItemContainer">
                                    <li
                                        className="OpenedMatrixList_Item"
                                        key={elem.id.toString()}
                                        onClick={() =>
                                            ActivateOpenedMatrix(
                                                elem.name,
                                                elem.id,
                                                openedMatrixList.indexOf(elem)
                                            )
                                        }
                                    >
                                        <p>{elem.name}</p>
                                    </li>
                                    <div
                                        className="OpenedMatrixList_Item_CloseButton"
                                        onClick={() =>
                                            HandleOpenedDeleteClick(elem.id)
                                        }
                                    >
                                        <span>✕</span>
                                    </div>
                                </div>
                            ) : (
                                    <></>
                                )
                        )}
                    </ul>

                    <h2 className="OpenedMatrixTitle">Скидочные матрицы</h2>
                    <ul className="OpenedMatrixListSpecial">
                        {openedMatrixList.map((elem) =>
                            elem.type === "discount" ? (
                                <div className="OpenedMatrixList_ItemContainer">
                                    <li
                                        className="OpenedMatrixList_Item"
                                        key={elem.id.toString()}
                                        onClick={() =>
                                            ActivateOpenedMatrix(
                                                elem.name,
                                                elem.id,
                                                openedMatrixList.indexOf(elem)
                                            )
                                        }
                                    >
                                        <p>{elem.name}</p>
                                    </li>
                                    <div
                                        className="OpenedMatrixList_Item_CloseButton"
                                        onClick={() =>
                                            HandleOpenedDeleteClick(elem.id)
                                        }
                                    >
                                        <span>✕</span>
                                    </div>
                                </div>
                            ) : (
                                    <></>
                                )
                        )}
                    </ul>
                </div>
                <div className="WorkZone">
                    <header className="WorkZoneHeader">
                        <ul className="ActiveMatrixList">
                            {activeMatrixList.map((elem) => (
                                <li
                                    className="ActiveMatrixList_Item"
                                    style={
                                        elem.id === activeIndex
                                            ? { backgroundColor: "#515151" }
                                            : {}
                                    }
                                    key={elem.id.toString()}
                                >
                                    <div
                                        onClick={() =>
                                            HandleActiveClick(elem.id)
                                        }
                                    >
                                        <p>{elem.name}</p>
                                    </div>
                                    <div
                                        onClick={() =>
                                            HandleActiveDeleteClick(elem.id)
                                        }
                                    >
                                        <span>✕</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </header>
                    <WorkZone />
                </div>
            </main>
        </div>
    );
}

export default App;
