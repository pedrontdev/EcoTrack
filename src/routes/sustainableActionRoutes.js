const express = require('express');
const {
    createSustainableAction,
    getAllSustainableActions,
    getSustainableActionById,
    updateSustainableAction,
    deleteSustainableAction,
    countAllActions,
    countTotalPoints,
} = require('../controllers/sustainableActionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createSustainableAction);
router.get('/', protect, getAllSustainableActions);
router.get('/:id', protect, getSustainableActionById);
router.put('/:id', protect, updateSustainableAction);
router.delete('/:id', protect, deleteSustainableAction);

router.get('/total-points', countTotalPoints);
router.get('/count', countAllActions);

module.exports = router;