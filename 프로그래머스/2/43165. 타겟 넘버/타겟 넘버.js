function solution(numbers, target) {
    let answer = 0;
    
    const DFS = (level, sum) => {
        if(level < numbers.length) {
            DFS(level+1, sum + numbers[level])
            DFS(level+1, sum - numbers[level])
        }
        else {
            if(sum === target) {
                answer++;
            }        
            return;
        } 
        
    }
    
    DFS(0,0)
    return answer;
}