"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transcript = void 0;
var Transcript = (function () {
    function Transcript(items) {
        this.batches = this.makeBatch(items);
    }
    Transcript.prototype.makeBatch = function (items) {
        var lastTimeStamp = 0, batches = [];
        items.forEach(function (item) {
            var start_time = parseFloat(item.start_time);
            var end_time = parseFloat(item.end_time);
            if (start_time < lastTimeStamp) {
                throw Error("もしこのエラーが出るようならソートを先に入れたほうがいい");
            }
            if (start_time - lastTimeStamp > 1 || batches.length == 0) {
                batches.push({
                    start_time: start_time,
                    end_time: end_time,
                    content: item.alternatives[0].content
                });
            }
            else {
                var lastItem = batches.pop();
                if (!lastItem) {
                    throw Error("長さ0じゃないのに空");
                }
                lastItem.end_time = end_time;
                lastItem.content += item.alternatives[0].content;
                batches.push(lastItem);
            }
            lastTimeStamp = end_time;
        });
        return batches;
    };
    return Transcript;
}());
exports.Transcript = Transcript;
