function solution(str1, str2) {
    const isValid = (str) => /^[a-zA-Z]{2}$/.test(str);

    const makeIntersectionSet = (set1, set2) => {
        const map = new Map();
        const intersection = [];

        for (const element of set1) {
            map.set(element, (map.get(element) || 0) + 1);
        }

        for (const element of set2) {
            if (map.get(element) > 0) {
                intersection.push(element);
                map.set(element, map.get(element) - 1); 
            }
        }

        return intersection;
};


    const makeUnionSet = (set1, set2) => {
        const union = [];
        const elements = new Set([...set1, ...set2]);
        
        for (const element of elements) {
            const count1 = set1.filter((el) => el === element).length;
            const count2 = set2.filter((el) => el === element).length;

            for (let i = 0; i < Math.max(count1, count2); i++) {
                union.push(element);
            }          
        }
        return union;
    };

    const makeMultipleSet = (str) => {
        const multipleSet = [];
        for (let i = 0; i < str.length - 1; i++) {
            const element = str[i].toUpperCase() + str[i + 1].toUpperCase();
            if (isValid(element)) multipleSet.push(element);
        }
        return multipleSet;
    };

    const multipleSet1 = makeMultipleSet(str1);
    const multipleSet2 = makeMultipleSet(str2);

    const intersectionSize = makeIntersectionSet(multipleSet1, multipleSet2).length;
    const unionSetSize = makeUnionSet(multipleSet1, multipleSet2).length;

    if (unionSetSize === 0) return 65536;

    return Math.floor((intersectionSize / unionSetSize) * 65536);
}
