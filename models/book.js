'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:"Title is required"
        }
      }
    }, 
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });
  // , {});
  // Book.associate = function(models) {
  //   // associations can be defined here
  // };
  return Book;
};