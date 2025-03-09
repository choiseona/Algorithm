function solution(n, w, num) {
    const height = Math.ceil(n/w);
    const width = w;
    const boxes = Array.from({length:height}, () => Array.from({length:width}, () => -1));
    
    // 박스 채우기
    // rowIndex가 2로 나눠떨어지면 왼쪽부터, 아니면 오른쪽부터 채우기
    for(let rowIndex=0; rowIndex<height; rowIndex++) { 
        if(rowIndex % 2 === 0) {
            for(let columnIndex=0; columnIndex < width; columnIndex++) {
                if(rowIndex * w + (columnIndex + 1) > n) continue; 
                boxes[rowIndex][columnIndex] = rowIndex * w + (columnIndex + 1);
            }
        }
        else {
            for(let columnIndex=0; columnIndex < width; columnIndex++) {
                if(rowIndex * w + (width-columnIndex) > n) continue;
                boxes[rowIndex][columnIndex] = rowIndex * w + (width - columnIndex)
            }
        }
    }
    
    // num의 인덱스 index 구해서 y부터 height까지 -1이 아닌 것만 필터링
    let rowIndexOfNum;
    let columnIndexOfNum;
    
    boxes.forEach((row, rowIndex) => {
        row.forEach((element, columnIndex) => {
            if(element === num) {
                rowIndexOfNum = rowIndex;
                columnIndexOfNum = columnIndex;
            }
        })
    })
    
    let answer = 0;
    for(let rowIndex=rowIndexOfNum; rowIndex<height; rowIndex++) {
        if(boxes[rowIndex][columnIndexOfNum] !== -1) answer++;
    }
    
    return answer
    
}