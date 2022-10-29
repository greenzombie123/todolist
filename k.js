let HP = 10

// function eat(food){
//     HP += food.HP
// }



// const banana = {HP:1}
// const orange = {HP:2}
// const strawberry = {HP:3}
// const grapes = {HP:10}

// eat(banana)
// eat(orange)
// eat(grapes)

HP

let H20 = 0;

function drink(beverage){
    H20 += beverage.getH20()
}

class beverage{
    getH20(){
        return 1
    }
}

class milk extends beverage{
    getH20(){
        return 5
    }
}

class soda extends beverage{
    getH20(){
        return 14
    }
}

console.log(new soda() instanceof beverage)

drink(new beverage())
drink(new milk())

H20