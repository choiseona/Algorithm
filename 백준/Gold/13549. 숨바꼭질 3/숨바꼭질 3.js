const fs = require("fs");
const [meta] = fs.readFileSync(0).toString().trim().split("\n");
const [N, K] = meta.split(" ").map(Number);

// N: 수빈 위치, 걷거나(1초 후 X-1 X+1) 순간이동(0초 후 2*X)
// K: 동생 위치
// 수빈이가 동생을 찾을 수 있는 가장 빠른 시간

const BFS = (start, end) => {
  const MAX_LENGTH = 100000;
  const walkDirections = [-1, 1];
  const visited = Array.from({ length: MAX_LENGTH + 1 }, () => Infinity);
  const queue = [start]; // [위치, 시간]
  visited[start] = 0;

  while (queue.length > 0) {
    const pos = queue.shift();
    const time = visited[pos];
    if (pos === end) return time;

    const newPos = pos * 2;
    if (newPos >= 0 && newPos <= MAX_LENGTH && visited[newPos] > time) {
      queue.unshift(newPos);
      visited[newPos] = time;
    }

    for (const direction of walkDirections) {
      const newPos = pos + direction;
      if (newPos < 0 || newPos > MAX_LENGTH) continue;
      if (visited[newPos] <= time) continue;

      queue.push(newPos);
      visited[newPos] = time + 1;
    }
  }
};

const minTime = BFS(N, K);
console.log(minTime);
