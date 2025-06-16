function solution(citations) {
    // 1. h보다 크거나 같은 수가 h개 이상개여야함 
    // 2. h보다 작거나 같은 수가 h개 이하여야함 
    // 0 1 3 5 6 

    citations.sort((a, b) => a - b); 

    for (let i = 0; i < citations.length; i++) {
        const h = citations.length - i;
        if (citations[i] >= h) return h;
    }

    return 0;
}