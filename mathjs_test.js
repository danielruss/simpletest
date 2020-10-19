
console.log(math.sqrt(-4).toString()) // 2i

myfun = {
    "f1": function (x){
        return(x+1)
    },
    "f2": function (x){
        return("String-"+x+"-lala")
    },
    "f3": (x,y) => (""+x).toUpperCase()+"_"+(""+y).toLocaleUpperCase(), 
}

a = {
    "t1":"1",
    "t2":"2",
    "t3":"3"
}
b={
    "x":1,
    "y":2
}
c={
    "x":2,
    "y":1
}

console.log(math.evaluate("f1(2)",myfun))
console.log(math.evaluate("f2(2)",myfun))
console.log(math.evaluate("f3(2,3)",myfun))
console.log(math.evaluate("f3(2)",myfun))
console.log(a)
console.log(myfun)
console.log(math.evaluate(1>2))
console.log(math.evaluate(b.x<b.y))
console.log(math.evaluate(c.x<c.y))
console.log("should be false:",math.evaluate("x<y",c))
console.log("should be true:",math.evaluate("x>y",c))

//console.log(math.parser().evaluate("c.x<c.y"))
console.log({...myfun,...c})