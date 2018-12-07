const csvFilePath = "sampleDataSheet.csv";
const csv = require("csvtojson");
const moment = require("moment");

async function convertCSVToJson(csvFilePath) {
  const jsonArray = await csv().fromFile(csvFilePath);
  return jsonArray;
}

async function main() {
  let usersArray = await convertCSVToJson(csvFilePath);
  //Q1
  console.log("Q1");
  let currentMaxUserId;
  let currentMax = 0;
  usersArray.forEach(user => {
    if (Number(user.paid.substring(1)) > currentMax) {
      currentMax = Number(user.paid.substring(1));
      currentMaxUserId = user.id;
    }
  });
  console.log(`Max Amount $${currentMax} paid by userID ${currentMaxUserId}`);

  //Q2
  console.log("Q2");
  let sum = 0;
  let numOfUsers = 0;
  usersArray.forEach(user => {
    if (Number(user.apprentices) >= 3) {
      numOfUsers++;
      sum = sum + Number(user.paid.substring(1));
    }
  });
  let average = sum / numOfUsers;
  console.log("Average amount by users with 3 or more apprentices: $", average);

  //Q3 Problem understanding the date
  usersArray.forEach(user => {
    // console.log(moment().format(user.created_at));
  });

  //Q4 Problem understanding the date

  //Q5
  console.log("Q5");
  let candidiatesObject = {};
  usersArray.forEach(user => {
    let candidiates = user.candidates;
    if (candidiatesObject[candidiates]) {
      candidiatesObject[candidiates] = candidiatesObject[candidiates] + 1;
    } else {
      candidiatesObject[candidiates] = 1;
    }
  });
  console.log(
    "Format: CandidatesCount : Number of Users With That Candidates Count"
  );

  const candidiatesObjectArray = Object.keys(candidiatesObject).map(
    i => candidiatesObject[i]
  );
  console.log(candidiatesObject);
  console.log(
    "The index represent the candidate count, while the actual value represent the number of users with that candidate count"
  );
  console.log(candidiatesObjectArray);
}

main();
