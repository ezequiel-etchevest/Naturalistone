const cutDate = require('./cutDate')

function getLimitDateMonth(){
  
      const today = new Date()
      const string = today.toISOString()
      const actualDate = cutDate(string)

      let limitDay = () => {
          if(actualDate.month == 3){
              if( actualDate.day == 31 || actualDate.day == 30 || actualDate.day == 29){
              return 28
                }else return actualDate.day
            } else {
                if(actualDate.day == 31) return 30
                else return actualDate.day
            } 
      }

      let limitMonth = () =>{
            if (actualDate.month == 1 ) return 12
            else return actualDate.month - 1
      }
      let limitYear = () => {
            if (actualDate.month == 1 ) return actualDate.year - 1
            else return actualDate.year
      }
      let day = limitDay()
      let month = limitMonth()
      let year = limitYear()

      return `${year}-${month}-${day}`
  }
  


module.exports = getLimitDateMonth