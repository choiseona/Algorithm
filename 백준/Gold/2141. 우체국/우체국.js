const fs = require("fs");
const [meta, ...array] = fs.readFileSync(0).toString().trim().split("\n");
const N = Number(meta);
const cities = array.map((row) => row.split(" ").map(Number));

// 우체국 기준 왼쪽, 오른쪽 인구 수가 비슷해야 각 사람들까지의 거리 합이 최소가 됨

// 위치 기준 정렬
cities.sort((a, b) => a[0] - b[0]);

// 전체 인구 수
const totalPopulation = cities.reduce((acc, [_, count]) => acc + count, 0);

// 왼쪽 오른쪽 인구 수 비슷한 위치 찾기
let answer;
let accumulatedPopulation = 0;
for (let i = 0; i < N; i++) {
  accumulatedPopulation += cities[i][1];
  if (accumulatedPopulation >= totalPopulation / 2) {
    answer = cities[i][0];
    break;
  }
}

console.log(answer);
