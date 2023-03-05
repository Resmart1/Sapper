import React, { useEffect, useState } from 'react';
import styles from './Info.module.css'

export default function Info(props) {
	const [firstNumber, setFirstNumber] = useState(0);
	const [secondNumber, setSecondNumber] = useState(0);
	const [thirdNumber, setThirdNumber] = useState(0);
	const [timerActive, setTimerActive] = useState(false);
	const [smile, setSmile] = useState(styles.default);

	useEffect(() => {
		setTimerActive(props.isTimerActive);
	}, [props.isTimerActive]);

	useEffect(() => {
		if (props.smile === 'default') {
			setSmile(styles.default);
		}
		if (props.smile === 'scared') {
			setSmile(styles.scared);
		}
		if (props.smile === 'sad') {
			setSmile(styles.sad);
		}
	}, [props.smile]);

	useEffect(() => {
		if (secondNumber === 10) {
			setFirstNumber((prevValue) => prevValue + 1);
			setSecondNumber(0);
		}
	}, [secondNumber]);

	useEffect(() => {
		if (firstNumber === 10) {
			setFirstNumber(0);
		}
	}, [firstNumber]);

	useEffect(() => {
		if (timerActive) {
			const timer = setTimeout(() => {
				const counter = thirdNumber + 1;
				if (thirdNumber === 9) {
					setSecondNumber((prevValue) => prevValue + 1);
					setThirdNumber(0);
				}
				else {
					setThirdNumber(counter);
				}
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [timerActive, thirdNumber]);

	const handleRestartGame = () => {
		setFirstNumber(0);
		setSecondNumber(0);
		setThirdNumber(0);
		props.startGame();
	}

	function getNumber(number) {
		return (number === 0 ? 9 : number - 1) * (-14);
	}

	return (
		<div className={styles.timer} >
			<div className={styles.mines}>
				<div style={{
					backgroundPositionX: -126,
					backgroundPositionY: 0
				}}
					className={styles.number}>
				</div>
				<div style={{
					backgroundPositionX: getNumber(Math.floor(props.currentMines / 10)),
					backgroundPositionY: 0
				}}
					className={styles.number}>
				</div>
				<div style={{
					backgroundPositionX: getNumber(props.currentMines % 10),
					backgroundPositionY: 0
				}}
					className={styles.number}>
				</div>
			</div>
			<button onClick={handleRestartGame} className={styles.smile + ' ' + smile}>
			</button>
			<div className={styles.seconds}>
				<div style={{
					backgroundPositionX: getNumber(firstNumber),
					backgroundPositionY: 0
				}}
					className={styles.number}>
				</div>
				<div style={{
					backgroundPositionX: getNumber(secondNumber),
					backgroundPositionY: 0
				}}
					className={styles.number}>
				</div>
				<div style={{
					backgroundPositionX: getNumber(thirdNumber),
					backgroundPositionY: 0
				}}
					className={styles.number}>
				</div>
			</div>
		</div>
	);
}