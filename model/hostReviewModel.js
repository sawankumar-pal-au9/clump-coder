import mongoose from 'mongoose';

const hostReviewSchema = new mongoose.Schema({
    host_id: String,
    guest_id: String,
    hostName: String,
    date: String,
    adherenceRating: Number,
    cleanlinessRating: Number,
    communicationRating: Number,
    overallRating: Number,
    recommend: String,
    publicReview: String,
    PrivateReview: String
});

const hostReview = new mongoose.model('hostReview', hostReviewSchema);

export default hostReview;