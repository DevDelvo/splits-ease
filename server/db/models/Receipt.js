const db = require('../db')
const Sequelize = require('sequelize')

const Receipt = db.define('receipt', {
  vendor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  venderAddress: {
    type: Sequelize.Sequelize.STRING,
    allowNull: true,
  },
})

module.exports = Receipt
