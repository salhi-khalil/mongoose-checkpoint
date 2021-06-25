let mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connec = await mongoose.connect(
      "mongodb+srv://salhi-khalil:boutchi1986@mongoosews.noxes.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,       // to fix all depreciation warning.
        useCreateIndex: true,
      }
    );
    console.log(`MongoDB connected: ${connec.connection.host}`);
  } catch (error) {
    console.log(`Error found: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
