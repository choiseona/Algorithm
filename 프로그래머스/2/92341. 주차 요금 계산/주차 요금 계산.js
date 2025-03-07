function solution(fees, records) {
    // 기본 요금: 180분 5000원
    // 추가 요금: 10분 600원
    
    // 입력: fees(주차 요금), 자동차의 입/출차 내역
      // fees[0]: 기본 시간, fees[1]: 기본 요금, fees[2]: 단위 시간, fees[3]: 단위 요금
    // 출력: 청구할 주차요금(차량 번호 작은 순 배열)

    // 출차 내역 없으면 23:59 출차
    // 00:00 ~ 23:59 차량별 누적 주차 시간 계산하여 '일괄'로 정산
    // 기본 시간 이하이면 기본 요금 청구
    // 기본 시간 초과이면 기본 요금 + 추가 단위시간(소수점 올림)마다 추가 요금 청구
    
    // 맵 key: 차량 번호, value: [{"IN", "OUT"}, {"IN", "OUT"}]
    // records 돌면서 차량 번호를 key 값으로 value에 입차 시각과 출차 시각 저장
    // map 돌면서 출차 시각 없는 것은 23:59 출차로 간주, 분 단위로 요금 계산

    const carLogs = new Map();

    records.forEach((record) => {
        const [time, carNumber, type] = record.split(" ");
    
        if (!carLogs.has(carNumber)) {
            carLogs.set(carNumber, []);
        }
    
        const totalValue = carLogs.get(carNumber); 
        const lastValue = totalValue[totalValue.length - 1];

        if (type === "IN") {
            totalValue.push({ "IN": time });
        } 
        
        else if (type === "OUT" && lastValue?.IN && !lastValue?.OUT) {
            lastValue.OUT = time;
        }
    });
    
    const getFee = (minute) => {
        const [baseTime, baseFee, chunkTime, chunkFee] = fees;
              
        if(minute <= baseTime) return baseFee
        else return baseFee + Math.ceil((minute - baseTime) / chunkTime) * chunkFee;
    }
    
    const getMinute = (inTime, outTime="23:59") => {
        const [inHour, inMinute] = inTime.split(":").map(Number);
        const [outHour, outMinute] = outTime.split(":").map(Number);
        const totalInMinute = inHour * 60 + inMinute;
        const totalOutMinute = outHour * 60 + outMinute;
        return totalOutMinute - totalInMinute;
    }

    // key: [{"IN", "OUT"}, {"IN", "OUT"}, ...]
    
    
    // 차량 별로 돌면서 요금 구하기
    const carFees = [...carLogs].map((carLog) => {
        const [key, value] = carLog
        const totalMinute = value.reduce((acc,cul) => {
            const {IN, OUT} = cul;
            return acc + getMinute(IN, OUT)
        },0)
        
        return {key, fee: getFee(totalMinute)}
    })
    
    // 차 번호 기준 내림차순 정렬 
    return carFees.sort((a,b) => Number(a.key) - Number(b.key)).map((item) => item.fee)
    
}