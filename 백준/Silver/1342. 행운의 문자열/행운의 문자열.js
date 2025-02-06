const fs = require("fs");
const [input] = fs.readFileSync(0).toString().trim().split("\n");

// 시도1. 같은 것이 있는 순열 모두 구하기 -> 행운의 문자열 필터링 -> 개수 출력: 메모리 초과
// 시도2. 같은 것이 있는 순열 구할 때 행운의 문자열 아닌 것 필터링 -> 개수 출력: 메모리 초과
// 시도3. 백트래킹

// 단어와 개수 저장
const words = input.split("").reduce(
  (cul, cur) => {
    const index = cur.charCodeAt(0) - 97;
    if (cul[index]) cul[index]++;
    else cul[index] = 1;
    return cul;
  },
  Array.from({ length: 27 }, () => 0)
);

// dfs와 백트래킹을 통해 가능한 행운의 문자열 수 구하기
let answer = 0;

const DFS = (index, current) => {
  if (index === input.length) {
    answer++;
    return;
  }

  for (let i = 0; i < 27; i++) {
    if (!words[i]) continue;
    if (current !== "" && current[current.length - 1] === String.fromCharCode(i)) continue;
    words[i]--;
    DFS(index + 1, current + String.fromCharCode(i));
    words[i]++;
  }
};

DFS(0, "");
console.log(answer);
