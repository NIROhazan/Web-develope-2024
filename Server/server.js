const express = require("express");
const mongojs = require("mongojs");

// Use the shared MongoDB server with the updated connection string format

//If you use the shared mongodb servera:
const db = mongojs(
  "mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024"
);

// Edit this line to point to your specific collection
const myShop = db.collection("final_<Nir_Hazan_Omer_Bidush>");

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(express.static("static")); // Serve static files from the 'static' directory

// Initialize the counters collection if it doesn't exist
myShop.findOne({ _id: "orderId" }, (err, doc) => {
  if (!doc) {
    myShop.insert({ _id: "orderId", sequence_value: 0 });
  }
});

// Function to get the next sequence value
const getNextSequenceValue = (sequenceName, callback) => {
  myShop.findAndModify(
    {
      query: { _id: sequenceName },
      update: { $inc: { sequence_value: 1 } },
      new: true, // Ensure the updated document is returned
    },
    (err, doc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc.sequence_value);
      }
    }
  );
};

// GET route to fetch all products
app.get("/products", (req, res) => {
  myShop.find({}, (err, products) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(products);
    }
  });
});

// POST route to handle order submission
app.post("/submit-order", (req, res) => {
  const order = req.body;

  getNextSequenceValue("orderId", (err, orderId) => {
    if (err) {
      res.status(500).json({ error: "Failed to generate order ID" });
    } else {
      order.orderId = orderId; // Assign the unique order ID

      myShop.insert(order, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Failed to submit order" });
        } else {
          res
            .status(200)
            .json({ message: "Order submitted successfully", orderId });
        }
      });
    }
  });
});

// Start the server and listen on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
