// takes textarea text and makes it sound angry
function angrify(data) {
  data = data.toUpperCase();
  data += generateRandomProfanity();
  return data;
  // return data.toUpperCase() += generateRandomProfanity()
}

// generates random string of profanity, followed by exclamation marks
function generateRandomProfanity() {
  let profanity = " ";
  const characters = "!@#$%&*#$%#!@!";

  for (let i = 0; i < 5; i++) {
    profanity += characters.substr(Math.floor((Math.random() * characters.length)), 1);
  }
  return profanity + "!!!";
}