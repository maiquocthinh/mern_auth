import './Input.scss'

const Input = ({ type, text, name, icon, icon2, defaultValue, disabled, handleIconClick, handleChange }) => {
	return (
		<div className="input">
			<label className="input_icon">{icon}</label>
			{icon2 && (
				<label className="input_icon input_icon_2" onClick={handleIconClick}>
					{icon2}
				</label>
			)}
			<input
				type={type}
				name={name}
				defaultValue={defaultValue}
				disabled={disabled}
				onChange={handleChange}
				placeholder="&nbsp;"
				autoComplete="off"
			/>
			<span>{text}</span>
		</div>
	)
}

export default Input
