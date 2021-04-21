import hostReview from '../model/hostReviewModel.js';

export const addNew = (req, res) => {
    const { guest_id, host_id, hostName, adherenceRating, cleanlinessRating, communicationRating,
        overallRating, recommend, publicReview, PrivateReview } = req.body;

    const tdate = new Date();
    const date = `${tdate.getDate()}/${tdate.getMonth()+1}/${tdate.getFullYear()}`;

    const newReview = new hostReview({guest_id, host_id, hostName, date, adherenceRating, cleanlinessRating, communicationRating,
        overallRating, recommend, publicReview, PrivateReview });

    newReview.save();

    return res.status(200).send("Review added successfully");
}

export const getReview = (req, res) => {
    const id = req.params.id;

    hostReview.find({guest_id:id}, (err, data) => {
        if(err) throw err;

        return res.status(200).send(data)
    })
}