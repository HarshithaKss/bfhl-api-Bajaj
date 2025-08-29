const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const FULL_NAME = "Kommareddy Sai Shiva Harshitha"; 
const DOB = "21032005"; 
const EMAIL = "kommareddy.sai2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE3531";


function isNumber(str) {
  return /^[0-9]+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecial(str) {
  return !isNumber(str) && !isAlphabet(str);
}

function alternatingCaps(str) {
  let res = '';
  let upper = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let ch = str[i];
    if (/[a-zA-Z]/.test(ch)) {
      res += upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
    }
  }
  return res;
}


app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data || [];
    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alpha_concat = '';

    data.forEach(item => {
      if (isNumber(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        alpha_concat += item;
      } else if (isSpecial(item)) {
        special_characters.push(item);
      }
    });

    const concat_string = alternatingCaps(alpha_concat);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase().replace(/\s+/g, "_")}_${DOB}`, // 🔹 underscores for spaces
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error"
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running. Use POST /bfhl");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
