function solution(str1, str2) {
    const isValid = (str) => /^[a-zA-Z]{2}$/.test(str);

    const makeSetSize = (set1, set2) => {
        const elements = new Set([...set1, ...set2]);
        let unionSize = 0;
        let intersectionSize = 0;
        
        elements.forEach((element) => {
            const count1 = set1.filter((el) => el === element).length;
            const count2 = set2.filter((el) => el === element).length;
            unionSize += Math.max(count1, count2)
            intersectionSize += Math.min(count1, count2)
        })
        
        return [unionSize, intersectionSize]
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
    
    const [unionSetSize, intersectionSize ] = makeSetSize(multipleSet1,multipleSet2)


    if (unionSetSize === 0) return 65536;

    return Math.floor((intersectionSize / unionSetSize) * 65536);
}
