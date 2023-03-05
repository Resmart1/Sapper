import React from "react";
import styles from './Rules.module.css';

export default function Rules() {
	return (
		<div className={styles.rules}>
			<ul>
				<li>1. Для старта нажмите на любую клетку</li>
				<li>2. Для рестарта нажмите на смайлик</li>
			</ul>
		</div>
	);
}