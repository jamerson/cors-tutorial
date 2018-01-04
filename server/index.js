const express = require('express')

const app = express()

//The cache was disabled to avoid 304 responses
function disableCaching(res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate")
    res.header("Pragma", "no-cache")
    res.header("Expires", 0)

    return res
}

function addCorsHeaders(res) {
    res.header('Access-Control-Allow-Origin', '*')

    return res
}

function addMoreCorsHeaders(res) {
    res = addCorsHeaders(res)

    //Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
    res.header('Access-Control-Allow-Methods', 'PUT')

    //Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
    res.header('Access-Control-Allow-Headers', 'content-type')

    return res
}

app.get('/simple-request', (req, res) => {
    res = disableCaching(res)

    res = addCorsHeaders(res)

    res.sendStatus(200)
})

app.options('/preflighted-request', (req, res) => {
    res = disableCaching(res)

    res = addMoreCorsHeaders(res)

    res.sendStatus(200)
})


app.put('/preflighted-request', (req, res) => {
    res = disableCaching(res)

    res = addMoreCorsHeaders(res)

    res.sendStatus(200)
})


app.listen(3000, () => console.log('Server listening on port 3000!'))