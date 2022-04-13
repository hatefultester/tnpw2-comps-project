const competition = require('../../model/comp/competitionModel');


const createCompetition = async(req, res) => {
    try {

        const {
            name,
            date,
            shortDescription,
            description
        } = req.body;

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

const editCompetition = async(req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'date', 'shortDescription', 'description', 'events', 'competitors'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, new: true, runValidators: true })
            if (!task) {
                return res.status(404).send()
            }
            updates.forEach((update) => task[update] = req.body[update])
            await task.save()
            res.send(task)
        } catch (e) {
            res.status(400).send(e)

        }



    } catch (err) {
        console.log(err);
    }
};

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