const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const serviceDetailsCollection = client.db('emmysDB').collection('serviceDetails');
        const reviewCollection = client.db('emmysDB').collection('reviews');

        // serviceCard api
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const page = req.query.page;

            let services;
            if (!!page && page === "home") {
                services = await cursor.limit(3).toArray();
            }
            else {
                services = await cursor.toArray();
            }
            res.send(services);
        });

        // service details api
        app.get('/serviceDetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: id};
            const serviceDetail = await serviceDetailsCollection.findOne(query);
            res.send(serviceDetail);
        });

        // reviews api
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            console.log(result);
            res.send(result);
        });
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Emmy's Consultancy Server Running");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});