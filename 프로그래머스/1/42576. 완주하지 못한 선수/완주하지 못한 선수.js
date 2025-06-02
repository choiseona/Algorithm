function solution(participant, completion) {
    const participantMap = new Map();
    
    participant.forEach((person) => {
        participantMap.set(person, (participantMap.get(person) || 0) + 1);
    })
    
    completion.forEach((person) => {
        participantMap.set(person, (participantMap.get(person) || 0) - 1);
    })
    
    for(const [key, value] of participantMap) {
        if (value > 0) return key;
    }

}