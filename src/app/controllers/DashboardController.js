const Collaborator = require('../models/CollaboratorModel');
const Achieviment = require('../models/AchiviementModel');
const CategoriesType = require('../../contants/CategoriesType');

class DashboardController {
    async index(request, response) {
        const userIdLogged = request.userIdLogged;

        const { _id: collaboratorId, own_claps, available_claps } = await Collaborator.findOne({ user: userIdLogged });

        const badges = Object.values(CategoriesType).map(category => ({
            _id: String(Date.now()),
            category_type: category,
            level: 0,
        }));

        const achieviments = await Achieviment.find({ collaborator: collaboratorId });

        achieviments.forEach(achievement => {
            badges.forEach((badge, badgeIndex) => {
                if (achievement.name === badge.category_type) {
                    badges[badgeIndex] = {
                        _id: achievement._id,
                        category_type: achievement.name,
                        level: achievement.level,
                    };
                }
            });
        });

        return response.json({ own_claps, available_claps, badges });
    }
}

module.exports = new DashboardController();
