export default class NameSelector{
    name = null
    descript = null
    
    createName(name){
        this.name = name
        console.log(this.name);
    }
    createDescript(Descript){
        this.descript = Descript
        console.log(this.descript);
    }

    getName(){
        return this.name
    }

    getDescript(){
        return this.descript
    }

    resetValues(){
        [this.name, this.descript] = [null, null] 
      }
}