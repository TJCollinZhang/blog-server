export const resErr = ({ctx, message = 'failed', err = null}) => {
	ctx.body = {code: 0, message, debug: err}
}

export const resSuccess = ({ctx, message = 'success', result = null}) => {
	ctx.body = {code: 1, message, result}
}