const createMongoClient = require("../shared/mongo");

module.exports = async function (context, req) {
  const dish = req.body || {};

  if (dish) {
    context.res = {
      status: 400,
      body: "Dish data is required! ",
    };
  }

  const { db, connection } = await createMongoClient();

  const Dishes = db.collection("dishes");

  try {
    const dishes = await Dishes.insert(dish);
    connection.close();

    context.res = {
      status: 201,
      body: dishes.ops[0],
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error creating a new Dish",
    };
  }
};
