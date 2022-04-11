const competition = require('./../model/comp/competitionModel');


const createCompetition = async() => {
    try {

        const { name, date, shortDescription, description } = req.body;

        if (!(name && date && description)) return res.status(400).send("Name, Date and Description are required !");

        const newCompetition = await competition.create({
            name: name,
            date: date,
            events: null,
            competitors: null,
            shortDescription: shortDescription,
            description: description,
        });

        res.status(200).json(newCompetition);

    } catch (err) {
        console.log(err);
    }
}

const getListOfCompetitions = async() => {
    const comps = await competition.find({});
    const reduced = comps.map(reduceCompInfo);
    console.log(reduced);
    return reduced;
};

const getAllCompetitions = async(req, res) => {
    try {
        const comps = await competition.find({});
        res.status(200).json(comps);
    } catch (err) {
        console.log(err);
    }
};

function reduceCompInfo(comp) {
    return {
        "name": comp.name,
        "date": comp.date,
        "shortDescription": comp.shortDescription,
        "id": comp.id
    };
};

// TODO

router.get('/get', async(req, res) => {
    const { id } = req.params.id || req.body;
    const comp = await competition.findById(id);
    if (comp) res.status(200).json(comp)
    else res.status(400).send("Not found");
});


// delete comp by id
router.delete('/delete', async(req, res) => {
    const { id } = req.params.id || req.body;
    const comp = await competition.findById(id);
    if (comp) {
        competition.findByIdAndDelete(id);
        res.status(200).send("Deleted");
    } else res.status(400).send("Not found");
});



// deletes all competitions in json
router.delete('/deleteAll', auth, async(req, res) => {
    const comps = await competition.deleteMany({});
    res.status(200).json(comps);
});


module.exports = { getListOfCompetitions };