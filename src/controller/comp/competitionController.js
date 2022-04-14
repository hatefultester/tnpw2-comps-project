const competition = require('../../model/comp/competitionModel');


const createCompetition = async(req, res) => {

    const {
        name,
        date,
        shortDescription,
        description
    } = req.body;

    if (!(name && date && description)) return res.status(400).send("Name, Date and Description are required !");

    try {

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

/* GET */

const getCompetition = async(req, res) => {
    try {
        const { id } = req.params.id || req.body;
        const comp = await competition.findById(id);
        if (comp) res.status(200).json(comp)
        else res.status(400).send("Not found");
    } catch (err) {
        console.log(err);
    }
};

const getAllCompetitions = async(req, res) => {
    try {
        const comps = await competition.find({});
        res.status(200).json(comps);
    } catch (err) {
        console.log(err);
    }
};

const getListOfCompetitions = async() => {
    try {
        const comps = await competition.find({});
        const reduced = comps.map(reduceCompInfo);
        console.log(reduced);
        return reduced;
    } catch (err) {
        console.log(err);
    }
};

/* Delete */

const deleteCompetition = async(req, res, next) => {
    try {
        const { id } = req.params.id || req.body;
        const comp = await competition.findById(id);
        if (comp) {
            competition.findByIdAndDelete(id);
            res.status(200).send("Deleted");
        } else res.status(400).send("Not found");
    } catch (err) {
        console.log(err);
    }
};

const deleteAll = async(req, res, next) => {
    try {
        const comps = await competition.deleteMany({});
        res.status(200).json(comps);
    } catch (err) {
        console.log(err);
    }
}

/* Helpers */

function reduceCompInfo(comp) {
    return {
        "name": comp.name,
        "date": comp.date,
        "shortDescription": comp.shortDescription,
        "id": comp.id
    };
};

module.exports = {
    createCompetition,
    getAllCompetitions,
    getCompetition,
    deleteCompetition,
    deleteAll,
    getListOfCompetitions
};