const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 80;

const { getWashroomData, enterVote } = require('./database');

app.get('/', (req, res) => {
    res.render("index.ejs")
})
app.use(express.static("public"))

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/data/getspecificdata/:washroomID/:openOrNotBoolean', async (req, res) => {
    const washroomID = req.params.washroomID;
    const openOrNotBoolean = req.params.openOrNotBoolean;
    const washroomData = await getWashroomData(washroomID, openOrNotBoolean);
    if (washroomData) {
        res.json(washroomData);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});


app.post('/data/createdata', (req, res) => {
    try {
        const Specified_Bathroom = req.body.Specified_Bathroom;
        const openOrNotBoolean = req.body.openOrNotBoolean;
        console.log(Specified_Bathroom, openOrNotBoolean);
        const dataCreatedResponse = enterVote(Active, Student_First_Name);
        res.status(200).json(dataCreatedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Data creation failed' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});