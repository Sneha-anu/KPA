const http = require("http");
const app = require("./app");

const port = process.env.PORT || 4100;

const server = http.createServer(app);

server.listen(port);

// const Express = require("express");
// const BodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// // const ObjectId = require("mongodb").ObjectID;

// const CONNECTION_URL =
//   "mongodb+srv://admin:admin@node-rest-shop-h7ugq.mongodb.net/test?retryWrites=true";
// const DATABASE_NAME = "test";

// var app = Express();

// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));

// var database, collection;

// app.listen(4000, () => {
//   MongoClient.connect(
//     CONNECTION_URL,
//     { useNewUrlParser: true },
//     (error, client) => {
//       if (error) {
//         throw error;
//       }
//       database = client.db(DATABASE_NAME);
//       // collection = database.collection("products");
//       // console.log(
//       //   "Connected to `" + DATABASE_NAME + "`!",
//       //   collection,
//       //   database
//       // );
//       var cursor = database.collection("products").find();

//       cursor.each(function (err, doc) {
//         console.log(doc);
//       });
//     }
//   );
// });
