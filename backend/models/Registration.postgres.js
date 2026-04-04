const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Registration = sequelize.define('Registration', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.ENUM('Paid', 'Pending'),
    defaultValue: 'Paid'
  },
  participationMode: {
    type: DataTypes.ENUM('Offline', 'Online'),
    defaultValue: 'Offline'
  },
  attendanceStatus: {
    type: DataTypes.ENUM('Registered', 'Attended', 'Absent'),
    defaultValue: 'Registered'
  },
  attendanceMarkedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attendanceMarkedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  hostelAccommodation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'registrations',
  timestamps: true
});

module.exports = Registration;
