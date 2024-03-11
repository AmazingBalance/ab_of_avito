console.log("Hello there. My name is JS.")

var a = -1

function Reset() {
    for (i = 1; i < 10; i++) {
        const el = document.getElementById(`fbtn${i}`)
        if (el != null) {
            console.log(`Deleted inner stuff in div#${el.id}`)
            el.innerHTML = ""
        }
    }
}

function Btn1() {
    const el = document.getElementById("fbtn1")
    const nw = document.createElement("p")

    if (a % 5 == 4) {
        el.innerHTML = ''
    }

    a += 1

    nw.innerText = `Hello there. I am no.${a}!`

    el.appendChild(nw)
}
