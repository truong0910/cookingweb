require('dotenv').config();
const mongoose = require('mongoose');
const AllFood = require('./models/allfood');

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Dữ liệu cần thêm
const recipes = [
    { id: 1, title: 'Cucumber salad, cherry tomatoes', time: '32 minutes', image: '/cucumber_salad_charry_tomatoes.png', type: 'Steamed', rating: 4 },
    { id: 2, title: 'Italian style tomato salad', time: '32 minutes', image: '/italian_style_tomato_salad.png', type: 'Steamed', rating: 5 },
    { id: 3, title: 'Potato Salad', time: '32 minutes', image: '/Potato Salad.png', type: 'Baked', rating: 3 },
    { id: 4, title: 'Salad with cabbage', time: '32 minutes', image: '/Salad with cabbage.png', type: 'Steamed', rating: 4 },
    { id: 5, title: 'Five color salad', time: '32 minutes', image: '/five_color_salad.png', type: 'Steamed', rating: 5 },
    { id: 6, title: 'Corn_salad', time: '32 minutes', image: '/corn_salad.png', type: 'Steamed', rating: 3 },
    { id: 7, title: 'Salad with cabbage and shrimp', time: '32 minutes', image: '/salad_with_cabbage_and_shrimp.png', type: 'Sauteed', rating: 4 },
    { id: 8, title: 'Lotus delight salad', time: '32 minutes', image: '/Lotus delight salad.png', type: 'Steamed', rating: 5 },
    { id: 9, title: 'Avacador salad', time: '32 minutes', image: '/avacador_salad.png', type: 'Steamed', rating: 4 },
    { id: 10, title: 'Vegetable and shrimp spaghetti', time: '15 minutes', image: '/Vegetable and shrimp spaghetti.png', type: 'Stir-fried', rating: 4 },
    { id: 11, title: 'Snack cakes', time: '32 minutes', image: '/Snack cakes.png', type: 'Baked', rating: 3 },
    { id: 12, title: 'Bean, shrimp, and potato salad', time: '32 minutes', image: '/Bean, shrimp, and potato salad.png', type: 'Sauteed', rating: 4 },
  ];

// Thêm dữ liệu vào MongoDB
const seedDatabase = async () => {
  try {
    // Xóa dữ liệu cũ
    await AllFood.deleteMany();
    console.log('Old data removed.');

    // Thêm dữ liệu mới
    await AllFood.insertMany(recipes);
    console.log('New data added.');

    // Đóng kết nối
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Chạy hàm seed
seedDatabase();