'use strict';
//This is where we create the books information
//The book holds four peices of info title,author,genre and year
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title:{
      type: DataTypes.STRING,
      validate: { //validate makes sure to check if the text field has a title in it.
        notEmpty: {
          msg:"Title is required" //This message will display if the validation returns saying there is no input in the feild
        }
      }
    }, 
    author:{
      type: DataTypes.STRING,
      validate: { //validate makes sure to check if the text field has a title in it.
        notEmpty: {
          msg:"Author is required" //This message will display if the validation returns saying there is no input in the feild
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });

  return Book;
};