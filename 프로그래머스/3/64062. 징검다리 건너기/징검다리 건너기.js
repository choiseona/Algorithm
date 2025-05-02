// 시작 - 9:00
function solution(stones, k) {
    // 디딤돌 숫자는 한 번 밟으면 1 줄어듬
    // 디딤돌 숫자가 0이 되면 밟을 수 x, 가장 가까운 다음 디딤돌로 한번에 여러 칸 건너뛸 수 있음
    // 입력: stones(디딤돌에 적힌 숫자), k(한 번에 건너뛸 수 있는 디딤돌의 최대 칸수)
    // 출력: 최대 몇 명까지 징검다리를 건널 수 있는지 
    //----------------------
    // 슬라이딩 윈도우 - 숫자들이 가장 작은 구간 찾기? 최대값이 가장 작은 구간 찾기
    
    let min = Infinity
    let start = 0;
    const deque = [];
    
    for(let i=0; i<stones.length; i++) {        
        // 윈도우 범위 벗어난 값 제거
        while(start < deque.length && deque[start][0] < i-k + 1) {
            start++;
        }
        
        // 현재 값보다 작은 값들 제거 (구간의 최대값이 아님)
        while(deque.length > start && deque[deque.length-1][1] <= stones[i]) {
            deque.pop();
        }
            
        // 현재 값 추가
        deque.push([i, stones[i]])
        
        // k-1개 지난 후부터 결과 갱신
        if(i >= k-1) {
            min = Math.min(min,deque[start][1]);
        }
    }
    return min
}