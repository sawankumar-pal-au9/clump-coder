import mongoose from 'mongoose';

const guestReviewSchema = new mongoose.Schema({
    guest_id: String,
    host_id: String,
    guestName: String,
    date: String,
    hospitalityRating: Number,
    cleanlinessRating: Number,
    communicationRating: Number,
    locationRating: Number,
    valueRating: Number,
    overallRating: Number,
    publicReview: String,
    PrivateReview: String
});

const guestReview = new mongoose.model('guestReview', guestReviewSchema);

export default guestReview;