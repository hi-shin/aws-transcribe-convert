
interface transcriptItem {
    start_time: string,
    end_time: string,
    alternatives: { confidence: string, content: string }[],
    type: string
}

interface transcriptItemBatch {
    start_time: number,
    end_time: number,
    content: string
}

export class Transcript {
    batches: transcriptItemBatch[];
    // items: transcriptItem[];
    constructor(items: transcriptItem[]) {
        // this.items = items;
        this.batches = this.makeBatch(items)
    }
    makeBatch(items: transcriptItem[]) {
        let lastTimeStamp = 0, batches: transcriptItemBatch[] = [];
        items.forEach(item => {
            let start_time = parseFloat(item.start_time);
            let end_time = parseFloat(item.end_time);
            if (start_time < lastTimeStamp) {
                throw Error("もしこのエラーが出るようならソートを先に入れたほうがいい");
            }

            if (start_time - lastTimeStamp > 1 || batches.length == 0) { // Hardcoded
                batches.push({
                    start_time,
                    end_time,
                    content: item.alternatives[0].content
                });
            } else {
                let lastItem = batches.pop();
                if (!lastItem) { throw Error("長さ0じゃないのに空") }
                lastItem.end_time = end_time;
                lastItem.content += item.alternatives[0].content;
                batches.push(lastItem)
            }
            lastTimeStamp = end_time;
        })
        return batches;
    }
}