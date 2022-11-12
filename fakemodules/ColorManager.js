class ColorManager{
    colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'teal']
    checkColor(color){
        return this.colors.includes(color)
    }
}