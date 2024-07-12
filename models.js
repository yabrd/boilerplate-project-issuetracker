import mongoose from 'mongoose';
const { Schema } = mongoose;

const issueSchema = new Schema({
    projectId: {type: String, require: true},
    projectTitle:  {type: String, require: true},
    projectText:  {type: String, require: true},
    createdOn: Date,
    updatedOn: Date,
    CreatedBy:  {type: String, require: true},
    assignTo: String,
    open: Boolean,
    StatusText: String,
});

const issue = mongoose.model("issue", issueSchema);
const projectSchema = new Schema({
    name: {type: String, require: true},
});
const project = mongoose.model("Project", projectSchema);

exports.issue = issue;
exports.project = project;