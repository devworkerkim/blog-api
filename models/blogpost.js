const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogpostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String },
    date_created: { type: Date, default: new Date() },
    comments: { type: [{
        author: { type: String, required: true },
        date_created: { type: Date, default: new Date() },
        body: { type: String, required: true }
        }], default: []},
    publish: { type: Boolean, default: true }
});

module.exports = mongoose.model('blogpost', BlogpostSchema);