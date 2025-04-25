function solution(user_id, banned_id) {
    // 시작 - 8:40
    
    // 1. 첫번째 생각
    // 모든 banned_id에 대해 다 구하기(*를 실제 값으로 치환) -> 26^8 -> 너무 오래걸림...
    // 구한 user_id로 조합 구하기...
    
    // 2. 두번째 생각
    // user_id 에 대해 banned_id 개수만큼을 포함시키는 순열 구하기
    // user_id가 banned_id에 대응되는지 구하기 
    
    const getPermutations = function (arr, selectCount) {
        if (selectCount === 1) return arr.map((el) => [el]); 

        const results = [];
        arr.forEach((fixed, index, origin) => {
            const rest = [...origin.slice(0, index), ...origin.slice(index+1)] 
            const permutations = getPermutations(rest, selectCount - 1); 
            const attached = permutations.map((el) => [fixed, ...el]); 
            results.push(...attached); 
        });

        return results;
    }
    
    const checkPossible = (bannedId, userId) => {
        if(bannedId.length !== userId.length) return false;
        
        for(let i=0; i<bannedId.length; i++) {
            if(bannedId[i] === '*') continue;
            if(bannedId[i] !== userId[i]) return false
        }

        return true;
    }
    
    // user_id 순열 구하기
    const permutations = getPermutations(user_id, banned_id.length);
    
    // user_id가 banned_id에 대응되는지 구하기 
    
    const resultSet = new Set();
    
    for(let i=0; i<permutations.length; i++) {
        let isMatch = true;
        for(let j=0; j<banned_id.length; j++) {
            const userId = permutations[i][j];
            const bannedId = banned_id[j]
            
            const isPossible = checkPossible(bannedId, userId);
            if(!isPossible) {
                isMatch = false;
                break;
            }
        }
        if(!isMatch) continue;
        const permutation = [...permutations[i]].sort().join("")
        resultSet.add(permutation)
        
    }
    
    return resultSet.size
    
}