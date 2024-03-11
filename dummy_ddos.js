console.log("Hello there. My name is JS.")

var b1 = -1

function Reset() {
    for (i = 1; i < 10; i++) {
        const el = document.getElementById(`fbtn${i}`)
        if (el != null) {
            console.log(`Deleted inner stuff in div#${el.id}`)
            el.innerHTML = ""
            b1 = 0
        }
    }
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
