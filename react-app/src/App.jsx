import logo from "./images/logo48.png";
import "./App.css";
import React, { useEffect, useState } from "react";
import ActiveMatrixItem from "./components/ActiveMatrixItem/ActiveMatrixItem";

function App() {
    var ActiveMatrixList = [];
    const [activeIndex, setActiveIndex] = useState(-1);

    function AddActiveMatrix(name) {
        ActiveMatrixList.push({ name: name, index: ActiveMatrixList.length });
        if (activeIndex == -1) {
            setActiveIndex(0);
        }
    }

    function handleClick(ind) {
        console.log(ind);
        setActiveIndex(ind);
    }

    //useEffect(() => {}, []);

    AddActiveMatrix("baseline_matrix_1.sql");
    AddActiveMatrix("baseline_matrix_2.sql");

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={logo}
                    className="App-logo"
                    alt="logo"
                    width="48"
                    height="48"
                />
                <h1 className="App-title">Amazing Balance</h1>
            </header>
            <main className="App-main">
                <div className="OpenedMatrix">
                    <h2 className="OpenedMatrixTitle">Основные матрицы</h2>
                    <ul className="OpenedMatrixListMain">
                        <li className="OpenedMatrixList_Item">
                            <p>baseline_matrix_1.sql</p>
                        </li>
                        <li className="OpenedMatrixList_Item">
                            <p>baseline_matrix_2.sql</p>
                        </li>
                        <li className="OpenedMatrixList_Item">
                            <p>baseline_matrix_3.sql</p>
                        </li>
                    </ul>

                    <h2 className="OpenedMatrixTitle">Скидочные матрицы</h2>
                    <ul className="OpenedMatrixListSpecial">
                        <li className="OpenedMatrixList_Item">
                            <p>discount_matrix_1.sql</p>
                        </li>
                        <li className="OpenedMatrixList_Item">
                            <p>discount_matrix_2.sql</p>
                        </li>
                        <li className="OpenedMatrixList_Item">
                            <p>discount_matrix_3.sql</p>
                        </li>
                    </ul>
                </div>
                <div className="WorkZone">
                    <header className="WorkZoneHeader">
                        <ul className="ActiveMatrixList">
                            {ActiveMatrixList.map((elem) => (
                                <ActiveMatrixItem
                                    name={elem.name}
                                    index={elem.index}
                                    key={elem.index}
                                    onClick={() => handleClick(elem.index)}
                                />
                            ))}
                        </ul>
                    </header>
                </div>
            </main>
        </div>
    );
}

export default App;
