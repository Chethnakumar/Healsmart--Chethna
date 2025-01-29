const Query = require('../model/query-model');

// Create a new query
const createQuery = async (req, res) => {
    try {
        const {writequery } = req.body;

        // Validate request body
        if (!writequery) {
            return res.status(400).json({ message: 'query required' });
        }

        const newQuery = new Query({ writequery });
        const savedQuery = await newQuery.save();

        res.status(201).json({ message: 'Query created successfully', data: savedQuery });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create query', error: error.message });
    }
};

// Get all queries
const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json({ message: 'Queries retrieved successfully', data: queries });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve queries', error: error.message });
    }
};

// Get a query by ID
const getQueryById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = await Query.findById(id);

        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        res.status(200).json({ message: 'Query retrieved successfully', data: query });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve query', error: error.message });
    }
};


module.exports = {
    createQuery,
    getAllQueries,
    getQueryById,
};