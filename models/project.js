import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
	projectName:{
		type: String,
		unique: true,
		default: ''
	},
	projectDesc: {
		type: String,
		default: ''
	},
	projectUrl: {
		type: String,
		default: ''
	},
	projectCode: {
		type: String,
		default: ''
	},
	projectIcon: {
		type: String,
		default: ''
	}
})

const Project = mongoose.model('Project',projectSchema)
export default Project