function solution(video_len, pos, op_start, op_end, commands) {
    // 10초 전, 10초 후, 오프닝 건너뛰기
    
    // prev -> current - 10초 < 0 ? current - 10초 : 마지막(동영상 길이)
    // next -> current + 10초 > 마지막(동영상 길이) ? current + 10초 : 마지막(동영상 길이)
    // 오프닝 구간(op_start <= <= op_end)이면 오프닝 끝나는 위치로 이동
    
    // 입력 - video_len: 동영상 길이, pos: 직전 재생위치, op_start: 오프닝 시작, op_end: 오프닝 끝, commands: 사용자 입력배열
    // 결과 - 동영상 위치를 mm:ss 형식으로 반환
    
    // mm:ss -> ss 변환 함수
    const getSecond = (pos) => {
        const [minute, second] = pos.split(":").map(Number);
        return minute * 60 + second;
    }
    
    // ss -> mm:ss 변환 함수
    const getMinute = (pos) => {
        const minute = String(Math.floor(pos / 60)).padStart(2, '0')
        const second = String(pos % 60).padStart(2, '0')
        return `${minute}:${second}`
    }
    
    // 뒤로 이동하는 함수 
    const jumpToPrev = (currentPos, second) => Math.max(0, currentPos - second);
    
    // 앞으로 이동하는 함수 
    const jumpToNext = (currentPos, second) => Math.min(getSecond(video_len), currentPos + second);
    
    // 오프닝 점프 함수 
    const jumpOpening = (currentPos, openStart, openEnd) => currentPos >= getSecond(openStart) && currentPos <= getSecond(openEnd) ? getSecond(openEnd) : currentPos;

    
    let currentPos = getSecond(pos);
    commands.forEach((command) => {
        currentPos = jumpOpening(currentPos, op_start, op_end)
        if(command === "prev") {
            currentPos = jumpToPrev(currentPos, 10);
        } else {
            currentPos = jumpToNext(currentPos, 10);
        }
    })
    currentPos = jumpOpening(currentPos, op_start, op_end)
    
    return getMinute(currentPos)
}