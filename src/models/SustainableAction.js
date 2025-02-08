const mongoose = require('mongoose');
const sustainableActionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Reciclagem', 'Energia', 'Água', 'Mobilidade'],
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
sustainableActionSchema.methods.calculatePoints = function () {
  let points = 0;
    switch (this.category) {
        case 'Reciclagem':
            points = 10;
        break;
        case 'Energia':
            points = 15;
        break;
        case 'Água':
            points = 20;
        break;
        case 'Mobilidade':
            points = 25;
        break;
        default:
            points = 5;
    }

  this.points = points;
};

const SustainableAction = mongoose.model('SustainableAction', sustainableActionSchema);
module.exports = SustainableAction;
