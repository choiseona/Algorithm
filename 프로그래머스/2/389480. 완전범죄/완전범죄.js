function solution(info, n, m) {
    // 입력
    // info: 흔적 정보, n: A가 잡히는 기준, m: B가 잡히는 기준 
    
    // 과정
    // 각 물건 별로 A가 훔쳤을 때 B가 훔쳤을 때 누적 흔적이 최소가 되도록 선택 
    
    // 출력 
    // 안잡혔을 때, A 도둑이 남긴 흔적의 누적 개수의 최소값 
    
    //---
    

    function DFS(sumA, sumB, array, pos, memo) {
        if(sumA >= n || sumB >= m) return Infinity   
        if(pos === array.length) return sumA;
        
        const key = `${pos}-${sumA}-${sumB}`
        if(memo.has(key)) return memo.get(key)
         
        const [A,B] = array[pos]
        const APath =  DFS(sumA + A, sumB, array, pos+1, memo)
        const BPath =  DFS(sumA, sumB + B, array, pos+1, memo) 
        
        const minA = Math.min(APath,BPath)
        memo.set(key, minA)
        return minA
    }
    
    const memo = new Map();
    const minA = DFS(0, 0, info, 0, memo);
    return minA === Infinity ? -1 : minA;
   
}