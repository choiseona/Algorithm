function solution(cap, n, deliveries, pickups) {
    // 2:55 시작 
    
    // i번째 집은 물류창고와 i만큼 떨어져있음
    // i번째 집은 j번째 집과 j-i만큼 떨어져 있음
    // 재활용 택배 상자에 담아 배달, 빈 재활용 택배 상자 수거
    // 트럭에 최대 cap개의 재활용 택배 상자 실을 수 있음
    
    // 입력: cap(수용 개수), n(집 개수), deliveries(배달 배열), pickups(수거 배열)
    // 출력: 최소 이동 거리
    
    // ------------------------------------------
    
    // 가장 먼 곳부터 배달/수거 0보다 클 때까지 왕복   
    let distance = 0;
    let deliverCount = 0;
    let pickupCount=0;

    for(let home=n-1; home>=0; home--) {  
        deliverCount += deliveries[home];
        pickupCount += pickups[home];
        
        while(deliverCount > 0 || pickupCount > 0) {
            deliverCount -= cap;
            pickupCount -= cap;
            distance += (home+1)*2
            
        }
    }
    return distance;
}
