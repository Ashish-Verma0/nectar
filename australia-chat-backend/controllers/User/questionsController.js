const Questions = require("./../../models/User/questionsModel");
const User = require("./../../models/User/userModel");

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    if (questions && !(questions.length === 0)) {
      res.status(200).json({
        status: "success",
        message: "Successfully",
        questions,
      });
    } else {
      const createQuestions = await Questions.create([
        {
          quesNo: 1,
          questions: `If I was driving to ....... I would be listening to ..........`,
        },
        {
          quesNo: 2,
          questions: `If I had to give up one luxury item/habit for one month, to raise money for ......... it would be .......`,
        },
        {
          quesNo: 3,
          questions: ` If I can solve one societal issue, it would be .........`,
        },
        {
          quesNo: 4,
          questions: `On a sunday afternoon, you would find me............`,
        },
        {
          quesNo: 5,
          questions: ` If I can describe the last 2 years through a movie title it would be ...........`,
        },
        {
          quesNo: 6,
          questions: `Traditional dating to me, means.....`,
        },
        {
          quesNo: 7,
          questions: `New age dating to me, means......`,
        },
        {
          quesNo: 8,
          questions: `One thing I want to do before I die is.....`,
        },
        {
          quesNo: 9,
          questions: `My favorite holiday of the year is ....... because.....`,
        },
        {
          quesNo: 10,
          questions: `Valentine's day to me, means .....`,
        },
        {
          quesNo: 11,
          questions: `If I'm having a bad day, .......... helps me relax`,
        },
        {
          quesNo: 12,
          questions: `If a movie was made about my life, it would be called ........, played by ........`,
        },
        {
          quesNo: 13,
          questions: `If I could give advice to a 16 year old me, it would be ..........`,
        },
        {
          quesNo: 14,
          questions: `Everyday I am grateful for .............`,
        },
      ]);
      res.status(200).json({
        status: "success",
        message: "Successfully",
        questions: createQuestions,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.questions = async (req, res) => {
  try {
    const { userId, questionsArray } = req.body;
    if (questionsArray && userId) {
      const user = await User.findById(userId);
      if (user) {
        if (questionsArray.length >= 3) {
          user.questions = questionsArray;
          await user.save();
          res.status(200).json({
            status: "success",
            message: "Successfully save",
          });
        } else {
          res.status(400).json({
            status: "bad request",
            message: "Give at least 3 questions",
          });
        }
      } else {
        res.status(404).json({
          status: "not found",
          message: "User not found",
        });
      }
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "incomplete data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal server Error",
    });
  }
};
