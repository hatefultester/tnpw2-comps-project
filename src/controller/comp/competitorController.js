const competition = require('./../../model/comp/competitionModel');
const competitor = require('./../../model/comp/competitorModel');

/**
 * Creates new competitor (without results)
 * @param {*} req 
 * @param {*} res 
 */
const addNewCompetitor = async(req, res) => {
    const id = req.query.id;

    const { name } = req.body;

    if (!name) res.status(400).send("Name is required");

    const comp = await competition.findById(id);

    if (!comp) res.status(400).send("Comp ID is Invalid");

    try {
        const newCompetitor = await competitor.create({
            name: name,
            first: null,
            second: null,
            third: null,
            fourth: null,
            fifth: null,
            competitionId: id
        })

        const listOfCompetitors = await competitor.find({ "competitionId": id });
        res.status(200).send(listOfCompetitors);
    } catch (err) {
        console.log(err);
    }
}

/**
 * get All competitors
 * @param {*} req 
 * @param {*} res 
 */
const getAllCompetitors = async(req, res) => {
    const competitors = await competitor.find({});
    res.status(200).json(competitors);
};

/**
 * deleteAll Competitors
 * @param {*} req 
 * @param {*} res 
 */
const deleteAllCompetitors = async(req, res) => {
    const competitors = await competitor.deleteMany({})
    res.status(200).json(competitors);
}

/**
 * Deletes all competitors based on their comp ID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteByCompetitionId = async(req, res) => {
    const id = req.query.id;
    if (!id) return res.status(400).send("No id provided");

    const competitors = await competitor.deleteMany({ "competitionId": id })

    res.status(200).json(competitors);
}

/**
 * Na tohle fakt nejsem pysnej, ale nejak by to melo fungovat :D 
 * @param {*} id 
 * @returns 
 */
const getAllCompetitorsByCompId = async(id) => {
    const competitors = await competitor.find({ "competitionId": id }).lean();
    const competitorsWithResults = [];
    for (let i = 0; i < competitors.length; i++) {

        const results = [competitors[i].first, competitors[i].second, competitors[i].third, competitors[i].fourth, competitors[i].fifth];
        const min = Math.min(...results);

        let averageRounded = "";

        if (competitors[i].first, competitors[i].second, competitors[i].third, competitors[i].fourth, competitors[i].fifth) {
            const max = Math.max(...results);
            const sum = results.reduce((a, b) => a + b, 0);
            const average = (sum - max - min) / 3;
            averageRounded = Math.round(average * 100) / 100
        } else {}

        competitorsWithResults[i] = {
            name: competitors[i].name,
            first: competitors[i].first,
            second: competitors[i].second,
            third: competitors[i].third,
            fourth: competitors[i].fourth,
            fifth: competitors[i].fifth,
            average: averageRounded,
            best: min,
            id: competitors[i]._id
        }
    }

    await competitorsWithResults.sort(compareResults);

    return competitorsWithResults;
}

function compareResults(a, b) {
    if (a.average < b.average && a.average != "" && b.average != "") {
        return -1;
    }
    if (a.average > b.average && a.average != "" && b.average != "") {
        return 1;
    }
    if (a.average === b.average) {
        return 0;
    }
    if (a.average === "") return 1;
    if (b.average === "") return -1;
}

const deleteCompetitor = async(req, res) => {
    const id = req.query.id;
    if (!id) res.status(400).send("ID required");

    const Competitor = await competitor.findByIdAndDelete(id);
    res.status(200).send("User deleted");
}

/**
 * Updates results of competitor
 * @param {*} req 
 * @param {*} res 
 */
const updateResults = async(req, res) => {
    const {
        id,
        first,
        second,
        third,
        fourth,
        fifth
    } = req.body;

    if (!id) res.status(400).send("ID must be provided");

    try {
        const Competitor = await competitor.findById(id);

        if (!Competitor) {
            res.status(400).send("competitor not found");
        }

        if (first) Competitor.first = first;
        if (first) Competitor.second = second;
        if (first) Competitor.third = third;
        if (first) Competitor.fourth = fourth;
        if (first) Competitor.fifth = fifth;

        await Competitor.save();

        res.status(200).send(Competitor);
    } catch (err) { console.log(err); }

}

const getCompetitorById = async(req, res) => {
    const id = req.query.id;

    if (!id) res.status(400).send("No Id provided");

    const Competitor = await competitor.findById(id).lean();

    if (!Competitor) res.status(400).send("Competitor not found");


    res.status(200).json({
        first: Competitor.first,
        second: Competitor.second,
        third: Competitor.third,
        fourth: Competitor.fourth,
        fifth: Competitor.fifth
    });
}

module.exports = {
    deleteAllCompetitors,
    getAllCompetitors,
    addNewCompetitor,
    deleteByCompetitionId,
    updateResults,
    getAllCompetitorsByCompId,
    deleteCompetitor,
    getCompetitorById
}