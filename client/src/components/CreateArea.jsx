import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from 'axios';

function CreateArea(props) {
	const [note, setNote] = useState({
		title: '',
		content: ''
	});

	function handleChange(event) {
		const { name, value } = event.target;

		setNote(prevNote => {
			return {
				...prevNote,
				[name]: value
			};
		});
	}

	function submitNote(event) {
		props.onAdd(note);

		setNote({
			title: '',
			content: ''
		});

		const newNote = {
			title: note.title,
			content: note.content
		};

		console.log(newNote);
		event.preventDefault();

		axios.post('/add', newNote);
	}

	const [isExpand, setExpand] = useState(false);

	function expand() {
		setExpand(true);
	}

	return (
		<div>
			<form className="create-note">
				{isExpand && (
					<input
						name="title"
						onChange={handleChange}
						value={note.title}
						placeholder="Title"
						autoComplete="off"
					/>
				)}
				<textarea
					name="content"
					onClick={expand}
					onChange={handleChange}
					value={note.content}
					placeholder="Take a note..."
					rows={isExpand ? 3 : 1}
				/>
				<Zoom in={isExpand}>
					<Fab onClick={submitNote}>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
