export default class DateSelector{
    date = null

    selectDate(date){
        this.date = date
    }
    getDate(){
        return this.date
    }

    resetValues(){
        this.tags = null
      }
}