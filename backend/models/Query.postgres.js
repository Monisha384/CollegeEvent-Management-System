const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Query = sequelize.define('Query', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id'
    }
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studentEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Answered'),
    defaultValue: 'Pending'
  },
  adminResponse: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  respondedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  respondedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'queries',
  timestamps: true
});

module.exports = Query;
