const fs = require("fs");
const [N, ...array] = fs.readFileSync(0).toString().trim().split("\n");

const graph = Array.from({ length: Number(N) + 1 }, () => ({ time: 0, degree: 0, next: [] }));
const result = Array.from({ length: Number(N) + 1 }, () => 0);

array.forEach((element, index) => {
  const [time, ...pre] = element.split(" ").map(Number).slice(0, -1);

  graph[index + 1].time = time;
  result[index + 1] = time;

  pre.forEach((preElement) => {
    graph[preElement].next.push(index + 1);
    graph[index + 1].degree++;
  });
});

const queue = [];

// 진입 차수 0인 건물 큐에 삽입
graph.forEach((node, index) => {
  if (index === 0) return;
  if (node.degree === 0) queue.push(index);
});

// 위상 정렬 실행
while (queue.length > 0) {
  const currentNode = queue.shift();

  for (const nextNode of graph[currentNode].next) {
    result[nextNode] = Math.max(result[nextNode], result[currentNode] + graph[nextNode].time);
    graph[nextNode].degree--;

    if (graph[nextNode].degree === 0) queue.push(nextNode);
  }
}

console.log(result.slice(1).join("\n"));
