/**
 * Created by DylanWight on 6/20/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function RecordService () {
    const RecordSchema = require("../schemas/recordSchema");
    const RecordModel = mongoose.model("Record", RecordSchema);

    const RecordService = new CommonService(RecordModel);
    return RecordService;
}

module.exports = RecordService;