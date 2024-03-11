import logo from "./images/logo48.png";
import "./App.css";

function App() {
    var ActiveMatrixList = [];

    function AddActiveMatrix(name) {
        let workZoneHeader =
            document.body.querySelector(".ActiveMatrixList") || null;
        workZoneHeader.innerHTML += `<li class="ActiveMatrixList_Item">
        <div>
            <p>baseline_matrix_1.sql</p>
        </div>
        <div>
            <span>✕</span>
        </div>
    </li>`;
        let el = document.body.querySelector(".workZoneHeader:last-child");
        el.addEventListener("click", () => {
            s;
        });
    }

    function ActiveMatrixController(e) {
        console.log(this);
    }

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
                            <li className="ActiveMatrixList_Item">
                                <div
                                    onClick={() =>
                                        this.ActiveMatrixController()
                                    }
                                >
                                    <p>baseline_matrix_1.sql</p>
                                </div>
                                <div>
                                    <span>✕</span>
                                </div>
                            </li>
                            <li className="ActiveMatrixList_Item ActiveMatrixList_Item__Active">
                                <div onClick={ActiveMatrixController}>
                                    <p>baseline_matrix_2.sql</p>
                                </div>
                                <div>
                                    <span>✕</span>
                                </div>
                            </li>
                            <li className="ActiveMatrixList_Item">
                                <div onClick={ActiveMatrixController}>
                                    <p>baseline_matrix_3.sql</p>
                                </div>
                                <div>
                                    <span>✕</span>
                                </div>
                            </li>
                            <li className="ActiveMatrixList_Item">
                                <div onClick={ActiveMatrixController}>
                                    <p>baseline_matrix_4.sql</p>
                                </div>
                                <div>
                                    <span>✕</span>
                                </div>
                            </li>
                        </ul>
                    </header>
                </div>
            </main>
        </div>
    );
}

export default App;
