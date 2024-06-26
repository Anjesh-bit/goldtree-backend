const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const dbUserName = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(
  `mongodb+srv://${dbUserName}:${dbPassword}@${dbName}.cv9ka.mongodb.net/?retryWrites=true&w=majority`,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function connect() {
  try {
    // Connect the client to the server
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("GoldTree").command({ ping: 1 });
    console.log("You are successfully connected to MongoDB!");
  } catch (e) {
    console.log(`Error Establishing Connection ${e}`);
  }
}

connect().catch(console.dir);

module.exports = { connect, mongoClient };
