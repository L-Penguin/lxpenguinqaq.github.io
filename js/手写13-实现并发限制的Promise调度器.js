class Scheduler {
    constructor(limit) {
        this.queue = [];
        this.maxCount = limit;
        this.runCounts = 0;
    }
    add(time, order) {
        const PromiseCreator = ()=> {
            return new Promise((res, rej)=> {
                setTimeout(()=> {
                    console.log(order);
                    res();
                }, time);
            });
        };
        this.queue.push(PromiseCreator);
    }
    taskStart() {
        for (let i=0; i<this.maxCount; i++) {
            this.request();
        }
    }
    request() {
        if (!this.queue || !this.queue.length || this.runCounts>=this.maxCount) {
            return;
        }
        this.runCounts++;
        this.queue.shift()().then(()=> {
            this.runCounts--;
            this.request();
        });
    }
}

const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();  // 2, 3, 1, 4;
