import styles from './filters.module.css';
import { useState } from 'react';

const Filters = ({ setCurrency, currency, updateTickets }) => {
	const [checkboxState, setCheckboxState] = useState({
		checkboxAll: false,
		checkbox0: false,
		checkbox1: false,
		checkbox2: false,
		checkbox3: false,
	});

	const checkedFilter = (e) => {
		setCheckboxState(prevState => {
			const newState = { ...prevState, [e.target.name]: e.target.checked };
	
			const currentStops = [];
			for (let i = 0; i <= 3; i++) {
				if (newState[`checkbox${i}`]) {
					currentStops.push(i);
				}
			}
	
			if (currentStops.length === 4) {
				updateTickets({ stops: undefined });
			} else if (currentStops.length === 0) {
				updateTickets({ stops: undefined });
			} else {
				updateTickets({ stops: currentStops });
			}
	
			return newState;
		});
	};

	const checkedAllTickets = (e) => {
		const checked = e.target.checked;

		setCheckboxState({
			checkboxAll: checked,
			checkbox0: checked,
			checkbox1: checked,
			checkbox2: checked,
			checkbox3: checked,
		});
		updateTickets({ stops: undefined });
	};

	const handleClickOnly = (stops) => {
		setCheckboxState({ ['checkbox' + stops]: 'checked' });
		updateTickets({ stops: [stops] });
	};

	const handleClickRub = () => setCurrency('rub');
	const handleClickUsd = () => setCurrency('usd');
	const handleClickEur = () => setCurrency('eur');

	return (
		<div className={styles.filterStyle}>
			<div className={styles.currencies}>
				<div className={styles.currenciesHeader}>Валюта</div>
				<div className={styles.currenciesButtons}>
					<button
						className={
							currency === 'rub'
								? [styles.rub, styles.active].join(' ')
								: styles.rub
						}
						onClick={handleClickRub}
					>
						rub
					</button>
					<button
						className={
							currency === 'usd' ? [styles.usd, styles.active].join(' ') : ''
						}
						onClick={handleClickUsd}
					>
						usd
					</button>
					<button
						className={
							currency === 'eur'
								? [styles.eur, styles.active].join(' ')
								: styles.eur
						}
						onClick={handleClickEur}
					>
						eur
					</button>
				</div>
			</div>
			<div className={styles.filterTransfers}>
				<div className={styles.transfersHeader}>Количество пересадок</div>
				<div className={styles.filterItems}>
					<div className={styles.filterItem}>
						<input
							id="all"
							type="checkbox"
							checked={checkboxState.checkboxAll}
							name="checkboxAll"
							value="all"
							onChange={checkedAllTickets}
						/>
						<label htmlFor="all">
							<span />
							Все
						</label>
					</div>
					{[0, 1, 2, 3].map((stops) => (
						<div
							key={stops}
							className={styles.filterItem}
						>
							<input
								id={`stops-${stops}`}
								type="checkbox"
								checked={checkboxState[`checkbox${stops}`]}
								name={`checkbox${stops}`}
								value={stops}
								onChange={checkedFilter}
							/>
							<label htmlFor={`stops-${stops}`}>
								<span />
								{stops === 0
									? 'Без пересадок'
									: `${stops} пересадк${stops > 1 ? 'и' : 'а'}`}
							</label>
							<button
								className={styles.onlyBtn}
								onClick={() => handleClickOnly(stops)}
							>
								ТОЛЬКО
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Filters;
