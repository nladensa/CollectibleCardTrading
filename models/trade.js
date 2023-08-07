const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    card: {type: String, required: [true, 'card is required'],
            minlength: [4, 'the card name should have at least 4 characters']},
    tcg: {type: String, required: [true, 'TCG is required']},
    condition: {type: String, required: [true, 'condition is required']},
    rarity: {type: String, required: [true, 'rarity is required']},
    set: {type: String, required: [true, 'set is required']}
},
{timestamps: true}
);
//collection name is trades in database
module.exports = mongoose.model('Trade', tradeSchema);  