const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i9w8jvi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('emmysDB').collection('services');
    }
    finally {

    }
}

run().catch(console.dir);

// app.get('/services', (req, res) => {
//     res.send(services);
// });

app.get('/', (req, res) => {
    res.send("Emmy's Consultancy Server Running");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});