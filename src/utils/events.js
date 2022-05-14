const Moralis = require("moralis");

const getEventByContract = async(contractAddress) => {
    const query = new Moralis.Query("Event");
    query.equalTo("contractAddress", contractAddress);
    return await query.find();
}