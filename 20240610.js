// 숫자 변환하기
function solution(x, y, n) {
  const BFS = (startNumber) => {
    const queue = [];
    const visited = Array.from({ length: y + 1 }, () => false);

    queue.push({ number: startNumber, count: 0 });
    visited[startNumber] = true;

    while (queue.length) {
      const { number, count } = queue.shift();
      if (number === x) return count;

      const numberMinusN = number - n;
      if (numberMinusN >= x && !visited[numberMinusN]) {
        queue.push({ number: numberMinusN, count: count + 1 });
        visited[numberMinusN] = true;
      }

      const numberDivided2 = number / 2;
      if (number % 2 === 0 && numberDivided2 >= x && !visited[numberDivided2]) {
        queue.push({ number: numberDivided2, count: count + 1 });
        visited[numberDivided2] = true;
      }

      const numberDivided3 = number / 3;
      if (number % 3 === 0 && numberDivided3 >= x && !visited[numberDivided3]) {
        queue.push({ number: numberDivided3, count: count + 1 });
        visited[numberDivided3] = true;
      }
    }
    return -1;
  };

  return BFS(y);
}
