const express = require("express");
const cors = require("cors");
const { readData, writeData } = require("./file_reading/functions");

const app = express();

const port = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

app.get("/", (req, res) => {
  try {
    const data = `<h1>Hello NodeJS</h1>`;
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Getting all Data:
app.get("/getprd", (req, res) => {
  try {
    const data = readData();
    // console.log(data);
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Getting Data based on their productid:
app.get("/getprd/:prdid", (req, res) => {
  try {
    const { prdid } = req.params;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(prdid);
    /* Your Code Goes Here */
    data.array.forEach(element => {
        if (element.productid == prdid) {
            resData.push(element);
        }
    });
    /* Your Code Ends Here */

    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Getting Data based on their price range
app.get("/getprdbyrange", (req, res) => {
  try {
    const { min, max } = req.query;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(`Min: ${min}, Max: ${max}`);
    /* Your Code Goes Here */
    data.array.forEach(element => {
        if (element.price >= min && element.price <= max) {
            resData.push(element);
            }
            });
    
    /* Your Code Ends Here */
  

    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Getting Product by there availability in stock
app.get("/getprdbyaval", (req, res) => {
  try {
    const { aval } = req.query;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(`In Stock: ${aval}`);
    /* Your Code Goes Here */

    data.array.forEach(element => {
        if (element.stock == aval) {
            resData.push(element);
        }
    });
    /* Your Code Ends Here */

    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Getting Product by there company name
app.get("/getprdbycomp", (req, res) => {
  try {
    const { compname } = req.query;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(`Company Name: ${compname}`);



    /* Your Code Goes Here */
    for (let item of data) (item.prd_company === compname)?
    resData.push(item) : null;

    /* Your Code Ends Here */

    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Post new Data to the data.json with product id increment
app.post("/postprd", (req, res) => {
  try {
    // This is how body of req looks.
    // {
    //   "prd_id": "5",
    //   "prd_name": "Sony Smart TV",
    //   "prd_price": "$600.00",
    //   "prd_aval": false,
    //   "prd_purchase": 700,
    //   "prd_star": "3.9 Star",
    //   "prd_company": "Sony"
    // }
    const newPrd = req.body;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(newPrd);
    

    /* Your Code Goes Here */
    let maxId = 0;
    for (let item of data) {
        if (item.prd_id > maxId){
            maxId = item.prd_id;
        }
    }
    newPrd.prd_id = maxId + 1;
    data.push(newPrd);
    // console.log(data);
    /* Your Code Ends Here */

    console.log(resData);
    // Call this only when you are done.
    // writeData(resData);
    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Updating Data based on their product id
app.put("/updprd/:prdid", (req, res) => {
  try {
    // This is how body of req can look like.
    // {
    //   "prd_id": "5",
    //   "prd_name": "Sony Smart TV",
    //   "prd_price": "$600.00",
    //   "prd_aval": false,
    //   "prd_purchase": 700,
    //   "prd_star": "3.9 Star",
    //   "prd_company": "Sony"
    // }
    const updPrd = req.body;
    const { prdid } = req.params;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(updPrd);
    console.log(prdid);


    /* Your Code Goes Here */
    for (let item of data) {
        if (item.prd_id == prdid){
            item.prd_name = updPrd.prd_name;
            item.prd_price = updPrd.prd_price;
            item.prd_aval = updPrd.prd_aval;
            item.prd_purchase = updPrd.prd_purchase;
            item.prd_star = updPrd.prd_star;
            item.prd_company = updPrd.prd_company;
        }
        resData.push(item);
    }
    // console.log(data);
    /* Your Code Ends Here */
    console.log(resData);
    // Call this only when you are done.
    // writeData(resData);
    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

// Deleting Data based on their product id
app.delete("/delprd/:prdid", (req, res) => {
  try {
    const { prdid } = req.params;
    const data = readData();
    let resData = [];
    // console.log(data);
    console.log(prdid);

    /* Your Code Goes Here */
    for (let item of data) {
        if (item.prd_id != prdid){
            resData.push(item);
        }
    }
    // console.log(data);
    /* Your Code Ends Here */
    console.log(resData);
    // Call this only when you are done.
    // writeData(resData);
    res.status(201).send(resData);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});