const { ObjectID } = require("mongodb");
const createMongoClient = require("../shared/mongo");

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    context.res = {
      status: 400,
      body: "Please enter the correct Dish Id number!",
    };

    return;
  }

  const { db, connection } = await createMongoClient();

  const Dishes = db.collection("dishes");

  try {
    const body = await Dishes.findOne({ _id: ObjectID(id) });

    connection.close();
    context.res = {
      status: 200,
      body,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error listing Dish by Id.",
    };
  }
};
