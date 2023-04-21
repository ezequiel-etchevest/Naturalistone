export const years = () => {
    const currentYear = Number(new Date().getFullYear())
    const yearArr = []

    for(let i = 2000; i <= currentYear; i++) {
        yearArr.push(i)
    }

    return yearArr
}