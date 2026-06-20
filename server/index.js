import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3000;
const secret = 'GharKaBite_ _secret_key';
const dbPath = path.resolve('server/data/db.json');

app.use(cors());
app.use(express.json());

const readDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDb = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

const generateToken = (user) => jwt.sign({ id: user.id }, secret, { expiresIn: '12h' });
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authorization required' });
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/api/auth/signup', (req, res) => {
  const { name, email, mobile, password } = req.body;
  const db = readDb();
  const existing = db.users.find((user) => user.email === email);
  if (existing) return res.status(400).json({ message: 'Email already registered' });
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: db.users.length + 1, name, email, mobile, password: hashedPassword };
  db.users.push(newUser);
  writeDb(db);
  return res.status(201).json({ message: 'Signup successful' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find((item) => item.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile } });
});

app.get('/api/restaurants', (req, res) => {
  const db = readDb();
  res.json(db.restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const db = readDb();
  const restaurant = db.restaurants.find((item) => item.id === Number(req.params.id));
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(restaurant);
});

app.get('/api/dishes', (req, res) => {
  const db = readDb();
  res.json(db.dishes);
});

app.get('/api/dishes/:id', (req, res) => {
  const db = readDb();
  const dish = db.dishes.find((item) => item.id === Number(req.params.id));
  if (!dish) return res.status(404).json({ message: 'Dish not found' });
  res.json(dish);
});

app.get('/api/search', (req, res) => {
  const { q } = req.query;
  const db = readDb();
  const query = String(q || '').toLowerCase();
  const dishes = db.dishes.filter((dish) => dish.name.toLowerCase().includes(query) || dish.restaurant.toLowerCase().includes(query));
  res.json(dishes);
});

app.post('/api/orders', authMiddleware, (req, res) => {
  const { items, shipping, payment } = req.body;
  if (!items?.length) return res.status(400).json({ message: 'Cart cannot be empty' });
  const db = readDb();
  const order = {
    id: db.orders.length + 1,
    userId: req.userId,
    items,
    shipping,
    payment,
    createdAt: new Date().toISOString(),
    status: 'CONFIRMED',
  };
  db.orders.push(order);
  writeDb(db);
  return res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
});

app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}/api`);
});
