const fs = require("fs");
const [meta, array] = fs.readFileSync(0).toString().trim().split("\n");
const n = Number(meta);
const ports = array.split(" ").map(Number);

// dp[i] = i번째까지 고려했을 때 최대 연결 개수
const dp = Array.from({ length: n }, () => 1);

// 0-base
for (let i = 1; i < n; i++) {
  // i번째 포트를 확인
  for (let j = 0; j < i; j++) {
    // i보다 앞에 있는 모든 포트들과 비교
    if (ports[j] < ports[i]) {
      // 연결 선이 교차하지 않음
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(Math.max(...dp));
