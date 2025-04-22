// 6:45 시작
const fs = require("fs");
const [words, bombs] = fs.readFileSync(0).toString().trim().split("\n");

// 메모뤼 초과
/* while (true) {
  const isExist = words.includes(bombs);
  if (isExist) words = words.replace(bombs, "");
  else break;
}

[...words.trim()].length === 0 ? console.log("FRULA") : console.log(words);
 */

// stack
const stack = [];

for (const word of words) {
  stack.push(word);

  if (bombs.length > stack.length) continue;
  else {
    const bombedWords = stack.slice(-bombs.length).join("");
    if (bombedWords === bombs) stack.splice(-bombs.length);
  }
}

const answer = stack.join("").trim();
answer.length === 0 ? console.log("FRULA") : console.log(answer);
