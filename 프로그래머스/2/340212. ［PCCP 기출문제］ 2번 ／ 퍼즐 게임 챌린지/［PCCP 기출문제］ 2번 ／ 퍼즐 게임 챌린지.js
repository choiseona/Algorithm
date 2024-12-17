function solution(diffs, times, limit) {
    const binarySearch = (start,end, checkFind) => {
        if(start > end) return start;
        const middle = Math.floor((start + end)/2)
        if(checkFind(middle) === 1) return middle;
        else if(checkFind(middle) === -1) return binarySearch(middle+1, end, checkFind);
        else return binarySearch(start,middle-1, checkFind)
    }
    
    const calculateTimeUsage = (diff, level, prevTime, currentTime) => {
        if(diff <= level) return currentTime;
        else return (currentTime + prevTime) * (diff - level) + currentTime
    }
    
    const calculateTotalTimeUsage = (diffs,times,level) => diffs.reduce((accTimeUsage, diff, idx) => {
        const prevTime = idx === 0 ? 0 : times[idx - 1];
        return accTimeUsage + calculateTimeUsage(diff, level, prevTime, times[idx]);
    }, 0);
    
    const checkCanLevel = (diffs, times) => (level) => {
        const timeUsageOfPrevLevel = calculateTotalTimeUsage(diffs, times, level - 1);
        const timeUsageOfCurrentLevel = calculateTotalTimeUsage(diffs, times, level);
        
        if(timeUsageOfCurrentLevel > limit) return -1; // 오른쪽 이진 탐색
        if(timeUsageOfPrevLevel <= limit) return -2; // 왼쪽 이진 탐색 
        if(timeUsageOfPrevLevel > limit && timeUsageOfCurrentLevel<=limit) return 1; // 발견
    }
    
    return binarySearch(1, diffs.reduce((acc, diff) => Math.max(acc, diff), 1) , checkCanLevel(diffs,times))
}