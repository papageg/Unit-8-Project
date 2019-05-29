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
    author:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:"Author is required"
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });

  // Book.prototype.publishedAt = function () {
  //   return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
  // };
  
  // Book.prototype.shortDescription = function (){ 
  //   return this.body.length > 30 ? this.body.substr(0, 30) + "..." : this.body;
  // };
  return Book;
};