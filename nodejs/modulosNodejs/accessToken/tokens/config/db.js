const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 MongoDB conectado com sucesso');
  } catch (err) {
    console.error('🔴 Erro ao conectar no MongoDB:', err.message);
    process.exit(1); // encerra a aplicação
  }
};

module.exports = connectDB;
