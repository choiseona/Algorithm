function solution(numbers) {
    const sortedNumbers = numbers.map(String).sort((a,b) => Number(b+a) - Number(a+b))
    return sortedNumbers[0] === '0' ? '0' : sortedNumbers.join("")
}