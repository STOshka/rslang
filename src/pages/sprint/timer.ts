export default class Timer {
    time: number;
    setIntervalId: NodeJS.Timer;

    constructor() {
        this.time = 60;
        this.setIntervalId = setInterval(() => {
            const timeSprint = document.querySelector('#sprint-time');
            if ((this.time >= 0) && timeSprint) {
                (timeSprint as HTMLElement).innerText = ` Time: ${this.time}`;
                this.time -= 1;
            } else {
                clearInterval(this.setIntervalId);
            }
            return this.time;
        }, 1000);
    }
}
