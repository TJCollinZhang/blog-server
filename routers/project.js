import {controller, put, del, post, get, required} from '../decorator'
import {resErr, resSuccess} from '../utils/resHandle'
import config from '../config'
import {deleteProject, getProjectListByPage, insertProject} from '../controllers/project'
import {getTagList} from "../controllers/tag";

@controller(`${config.APP.root_path}/project`)
export class ProjectController {
	@post('project')
	@required({body: ['projectName', 'projectCode']})
	async saveProject(ctx, next) {
		try {
			let {projectName, projectDesc, projectUrl, projectCode, projectIcon} = ctx.request.body
			let res = await insertProject({projectName, projectDesc, projectUrl, projectCode, projectIcon})
			resSuccess({ctx: ctx, message: '项目保存成功', result: res})

		} catch (e) {
			resErr({ctx: ctx, message: "项目保存失败", err: e})
		}
	}

	@get('project_list')
	async selectProjectListByPage(ctx, next) {
		try {
			let page = ctx.query.page || 0
			let res = await getProjectListByPage(page)
			resSuccess({ctx: ctx, message: '查询标签列表成功', result: res})

		} catch (e) {
			resErr({ctx: ctx, message: "获取项目列表失败", err: e})
		}
	}

	@del('project')
	async delProject(ctx, next) {
		try {
			let projectId = ctx.query.projectId
			if (projectId) {
				let res = await deleteProject(projectId)
				return resSuccess({ctx: ctx, message: "删除项目成功", result: res})
			} else {
				resErr({ctx: ctx, message: "未获取到项目ID"})
			}
		} catch (e) {
			resErr({ctx: ctx, message: "删除项目失败", err: e})
		}
	}
}