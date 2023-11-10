const Expence = require('../models/Expence')
const User = require('../models/User')
const sequelize = require('../util/database')

exports.addExpence = async (req, res, next) => {
  const { expenceAmount, expenceDescription, expenceCategory } = req.body;
  const userId = req.user.id;
  const t = await sequelize.transaction();
  const prevExpence = Number(req.user.totalExpence)
  const newExpence = prevExpence + Number(expenceAmount);

  try {
    await Expence.create({ expenceAmount, expenceDescription, expenceCategory, userId }, { transaction: t })
    await User.update({ totalExpence: newExpence }, {
      where: {
        id: userId
      },
      transaction: t

    });
    await t.commit();
    res.status(200).json("expence added")
  } catch (error) {
    await t.rollback();
    res.json(error)
  }

}

exports.getExpence = async (req, res, next) => {

  try {
    const expences = await Expence.findAll({
      where: {
        userId: req.user.id
      }
    })
    return res.json(expences)
  } catch (error) {
    return res.json(error)
  }
}

exports.deleteExpence = async (req, res, next) => {
  const expenceId = req.params.id;
  const userId = req.user.id;
  const t = await sequelize.transaction();
  try {
    const expence = await Expence.findByPk(expenceId, {
      attributes: ['expenceAmount']
    })
    const expenceAmount = Number(expence.expenceAmount)
    const user = await User.findByPk(userId, {
      attributes: ['totalExpence']
    })
    const totalExpence = Number(user.totalExpence);
    const newTotalExpence = totalExpence - expenceAmount;
    console.log(newTotalExpence)

    await Expence.destroy({
      where: {
        id: expenceId
      },
      transaction: t
    });
    await User.update({ totalExpence: newTotalExpence }, {
      where: {
        id: userId
      },
      transaction: t

    });
    await t.commit()
    res.status(200).json(`id ${expenceId} successfully deleted`)
  } catch (error) {
    await t.rollback()
    console.log(error)
  }
}