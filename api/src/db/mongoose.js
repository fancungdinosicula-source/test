const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb+srv://Hori:proud2006@hori.niyh2zf.mongodb.net/?appName=Hori";
const dbName = process.env.MONGODB_DB || "mittobit-db";

let isConnected = false;

async function connectMongo() {
  if (isConnected) return mongoose.connection;
  const conn = await mongoose.connect(uri, {
    dbName,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  isConnected = true;
  return conn.connection;
}

function bindMongoLogs() {
  const conn = mongoose.connection;
  conn.on("connected", () => console.log(`✔ Mongo connected: ${uri}/${dbName}`));
  conn.on("error", (err) => console.error("✖ Mongo error:", err.message));
  conn.on("disconnected", () => console.warn("⚠ Mongo disconnected"));
}


module.exports = { connectMongo, bindMongoLogs };
