function solution(n, bans) {
    // 주문: 알파벳 소문자 11글자 이하
    // 글자 수 적은 주문 부터, 글자 수 같으면 사전 순서대로 기록
    // 주문이 삭제된 것에서 n번째 주문을 찾아야 함 
    
    // 입력: n: n번째 주문, bans: 삭제된 주문들을 담은 배열
    // 출력: 삭제가 완료된 주문서의 n번째 주문 
    
    // d,e,bb,aa,ae 뺐을 때의 n번째 주문 구하기  

    // ----------------------------------------------------
    
    // 문자를 위치(숫자)로 변환 후 정렬 
    // -> n을 기준으로 요소를 제거했을 때 구해야하는 위치 구하기 
    // -> 위치(숫자)를 알파벳으로 변환 
    
    const alphaToDecimal = (alphabet) => {  
        let result = 0;
        const base = 26; // 26진수 기반
  
        for (let i = 0; i < alphabet.length; i++) {
            // 현재 자릿수의 값 계산
            const charValue = alphabet[i].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    
            // 자릿수 위치에 따른 가중치 적용
            result = result * base + charValue;
        }
  
        return result;
    }
    
    const decimalToAlpha = (num) => {  
        let result = '';
        let n = num;
        const base = 26;
  
        while (n > 0) {
            // 나머지를 구해 해당 자릿수의 문자 결정
            let remainder = n % base;
    
            if (remainder === 0) {
                remainder = base; // 26으로 나누어 떨어질 경우 'z'로 처리
                n = Math.floor(n / base) - 1;
            } else {
                n = Math.floor(n / base);
            }
    
            // 결과 문자열 앞에 현재 자릿수의 문자 추가
            result = String.fromCharCode('a'.charCodeAt(0) + remainder - 1) + result;
        }
  
        return result;
    }
    
    // 각 알파벳의 위치 구하기
    const bansLocations = bans.map((ban, index) => {
        return alphaToDecimal(ban)
    })
    
    // 오름차순 정렬 
    const sortedBansLocations = bansLocations.sort((a,b) => a-b);
        
    // 알파벳의 위치가 n+index보다 작거나 같을 때만 구해야하는 알파벳 위치 1 증가 
    let targetLocation = n;
    sortedBansLocations.forEach((banLocation, index) => {
        if(n+index >= banLocation) {
            targetLocation++;
        }
    })
    
    // 구한 targetLocation을 알파벳으로 치환
    const answer = decimalToAlpha(targetLocation)
    return answer;
}