const competition = require('../../model/comp/competitionModel');
/**
 * 
 * @param {Name, date, shortDescription, description} req 
 * @param {*} res 
 * new competition is created;
 */
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
            competitors: null,
            shortDescription: shortDescription,
            description: description,
        });

        res.status(200).json({ id: newCompetition._id });

    } catch (err) {
        console.log(err);
    }
}

/**
 * For updating everything in competition model
 * @param {} req 
 * @param {*} res 
 */
const updateCompetition = async(req, res) => {
    const {
        name,
        date,
        shortDescription,
        description
    } = req.body;

    const id = req.body.id || req.params.id;

    if (!name && !date && !shortDescription && !description && !competitors && !events) {
        res.status(400).send("At least something has to be edited");
    }

    if (!id) {
        res.status(400).send("ID of competition must be provided");
    }

    try {
        const comp = await competition.findById(id);

        if (name) { comp.name = name; }
        if (date) comp.date = date;
        if (shortDescription) comp.date = shortDescription;
        if (description) comp.description = description;

        await comp.save();
        res.status(200).send(comp);
    } catch (err) {
        console.log(err);
    }
}


/**
 * Get competition by ID
 * @param {*} req 
 * @param {*} res 
 */
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


/**
 * Get All competitions
 * @param {*} req 
 * @param {*} res 
 */
const getAllCompetitions = async(req, res) => {
    try {
        const comps = await competition.find({});
        res.status(200).json(comps);
    } catch (err) {
        console.log(err);
    }
};


/**
 * 
 * @returns Reduced list of competitions for dashboard
 */
const getListOfCompetitions = async() => {
    try {
        const comps = await competition.find({});
        const reduced = comps.map(reduceCompInfo);

        return reduced;
    } catch (err) {
        console.log(err);
    }
};


/**
 * delete competition by competition id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteCompetition = async(req, res) => {
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


/**
 * deletes all competitions
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteAll = async(req, res, next) => {
    try {
        const comps = await competition.deleteMany({});
        res.status(200).json(comps);
    } catch (err) {
        console.log(err);
    }
}


/* Helpers */

/**
 * Reduces competition info (only name, date, short desc)
 * @param {*} comp 
 * @returns 
 */

function reduceCompInfo(comp) {
    return {
        "name": comp.name,
        "date": comp.date,
        "shortDescription": comp.shortDescription,
        "id": comp.id
    };
};

const getCompetitionDetails = async(id) => {
    const comp = await competition.findById(id);
    return comp;
};



module.exports = {
    createCompetition,
    getAllCompetitions,
    updateCompetition,
    getCompetition,
    deleteCompetition,
    deleteAll,
    getCompetitionDetails,
    getListOfCompetitions
};