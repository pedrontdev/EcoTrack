const SustainableAction = require('../models/SustainableAction');

const createSustainableAction = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newAction = new SustainableAction({
            title,
            description,
            category,
            userId: req.user.userId,
        });
        newAction.calculatePoints();
        await newAction.save();
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar ação sustentável', error });
    }
};

const getAllSustainableActions = async (req, res) => {
    try {
        const actions = await SustainableAction.find({ userId: req.user.userId });
        res.json(actions);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter ações sustentáveis', error });
    }
};

const getSustainableActionById = async (req, res) => {
    const { id } = req.params;
    try {
        const action = await SustainableAction.findById(id);
        if (!action) {
            return res.status(404).json({ message: 'Ação não encontrada' });
        }
        res.json(action);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter ação sustentável', error });
    }
};

const updateSustainableAction = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, points } = req.body;
    try {
        const action = await SustainableAction.findById(id);
        if (!action) {
            return res.status(404).json({ message: 'Ação não encontrada' });
        }
        action.title = title || action.title;
        action.description = description || action.description;
        action.category = category || action.category;
        action.points = points || action.points;
        action.calculatePoints();
  
        await action.save();
        res.json(action);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar ação sustentável', error });
    }
};

const deleteSustainableAction = async (req, res) => {
    const { id } = req.params;
    try {
        const action = await SustainableAction.findById(id);
        if (!action) {
            return res.status(404).json({ message: 'Ação não encontrada' });
        }
        await action.remove();
        res.json({ message: 'Ação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar ação sustentável', error });
    }
};

const countAllActions = async (req, res) => {
    try {
        const count = await SustainableAction.countDocuments();
        res.json({ totalActions: count });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao contar as ações sustentáveis', error });
    }
};

const countTotalPoints = async (req, res) => {
    try {
        const totalPoints = await SustainableAction.aggregate([
            { $group: { _id: null, totalPoints: { $sum: "$points" } } }
        ]);
        if (totalPoints.length > 0) {
            res.json({ totalPoints: totalPoints[0].totalPoints });
        } else {
            res.json({ totalPoints: 0 });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao contar os pontos totais', error });
    }
};
  

module.exports = {
    createSustainableAction,
    getAllSustainableActions,
    getSustainableActionById,
    updateSustainableAction,
    deleteSustainableAction,
    countAllActions,
    countTotalPoints,
};
