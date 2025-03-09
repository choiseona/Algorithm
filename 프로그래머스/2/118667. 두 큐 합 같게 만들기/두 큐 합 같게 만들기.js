// 투포인터 사용
function solution(queue1, queue2) {
  const totalQueue = [...queue1, ...queue2];
  const totalLength = totalQueue.length;
  const totalSum = getSum(totalQueue);
  const targetSum = totalSum / 2;

  if (totalSum % 2 !== 0) return -1;

  let queue1Sum = getSum(queue1);
  let queue1Head = 0,
    queue1Tail = queue1.length - 1;
  let result = 0;

  while (result < 2 * totalLength) {
    if (queue1Sum === targetSum) return result;
    if (queue1Sum > targetSum) {
      queue1Sum -= totalQueue[queue1Head];
      queue1Head = (queue1Head + 1) % totalLength;
    } else if (queue1Sum < targetSum) {
      queue1Tail = (queue1Tail + 1) % totalLength;
      queue1Sum += totalQueue[queue1Tail];
    }
    result++;
  }

  return -1;
}

function getSum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}
