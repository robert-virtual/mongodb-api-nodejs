function checkProps(userProps=[],body) {
    let faltan = []
    userProps.forEach( key =>{
        if (!body.hasOwnProperty(key)) {
            faltan.push(key)
        }
        
    })
    return faltan
}

module.exports = checkProps