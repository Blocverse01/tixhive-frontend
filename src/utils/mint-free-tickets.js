var axios = require('axios');
export default async function mintFreeTickets(purchases, event_contract) {
    try {
        var data = JSON.stringify({
            "event_contract": event_contract,
            "purchases": purchases
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_TIXHIVE_API}/mint/free/ticket`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}