function solution(key, lock) {
    // 시작 - 8: 20
    // 자물쇠: N * N, 열쇠: M * M
    // 열쇠는 회전과 이동이 가능, 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 열림 
    // 자물쇠 영역을 벗어난 부분은 영향을 주지 않음
    // 입력: key(열쇠), lock(자물쇠)
    // 출력: 열 수 있는지 없는지
    // -----------------------------
    // 완탐? 각 칸별로 대응되도록 && 90도씩 회전시키면서 
    
    const M = key.length;
    const N = lock.length;

    const getRotated = (array) => {
        const arrayHeight = array.length;
        const arrayWidth = array[0].length;
        const rotatedArray = Array.from({ length: arrayHeight }, () => Array.from({ length: arrayWidth }, () => 0));
        
        for (let i = 0; i < arrayHeight; i++) {
            for (let j = 0; j < arrayWidth; j++) {
                rotatedArray[j][arrayHeight - 1 - i] = array[i][j];
            }
        }
        return rotatedArray;
    }

    const checkCanUnlock = (xOffset, yOffset, key, lock) => {
        const temp = lock.map(row => [...row]);

        for (let i = 0; i < key.length; i++) {
            for (let j = 0; j < key[0].length; j++) {
                const x = i + xOffset;
                const y = j + yOffset;
                if (x < 0 || x >= N || y < 0 || y >= N) continue;
                temp[x][y] += key[i][j];             
            }
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (temp[i][j] !== 1) return false;
            }
        }
        return true;
    }

    for (let rotation = 0; rotation < 4; rotation++) {
        for (let x = -M + 1; x < N; x++) {
            for (let y = -M + 1; y < N; y++) {
                if (checkCanUnlock(x, y, key, lock)) return true;    
            }
        }
        key = getRotated(key);
    }

    return false;
    
}