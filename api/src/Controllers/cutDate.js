function cutDate(string){
    let a = string.split('-')
    let year = parseInt(a[0])
    let month = parseInt(a[1])
    let day = parseInt(a[2].split('T')[0])

    return {year, day, month}
}

module.exports = cutDate