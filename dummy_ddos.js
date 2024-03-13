console.log("Hello there. My name is JS.")

// arrLen -> Amount of buttons available to testing
const arrLen = 20
var numba = Array(arrLen).fill().map((_) => -1)

const rootURI = "http://localhost:6969"

function Reset() {
    const roots = document.getElementsByClassName("root")
    var i = 0
    while (i < roots.length) {
        roots[i].innerHTML = ""
        i++
    }
    console.clear()
    numba = numba.map((_) => -1)
}

function Btn1() {
    const el = document.getElementById("fbtn1")
    const nw = document.createElement("p")

    if (numba[0] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[0]++

    nw.innerText = `Hello there. I am no.${numba[0]}!`

    el.appendChild(nw)

}

function Btn2() {
    const el = document.getElementById("fbtn2")
    const ne = document.createElement("p")

    if (numba[1] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[1]++

    fetch(rootURI + "/hello").then((resp) => {
        if (!resp.ok) {
            const err = `HTTP error: ${resp.status}`
            ne.innerText = err
            el.appendChild(ne)
            throw new Error(err)
        }
        return resp.text()
    }).then((txt) => {
        console.log(`Got: ${txt}`)

        ne.innerText = txt
        el.appendChild(ne)
    }).catch((r) => {
        console.log(r)

        ne.innerText = r
        el.appendChild(ne)
    })
}


function Btn3() {
    const el = document.getElementById("fbtn3")
    const ne = document.createElement("p")

    if (numba[2] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[2]++

    console.log(
        JSON.stringify({
            txt: "JS is terrible"
        }),
    )

    fetch(rootURI + "/json", {
        method: "POST",
        body: JSON.stringify({
            txt: "JS is terrible"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode: "cors"
    }).then((resp) => {
        if (!resp.ok) {
            ne.innerText = "Error: " + resp.statusText
            el.appendChild(ne)
        }
        return resp.json()
    }).then((data) => {
        console.log(JSON.stringify(data))

        ne.innerText = JSON.stringify(data)
        el.appendChild(ne)
    }).catch((error) => {
        console.log(error)
    })
}

function Btn4() {
    const el = document.getElementById("fbtn4")
    const ne = document.createElement("p")

    if (numba[3] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[3]++

    console.log(
        JSON.stringify({
            ignore: "true",
            category: "Electronics",
            location: "Russia",
            price: "199.99",
        })
    )


    fetch(rootURI + "/api/getMatrix", {
        method: "POST",
        body: JSON.stringify({
            ignore: true,
            category: "Electronics",
            location: "Russia",
            price: 199.99,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode: "cors"
    }).then((resp) => {
        if (!resp.ok) {
            ne.innerText = "Error: " + resp.statusText
            el.appendChild(ne)
        }
        return resp.json()
    }).then((data) => {
        console.log(JSON.stringify(data))

        ne.innerText = JSON.stringify(data)
        el.appendChild(ne)
    }).catch((error) => {
        console.log(error)
    })
}


function Btn5() {
    const el = document.getElementById("fbtn5")
    const ne = document.createElement("p")

    if (numba[4] % 5 == 4) {
        el.innerHTML = ''
    }
    numba[4]++

    fetch(rootURI + "/api/getCategories").then((resp) => {
        if (!resp.ok) {
            ne.innerText = "Error: " + resp.statusText
            el.appendChild(ne)
        }
        return resp.json()
    }).then((data) => {
        console.log(JSON.stringify(data))

        ne.innerText = JSON.stringify(data)
        el.appendChild(ne)
    }).catch((error) => {
        console.log(error)
    })
}
