const mongoose = require('mongoose')
const util = require('util')
const data = require('./data.json')
const [, , practice, command] = process.argv

const db = mongoose.connect('mongodb://127.0.0.1:27017/store');

const Product = mongoose.model('products', {
    type: String,
    title: String,
    description: String,
    shipping: Object,
    pricing: Object,
    details: Object
})

if (Number(practice) === 2) {
    switch (command) {
        case 'A': // create one
            Product.create(data[0], function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, { showHidden: false, depth: null, colors: true }))
                process.exit(0)
            })
            break
        case 'B': // create many
            restData = data.slice(1)
            Product.insertMany(restData, function (err, products) {
                if (err) return console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break
        default:
            console.log('Invalid command.')
    }
}

if (Number(practice) === 3) {
    switch (command) {
        case 'A': // show documents
            Product.find({}, function (err, products) {
                mongoose.connection.close()
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'B': // show pretty documents
            Product.find(function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'C': // show documents without _id
            Product.find({}, { _id: false }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'D': // show, type: Audio Album
            Product.find({ type: "Audio Album" }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'E': // show, pricing.retail < 5000
            Product.find({ "pricing.retail": { $lt: 5000 } }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'F': // show, type != Film
            Product.find({ type: { $ne: "Film" } }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'G': // show, shipping.weight > 15
            Product.find({ "shipping.weight": { $gt: 15 } }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'H': // update, pricing.list = 2500
            Product.updateOne({ "details.title": "The Matrix" }, { "pricing.list": 2500 }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'I': // show, type = Film and shipping.dimenstions.depth = 1
            Product.find({
                $and: [
                    { type: "Film" },
                    { "shipping.dimensions.depth": 1 }
                ]
            }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'J': // count, documents with type = Film
            Product.count({ type: "Film" }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'K': // show, details.writer = Jonathan Nolan
            Product.find({ "details.writer": { $regex: "Jonathan Nolan" } }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'L': // show, max pricing.savings
            Product.find({}).sort("-pricing.savings").limit(1).exec(function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'M': // show, details.title includes x
            Product.find({ "details.title": { $regex: "x" } }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        case 'N': // delete, details.aspect_ratio = 1.66:1
            Product.deleteOne({ "details.aspect_ratio": "1.66:1" }, function (err, products) {
                if (err) console.log(err)
                console.log(util.inspect(products, false, null, true))
                process.exit(0)
            })
            break

        default:
            console.log('Invalid command.')
    }
}
