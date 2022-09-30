const Diary = require("../../models/User/diaryModel");
const User = require("../../models/User/userModel");

exports.createDiary = async ({ userInput }, req) => {
  const { date, title, description, userId } = userInput;
  const newDiary = await Diary.create({
    date,
    title,
    description,
    user: userId,
  });
  const user = await User.findById(userId);
  user.diary.push(newDiary._id);
  const diary = await newDiary.save();
  user.save();
  return diary;
};

exports.getOneDiary = async ({ userInput }, req) => {
  const diary = await Diary.findById(userInput.diaryId);
  return diary;
};

exports.getUserDiary = async ({ userInput }, req) => {
  try {
    const diarys = [];
    const user = await User.findById(userInput.userId);
    for (let i = 0; i < user.diary.length; i++) {
      diarys.push(await Diary.findById(user.diary[i]));
    }
    return diarys;
  } catch {
    console.log("error");
  }
};
exports.editDiary = async ({ userInput }, req) => {
  const { date, title, description, diaryId } = userInput;
  const diary = await Diary.findByIdAndUpdate(diaryId, {
    date: date,
    title: title,
    description: description,
  });
  return diary;
};

exports.deleteDiary = async ({ userInput }, req) => {
  try {
    const { diaryId } = userInput;
    const diary = await Diary.findById(diaryId);
    const user = await User.findById(diary.user);
    await user.save();
    await Diary.findByIdAndDelete(diaryId);
    const mgs = "deleted";
    return mgs;
  } catch (error) {
    const mgs = "Not Found";
    return mgs;
  }
};
