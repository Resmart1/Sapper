import React, { useState, useEffect } from "react";
import styles from './Cell.module.css';

export default function Cell(props) {
	const imgStyles = [
		styles.disabled, styles.one, styles.two,
		styles.three, styles.four, styles.five,
		styles.six, styles.seven, styles.eight,
		styles.mine, styles.finishMine, styles.flag,
		styles.questionMark, styles.default
	];

	const [className, setClassName] = useState(imgStyles[13]);
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (isShow) {
			if (props.children === 100) {
				setClassName(imgStyles[9]);
			} else if (props.children === 1000) {
				setClassName(imgStyles[10]);
			} else {
				setClassName(imgStyles[props.children]);
			}
		}
		else {
			setClassName(imgStyles[13]);
		}
	}, [props.children, isShow]);

	useEffect(() => {
		setIsShow(props.show);
	}, [props.show]);

	useEffect(() => {
		if (props.class === 'start') {
			setClassName(imgStyles[13]);
		}
	}, [props.class]);

	const handleOnClick = (event) => {
		if (className === imgStyles[13]) {
			event.currentTarget.disabled = true;
			props.onClick(event, props.children, props.x, props.y);
		}
	}

	const handleOnContextMenu = (event) => {
		event.preventDefault();
		if (!event.currentTarget.disabled) {
			setClassName(setClass);
		}
	}

	const handleOnMouseEvent = (event) => {
		if (className === imgStyles[13] && (event.button === 0)) {
			props.onMouseEvent(event);
		}
	}

	const setClass = () => {
		if (className === imgStyles[13]) {
			props.onContextMenu(true);
			return imgStyles[11];
		} else if (className === imgStyles[11]) {
			props.onContextMenu(false);
			return imgStyles[12];
		} else {
			return imgStyles[13];
		}
	}

	return (
		<button
			onClick={handleOnClick}
			onContextMenu={handleOnContextMenu}
			onMouseDown={handleOnMouseEvent}
			onMouseUp={handleOnMouseEvent}
			className={styles.cell + ' ' + (className)}
			disabled={props.disabled}
		>

		</button >
	);
}