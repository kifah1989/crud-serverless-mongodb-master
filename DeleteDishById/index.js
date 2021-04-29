const { ObjectID } = require("mongodb");
const createMongoClient = require("../shared/mongo");

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    context.res = {
      status: 400,
      body: "The fields are required!",
    };

    return;
  }

  const { db, connection } = await createMongoClient();

  const Dishes = db.collection("dishes");

  try {
    await Dishes.findOneAndDelete({ _id: ObjectID(id) });
    connection.close();
    context.res = {
      status: 204,
      body: "Dish deleted successfully!",
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error Deleting Dish" + id,
    };
  }
};
