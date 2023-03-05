import React from 'react';
import Cell from '../Cell';
import styles from './Board.module.css';
import Info from '../Info';

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: [],
			isActiveButton: false,
			currentMines: 40,
			firstClick: true,
			isTimerActive: false,
			smile: 'default',
			openCells: 0,
			isDisabled: false,
			class: 'default',
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);
		this.handleMouseEvent = this.handleMouseEvent.bind(this);
		this.startGame = this.startGame.bind(this);
		this.showNear = this.showNear.bind(this);
	}

	componentDidMount() {
		this.renderNewField();
	}

	renderNewField() {
		let currentMines = 40;
		let newArr = Array(16).fill(Array(16).fill());
		function num(index) {
			if ((Math.floor(Math.random() * (256 - index)) < currentMines) && (currentMines >= 0)) {
				currentMines = currentMines - 1;
				return {
					value: 100,
					show: false,
					disabled: false
				}
			}
			else {
				return {
					value: 0,
					show: false,
					disabled: false
				}
			}
		}

		newArr = newArr.map((item, x) => {
			return (item.map((element, y) => {
				return num(x * 16 + y);
			}))
		})
		newArr = this.addTheNumberOfMines(newArr);
		this.setState({ cells: newArr });
	}

	addTheNumberOfMines(array) {
		function countTheNumber(x, y) {
			let count = 0;
			if (!(array[x][y].value === 100)) {
				for (let i = (x - 1); i <= (x + 1); i++) {
					for (let j = (y - 1); j <= (y + 1); j++) {
						if (i >= 0 && j >= 0 && i < 16 && j < 16) {
							if (array[i][j].value === 100) { count = count + 1 }
						}
					}
				}
				return count;
			} else {
				return 100;
			}
		}

		return array.map((item, x) => {
			return item.map((element, y) => {
				return { value: countTheNumber(x, y), show: false }
			})
		})
	}

	handleMouseEvent(event) {
		if (event.button === 0) {
			this.state.smile === 'default' ?
				this.setState({ smile: 'scared' }) :
				this.setState({ smile: 'default' })
		}
	}

	handleClick(event, value, x, y) {
		let arr = this.state.cells.slice();
		arr[x][y].show = true;

		function ChangeMine(x, y) {

			function makeNewNumber(x, y) {
				let count = 0;
				for (let l = (x - 1); l <= (x + 1); l++) {
					for (let k = (y - 1); k <= (y + 1); k++) {
						if (l >= 0 && k >= 0 && l < 16 && k < 16) {
							if (arr[l][k].value === 100) {
								count = count + 1;
							}
							else {
								arr[l][k].value = arr[l][k].value - 1;
							}
						}
					}
				}
				arr[x][y].value = count;
			}

			function makeNewNumbers(x, y) {
				for (let l = (x - 1); l <= (x + 1); l++) {
					for (let k = (y - 1); k <= (y + 1); k++) {
						if (l >= 0 && k >= 0 && l < 16 && k < 16) {
							if (!(arr[l][k].value === 100)) {
								arr[l][k].value = arr[l][k].value + 1;
							}
						}
					}
				}
			}

			for (let i = 0; i < arr.length; i++) {
				for (let j = 0; j < arr.length; j++) {
					if (!(arr[i][j].value === 100)) {
						[arr[i][j].value, arr[x][y].value] = [arr[x][y].value, arr[i][j].value];
						makeNewNumber(x, y);
						makeNewNumbers(i, j);
						return arr;
					}
				}
			}
			return arr;
		}

		if (this.state.firstClick) {
			this.setState({ isTimerActive: true, firstClick: false, openCells: this.state.openCells + 1 });
			if (value === 100) {
				this.setState({ cells: ChangeMine(x, y) })
			}
			this.isMine(arr[x][y].value, x, y);
		} else {
			this.isMine(value, x, y);
		}
	}

	isMine(value, x, y, show) {
		if (value === 100) {
			this.finishTheGame(x, y);
		}
		else {
			if (value === 0) {
				this.setState({ openCells: this.state.openCells + this.showNear(x, y, this.showNear) + 1 });
			}
			else {
				this.setState({ openCells: this.state.openCells + 1 });
			}
		}
		this.isWinner();
	}

	isWinner() {
		if (this.state.openCells === 216) {
			this.setState({ isTimerActive: false, smile: 'sunglasses' });
		}
	}

	showNear(x, y, show) {
		let arr = this.state.cells.slice();
		let count = 0;
		for (let i = (x - 1); i <= (x + 1); i++) {
			for (let j = (y - 1); j <= (y + 1); j++) {
				if (i >= 0 && j >= 0 && i < 16 && j < 16) {
					arr[i][j].disabled = true;
					if (!arr[i][j].show) {
						count = count + 1;
						arr[i][j].show = true;
						if (arr[i][j].value === 0) {
							count = count + show(i, j, show);
						}
					}
				}
			}
		}
		return count;
	}

	finishTheGame(x, y) {
		let arr = this.state.cells.slice();
		arr[x][y].value = 1000;
		arr = arr.map((item, i) => {
			return item.map((element, j) => {
				if (element.value === 100) {
					return { value: 100, show: true };
				}
				else return {
					value: element.value,
					show: element.show,
					disabled: true,
				};
			})
		})
		this.setState({ cells: arr, isTimerActive: false, smile: 'sad', isDisabled: true });
	}

	startGame() {
		this.setState({
			currentMines: 40, openCells: 0, isTimerActive: false, smile: 'default',
			firstClick: true, isDisabled: false, class: 'start'
		});
		this.renderNewField();
	}

	handleContextMenu(value) {
		if (value) {
			if (this.state.currentMines > 0) {
				this.setState({ currentMines: this.state.currentMines - 1 })
			}
		}
		else {
			if (this.state.currentMines < 40) {
				this.setState({ currentMines: this.state.currentMines + 1 })
			}
		}
	}

	render() {
		return (
			<div className={styles.container}>
				<Info isTimerActive={this.state.isTimerActive}
					currentMines={this.state.currentMines}
					activeButton={this.state.isActiveButton}
					className={styles.info}
					startGame={this.startGame}
					smile={this.state.smile}
				/>
				<div className={styles.field}>
					{this.state.cells.map((item, x) => {
						return item.map((element, y) => {
							return <Cell
								key={x * 16 + y}
								onClick={this.handleClick}
								onContextMenu={this.handleContextMenu}
								onMouseEvent={this.handleMouseEvent}
								x={x}
								y={y}
								show={element.show}
								disabled={element.disabled}
								class={this.state.class}
							>
								{element.value}
							</Cell>
						})
					})}
				</div>
			</div>
		);
	}
}