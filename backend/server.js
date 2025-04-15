require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session"); // Import express-session
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User"); // Import model User
const Recipe = require("./models/Recipe"); 
const VideoRecipe = require("./models/VideoRecipe"); // Import model VideoRecipe
const app = express();
const port = process.env.PORT || 3000;
const AllFood = require('./models/allfood'); 

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Thay bằng URL frontend của bạn
    credentials: true, // Cho phép gửi cookie và thông tin xác thực
  })
);
app.use(express.json()); // Parse JSON từ request body

// Thêm express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Khóa bí mật cho session
    resave: false, // Không lưu lại session nếu không thay đổi
    saveUninitialized: false, // Không lưu session trống
    cookie: { 
      secure: false,
      httpOnly: true,
      sameSite: "lax", 
     }, // Đặt `true` nếu sử dụng HTTPS
  })
);

// Khởi tạo Passport và sử dụng session
app.use(passport.initialize());
app.use(passport.session()); // Passport sử dụng session

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value, // Lưu avatar từ Google
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Sau khi đăng nhập thành công, chuyển hướng về frontend
    res.redirect('http://localhost:5173'); // Thay bằng URL frontend của bạn
  }
);
app.get('/auth/google/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar, // Trả về avatar
      },
    });
  } else {
    res.status(401).json({ message: 'Người dùng chưa đăng nhập' });
  }
  console.log(req.user);
});

// Passport Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize và Deserialize user để lưu vào session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Route mặc định
app.get("/", (req, res) => {
  res.send("Welcome to Food API with MongoDB!");
});

// Route lấy thông tin người dùng
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    // Tìm người dùng theo ID
    const user = await User.findById(userId).select("username email createdAt");
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

// Route xử lý đăng nhập bằng email và password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Trả về thông tin người dùng nếu đăng nhập thành công
    res.status(200).json({ user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Lỗi khi xử lý đăng nhập:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

// Facebook Auth Routes
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Sau khi đăng nhập thành công, chuyển hướng về frontend
    res.redirect('http://localhost:5173'); // Thay bằng URL frontend của bạn
  }
);

app.get('/auth/facebook/success', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('User:', req.user); // Kiểm tra thông tin người dùng
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar || null,
      },
    });
  } else {
    res.status(401).json({ message: 'Người dùng chưa đăng nhập' });
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Lấy tất cả dữ liệu từ MongoDB
    res.status(200).json(recipes); // Trả về danh sách món ăn
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Không thể tải danh sách món ăn' });
  }
});

app.get('/api/video-recipes', async (req, res) => {
  try {
    const videoRecipes = await VideoRecipe.find(); // Lấy tất cả dữ liệu từ MongoDB
    res.status(200).json(videoRecipes); // Trả về danh sách món ăn
  } catch (err) {
    console.error('Error fetching video recipes:', err);
    res.status(500).json({ message: 'Không thể tải danh sách món ăn' });
  }
});

app.get('/api/allfood', async (req, res) => {
  try {
    const allFoodItems = await AllFood.find(); // Lấy tất cả dữ liệu từ MongoDB
    res.status(200).json(allFoodItems); // Trả về danh sách món ăn
  } catch (err) {
    console.error('Error fetching all food items:', err);
    res.status(500).json({ message: 'Không thể tải danh sách món ăn' });
  }
});
// Import model Recipe và VideoRecipe
// const Recipe = require("./models/Recipe");
// const VideoRecipe = require("./models/VideoRecipe");

// // Route seed dữ liệu
// app.get("/seed", async (req, res) => {
//   try {
//     // Xóa dữ liệu cũ
//     await Recipe.deleteMany({});
//     await VideoRecipe.deleteMany({});

//     // Dữ liệu mẫu
//     const recipes = [
//       { title: "Italian-style tomato salad", time: "14 minutes", image: "Italian-style tomato.png" },
//       { title: "Vegetable and shrimp spaghetti", time: "15 minutes", image: "Vegetable and shrimp spaghetti.png" },
//       { title: "Lotus delight salad", time: "20 minutes", image: "Lotus delight salad.png" },
//       { title: "Snack cakes", time: "21 minutes", image: "Snack cakes.png" },
//     ];

//     const videoRecipes = [
//       { title: "Salad with cabbage and shrimp", time: "32 minutes", image: "Salad with cabbage.png" },
//       { title: "Bean, shrimp, and potato salad", time: "32 minutes", image: "Bean, shrimp, and potato salad.png" },
//       { title: "Sunny-side up fried eggs", time: "32 minutes", image: "Sunny-side up fried eggs.png" },
//       { title: "Lotus delight salad", time: "32 minutes", image: "Lotus delight salad_01.png" },
//     ];

//     // Thêm dữ liệu mới
//     await Recipe.insertMany(recipes);
//     await VideoRecipe.insertMany(videoRecipes);

//     res.status(200).json({ message: "Seed data successfully added!" });
//   } catch (err) {
//     console.error("Error seeding data:", err);
//     res.status(500).json({ message: "Error seeding data" });
//   }
// });

// Route kiểm tra CORS
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});