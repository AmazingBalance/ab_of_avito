console.log("Hello there. My name is JS.")

var b1 = -1
var b2 = -1

const rootURI = "http://localhost:6969"

function Reset() {

    const roots = document.getElementsByClassName("root")
    var i = 0
    while (i < roots.length) {
        roots[i].innerHTML = ""

        i++
    }

    b1 = -1
    b2 = -1
}

function Btn1() {
    const el = document.getElementById("fbtn1")
    const nw = document.createElement("p")

    if (b1 % 5 == 4) {
        el.innerHTML = ''
    }

    b1 += 1

    nw.innerText = `Hello there. I am no.${b1}!`

    el.appendChild(nw)
}

function Broot() {
    const el = document.getElementById("fbroot")
    const ne = document.createElement("p")

    if (b2 % 5 == 4) {
        el.innerHTML = ""
    }

    fetch(rootURI + "/api/edit").then((response) => {
        if (!response.ok) {
            const err = `HTTP error: ${response.status}`
            ne.innerText = err
            el.appendChild(ne)
            throw new Error(err)
        }
        return response.text
    }).then((text) => {
        console.log(`Got: ${text}`)

        ne.innerText = text
        el.appendChild(ne)
    }).catch((response) => {
        console.log(response)

        ne.innerText = response
        el.appendChild(ne)
    })

    b2++
}
