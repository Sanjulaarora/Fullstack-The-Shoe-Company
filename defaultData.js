const Items = require("./models/itemsSchema");
const itemsData = require("./constant/itemsData");

const DefaultData = async() => {
    try {

        await Items.deleteMany({});

        const storeData = await Items.insertMany(itemsData);
        console.log(storeData);
    } catch (error) {
        console.log("error" + error.message);
    }
};


module.exports = DefaultData;