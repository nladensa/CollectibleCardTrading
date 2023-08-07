const model = require('../models/trade');
const Trade = require('../models/trade');

exports.trades = (req, res, next)=>{
    model.find()
    .then(trades=>res.render('./trade/trades', {trades}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./trade/newTrade');
};

exports.create = (req, res, next)=>{
    let trade = new model(req.body);
    trade.author = req.session.user;
    trade.save()
    .then(trade=>res.redirect('/trades'))
    .catch(err=>{
        if(err.name ==='ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res)=>{
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
    .then(trade=>{
        if (trade) {
            return res.render('./trade/trade', {trade});
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(trade=>{
        if (trade) {
            return res.render('./trade/edit', {trade});
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let trade = req.body;
    let id = req.params.id;
    model.findByIdAndUpdate(id, trade, {useFindAndModify: false, runValidators: true})
    .then(trade=>{
        if (trade) {
            res.redirect('/trades/' + id);
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name ==='ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(trade=>{
        if (trade) {
            res.redirect('/trades');
        } else {
            let err = new Error('Cannot find a trade with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};