const positionsModel = require('../model/positionsModel')

const axios = require('axios')
exports.db = async (req, res) => {
    positionsModel.dbcheck()
    res.send('ok')
}
exports.sync = async (req, res) => {
    let positionData = [];
    let page = 0;
    let flag = true;
    try {
        let jobs;
        while(flag) {
            page++;
            jobs = await axios.get('https://jobs.github.com/positions.json?page='+page)
            jobs = jobs.data   
            if(!jobs.length || page > 5) flag = false 
            else positionData.push(jobs);
            jobs = null;
        }

        positionsModel.create(positionData)
        res.send(positionData)    
    } catch(ex) {
        res.send('error while updating')
    }
}

exports.getData = async (req, res) => {
    let data = await positionsModel.fetch();
    res.json(data)
}