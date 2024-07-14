import create from 'zustand';
import { EditedTask } from '@/types';

type State = {
	editedTask: EditedTask;
	updateEditedTask: (payload: EditedTask) => void;
	resetEditedTask: () => void;
};

const useStore = create<State>((set) => ({
	editedTask: { id: 0, title: '', description: '', completed: false },
	updateEditedTask: (payload) =>
		set({
			editedTask: {
				id: payload.id,
				title: payload.title,
				description: payload.description,
				completed: payload.completed,
			},
		}),
	resetEditedTask: () =>
		set({
			editedTask: { id: 0, title: '', description: '', completed: false },
		}),
}));
export default useStore;
