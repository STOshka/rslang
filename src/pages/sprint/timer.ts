export default class Timer {
    startedTime: Date;

    constructor() {
        this.startedTime = new Date();
    }
    startTimer(): void {
        const setIntervalId = setInterval(() => {
            const time: number = Number(new Date()) - Number(this.startedTime);
            if (time > 60000) {
                clearInterval(setIntervalId);
            }
        }, 1000);
    }
}
