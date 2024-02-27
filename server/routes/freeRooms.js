const axios = require('axios');
const express = require('express');
const router = express.Router();
let Roomsr = require("../models/rooms");
router.use(express.json());

const getRtidsFromDb = async () => {
    try {
        let rooms = await Roomsr.find({});
        console.log(rooms.map(room => room.wubid))
        return rooms.map(room => room.wubid);
    } catch (error) {
        console.error('Error getting wubids from the database:', error.message);
        throw error;
    }
};

router.post("/", async (req, res) => {
    console.log("FREEROOMS SERVER ROUTE");
    try {
        const { dfrom, dto } = req.body;
        if (!dfrom || !dto) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const wubids = await getRtidsFromDb();

        const authHeader = `Basic ${Buffer.from("wb_5dc6d45a-5f50-11ec-acc7-001a4a908fff" + ":").toString("base64")}`;

        // Array to store responses for each wubid
        const responses = [];

        // Loop through each wubid and make a request
        for (const wubid of wubids) {
            const response = await axios.post(
                "https://kapi.wubook.net/kapi/avail/get_by_roomtype",
                { dfrom, dto, rtid: wubid },
                {
                    headers: {
                        Authorization: authHeader,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            responses.push(response.data);
        }

        // Find the indices of arrays where 0 is present as the first value
        const indicesOfUnavailable = responses.reduce((acc, response, index) => {
            if (response.data[0] === 1) {
                acc.push(index);
            }
            return acc;
        }, []);

        // If found, return the room data for those indices
        if (indicesOfUnavailable.length > 0) {
            const roomData = await Roomsr.find({ wubid: { $in: wubids.filter((_, index) => indicesOfUnavailable.includes(index)) } });
            res.json({ data: roomData });
        } else {
            res.json({ data: [] }); // or handle the case when no array with 0 is found
        }
    } catch (error) {
        console.error("Error making the request:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
