console.log("Hello there. My name is JS.")

// arrLen -> Amount of buttons available to testing
const arrLen = 5
var numba = Array(arrLen).fill().map((_) => -1)

const rootURI = "http://localhost:6969"

function Reset() {
    const roots = document.getElementsByClassName("root")
    var i = 0
    while (i < roots.length) {
        roots[i].innerHTML = ""
        i++
    }

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

    fetch(rootURI).then((resp) => {
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
