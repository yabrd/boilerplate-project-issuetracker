'use strict';

const issueModel = require('../models').issue;
const projectModel = require('../models').project;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async (req, res) => {
      let projectName = req.params.project;
      try {
        const project = await projectModel.findOne({ name: projectName });
        if (!project){
          res.json([{ error: "Project not found" }]);
          return;
        }
        else {
          const issue = await issueModel.find({
            projectId: project._id,
            ...req.query,
          });
          if (!issue) {
            res.json([{ error: "no issues found" }])
            return;
          }
          res.json(issue);
          return;
        }
      } catch(e) {
        res.json({ error: "could not get ", _id: _id});
      }
    })
    
    .post(async (req, res) => {
      let projectName = req.params.project;
      const { issueTittle, issueText, createdBy, assignedTo, statusText } = req.body;
      if (!issueTittle || !issueText || !createdBy) {
        res.json({
          error: "Require field(s) missing"
        });
        return;
      }
      try {
        let projectModel = await projectModel.findOne({
          name: projectName
        });

        if (!issueModel){
          projectModel = new projectModel({
            name: projectName
          });
          projectModel = await projectModel.save();
        }

        const issueModel = new issueModel({
          projectId: projectModel.id,
          issueTittle: issueTittle || "",
          issueText: issueText || "",
          createdOn: new Date(),
          updatedOn: new Date(),
          createdBy: createdBy || "",
          open: true,
          statusText: statusText || "",
        });

        const issue = await issueModel.save();
        res.json(issue);
      } catch(e) {
        res.json({ error: "could not post ", _id: _id });
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
