export default function LastWeek(array){
// array = [{
//     InvoiceDate: "2022-01-11T03:00:00.000Z"
//      },{...}]
    function cutDate(string){
        let a = string.split('-')
        let year = parseInt(a[0])
        let month = parseInt(a[1])
        let day = parseInt(a[2].split('T')[0])

        return {year, day, month}
    }

    function getLimitDate(){

        const today = new Date()
        const string = today.toISOString()
        const actualDate = cutDate(string)
        
        let limitDay = () => {
          if(actualDate.day > 8 ) return actualDate.day - 7
          else{
            if(actualDate.month === 1   && actualDate.month === 5 && actualDate.month === 7 && actualDate.month === 8 && actualDate.month === 10 && actualDate.month === 12) {
                let day = 31 - (actualDate.day - 7)
                return day
            }
            if(actualDate.month === 4   && actualDate.month === 6 && actualDate.month === 9 && actualDate.month === 11 ) {
                let day = 30 - (actualDate.day - 7)
                return day
            }
            if(actualDate.month === 2) {
                if(actualDate.month % 4 == 0 && year % 100 != 0 || year % 400 == 0){
                    let day = 29 - (actualDate.day - 7)
                    return day
                }else{
                    let day = 28 - (actualDate.day - 7)
                    return day
                }      
            }
          }}}
        let limitMonth = () =>{
            if(actualDate.day < 8 ){
                if (actualDate.month <= 1 ) return 12
                else return actualDate.month - 1
            } else return actualDate.month
        }
        let limitYear = () => {
            if(actualDate.day < 8 ){
                if (actualDate.month <= 1 ) return actualDate.year
                else return actualDate.year
            }else return actualDate.year
        }
        let day = limitDay()
        let month = limitMonth()
        let year = limitYear()

        return {year, day, month}
    
    function compareDate(a, b ){
        
        


    }


}