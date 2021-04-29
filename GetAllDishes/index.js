const createMongoClient = require("../shared/mongo");

module.exports = async (context) => {
  const { db, connection } = await createMongoClient();

  const Dishes = db.collection("dishes");
  const res = await Dishes.find({});
  const body = await res.toArray();

  connection.close();

  context.res = {
    status: 200,
    body,
  };
};
