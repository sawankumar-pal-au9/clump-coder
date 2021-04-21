import guestReview from '../model/guestReviewModel.js';

export const addNew = (req, res) => {
    const { guest_id, host_id, guestName, hospitalityRating, cleanlinessRating, communicationRating,
        locationRating, valueRating, overallRating, publicReview, PrivateReview } = req.body;

    const tdate = new Date();
    const date = `${tdate.getDate()}/${tdate.getMonth()+1}/${tdate.getFullYear()}`;

    const newReview = new guestReview({ guest_id, host_id, guestName, date, hospitalityRating, cleanlinessRating, communicationRating, locationRating, valueRating, overallRating, publicReview, PrivateReview });

    newReview.save();

    return res.status(200).send("Review added successfully");
}

export const getReview = (req, res) => {
    const id = req.params.id;

    guestReview.find({host_id:id}, (err, data) => {
        if(err) throw err;

        return res.status(200).send(data)
    })
}