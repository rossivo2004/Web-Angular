const productsModel = require('../model/productsModel');

exports.getAllProducts = async (query) => {
    console.log(query);
    let limit = 10;

    if (query && Object.keys(query).length !== 0) {
        const { keyword, tagname, limit } = query;
        let queries = {};

        if (keyword) {
            queries.name_pr = { $regex: new RegExp(keyword, 'i') };
        }

        if (tagname) {
            queries.category_pr_tag = tagname; // This should be a direct match condition
        }
        console.log(queries);
        return await productsModel.find(queries).limit(limit);
    } else {
        return await productsModel.find().limit(limit);
    }
};