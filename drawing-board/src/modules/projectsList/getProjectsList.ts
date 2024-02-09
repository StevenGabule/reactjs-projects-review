import { AppThunk } from '../../store'
import { Project } from '../../utils/types'
import {
	getProjectsListFailed,
	getProjectsListSuccess
} from './slice';
import { fetchProjectsList } from './api';

export const getProjectsList = (): AppThunk => async (dispatch) => {
	try {
		const projectsList: Project[] = await fetchProjectsList();
		dispatch(getProjectsListSuccess(projectsList))
	} catch (error: any) {
		dispatch(getProjectsListFailed(error.toString()))
	}
}