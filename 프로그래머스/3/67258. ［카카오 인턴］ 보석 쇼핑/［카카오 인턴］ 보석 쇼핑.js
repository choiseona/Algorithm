function solution(gems) {
    // 시작 - 11:16
    
    // 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간의 보석 모두 구매
    // 입력: gems(보석들 이름)
    // 출력: [시작 진열대 번호, 끝 진열대 번호]
    
    //-------------------------------------
    // set, map, 투포인터, 슬라이딩 윈도우 활용
    
    let allCategoryCount = new Set(gems).size;
    let left = 0; let right = 0;
    let minLeft = -1; let minRight = -1;
    let minLength = Infinity;
    let currentMap = new Map([[gems[0],1]]);
    
    while(right < gems.length) {
        if(allCategoryCount === currentMap.size) {
            const currentLength = right-left+1;
            if(minLength > right - left + 1) {
                minLength = currentLength;
                minLeft = left;
                minRight = right;
            }
            const leftGem = gems[left];
            const leftGemCount = currentMap.get(leftGem);
            leftGemCount === 1 ? currentMap.delete(leftGem) : currentMap.set(leftGem, leftGemCount - 1)
            left++;
        } else {
            right++;
            currentMap.set(gems[right], (currentMap.get(gems[right]) || 0) + 1)
        }
    }
    return [minLeft+1, minRight+1]         
}