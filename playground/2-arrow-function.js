// const square = function(x){

//     return x*x
// }

// arrow function-taking arrguments and return  result like function
// const square = (x) => {
//     return x*x
// }

//arrow function simplfied(short form version)
// const square = (x) => x*x
// console.log(square(5))


///////////////////////////////////////////////////////////////////////

const event = {

    name: 'Birthday Party',
    guestList: ['Vipin','jem','don'],
    printGuestList() {
        // this for this object
        console.log('Guest list for ' + this.name )
        //arrow function dont bind their this value
        this.guestList.forEach((guest) => {

            console.log(guest + 'is attending' + this.name)


        })
    }
}

event.printGuestList()