const cutDate = require('./cutDate')

function getLimitDate(){
    
        const today = new Date()
        const string = today.toISOString()
        const actualDate = cutDate(string)
        
        let limitDay = () => {
          if(actualDate.day >= 8 ) return actualDate.day - 7
          else{
            if(actualDate.month -1  === 1  ||  actualDate.month - 1 === 3 || actualDate.month - 1 === 5 || actualDate.month - 1 === 7 || actualDate.month - 1 === 8 || actualDate.month - 1 === 10 || actualDate.month - 1 === 0) {
                let day = 31 + (actualDate.day - 7)
                return day
            }
            if(actualDate.month - 1 === 4   || actualDate.month - 1 === 6 || actualDate.month - 1 === 9 || actualDate.month - 1 === 11 ) {
                let day = 30 + (actualDate.day - 7)
                return day
            }
            if(actualDate.month - 1 === 2) {
                if(actualDate.year % 4 == 0 && actualDate.year % 100 != 0 || actualDate.year % 400 == 0){
                    let day = 29 + (actualDate.day - 7)
                    return day
                }else{
                    let day = 28 + (actualDate.day - 7)
                    return day
                }      
            }
        }}
        let limitMonth = () =>{
            if(actualDate.day < 8 ){
                if (actualDate.month == 1 ) return 12
                else return actualDate.month - 1
            } else return actualDate.month
        }
        let limitYear = () => {
            if(actualDate.day < 8 ){
                if (actualDate.month == 1 ) return actualDate.year - 1
                else return actualDate.year
            }else return actualDate.year
        }
        let day = limitDay()
        let month = limitMonth()
        let year = limitYear()

        return `${year}-${month}-${day}`
    }
    

module.exports = getLimitDate