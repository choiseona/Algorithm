function solution(players, m, k) {
    const servers = Array.from({length:24}, () => 0)
    let addedServer = 0;
    
    players.forEach((player, index) => {
        const requiredServer = Math.floor(player/m)
        
        if(servers[index] < requiredServer && requiredServer > 0) {
            const diff = requiredServer - servers[index];
            addedServer+=diff;
            for(let i=0; i<k; i++) {
                servers[index+i] += diff
            }
        }
    })

    return addedServer
}
