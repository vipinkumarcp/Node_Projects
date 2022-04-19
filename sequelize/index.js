const sequelize = require("./util/database");

const Customer = require("./models/customer");
const Order = require("./models/order");

Customer.hasMany(Order);

//automatically create cutomer id foriegn key

//let customerId = null;
sequelize
  .sync({force: true})
  // .sync()
  .then((result) => {
    return Customer.create({name: "Chandler Bing", email: "cb@gmail.com"})
    console.log(result);
  })
  .then(customer => {
    customerId = customer.id;
    console.log("First Customer Created: ",customer);
    return customer.createOrder({total: 45});
  })
  .then(order => {
    console.log("Order is : ",order);
    return Order.findAll({ where: customerId});
  })
  .then(orders => {
    console.log("All the Orders are : ",orders);
  })
  .catch((err) => {
    console.log(err);
  });

// sequelize.sync({force: true}).then((results)=>{
//     console.log(results)
// }).catch((err)=>{
//     console.log(err);
// })


   