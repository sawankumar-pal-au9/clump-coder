import express from 'express';
import cors from 'cors';
import * as path from 'path';
import session from 'express-session';
import user from './routes/userRoutes.js';
import guestReview from './routes/guestReviewRoutes.js';
import hostReview from './routes/hostReviewRoutes.js';
import './db/db.js';

const app = express();
const PORT = process.env.PORT || 9800;

app.use(express.json())
app.use(cors());

app.use(session({
    'secret': 'mysession'
}));

// Health check
app.get('/health', (req,res) => {
    res.send("Health OK!!")
});

app.use('/users', user);
app.use('/guestReview', guestReview);
app.use('/hostReview', hostReview);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./view/client/build'));
  
    const __dirname = path.resolve();
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'view', 'apartment-review', 'build', 'index.html'), (err) => {
        if(err) {
          return res.status(404).send(err);
        }
      })
    });
};
  
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});