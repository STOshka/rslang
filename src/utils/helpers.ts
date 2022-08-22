export function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    newArray.forEach((item, index) => {
        const ind = randomInt(index + 1);
        [newArray[index], newArray[ind]] = [newArray[ind], newArray[index]];
    });
    return newArray;
}

export function randomInt(max: number): number {
    return randomIntRange(0, max);
}

export function randomIntRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
