
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "sucess !",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
    console.log("Incoming request:", req.url); 
   console.log("Received total:", req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({ clientSecrete: paymentIntent.client_secret });
  } else {
    res.status(401).json({ message: "total must be greater than 0" });
  }
});


app.listen(5001,(err)=>
{
    if(err) throw err
    console.log("Amazon server running on PORT:http://localhost:5001")

})

