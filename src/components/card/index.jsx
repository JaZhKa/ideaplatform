import styles from './card.module.css';
import airlineLogo from './../../../public/img/TK.png';
import lineairplane from './../../../public/img/lineairplane.png';

const Card = ({ ticket, currency }) => {
	const viewCurrency = (price, currency) => {
		switch (currency) {
			case 'rub':
				return `${price}₽`;
			case 'usd':
				return `${Math.floor(price / 100)}$`;
			case 'eur':
				return `${Math.floor(price / 104)}€`;
			default:
				return price;
		}
	};

	const handleClickBuy = () => {
		alert(
			`Билет из ${ticket.origin} в ${ticket.destination} за ${viewCurrency(
				ticket.price,
				currency
			)}`
		);
	};

	return (
		<div className={styles.card}>
			<div className={styles.buy}>
				<img
					src={airlineLogo}
					alt="airline logo"
					className="card__image"
				/>
				<button
					className={styles.button}
					onClick={handleClickBuy}
				>
					Купить <br /> за {viewCurrency(ticket.price, currency)}
				</button>
			</div>
			<div className={styles.info}>
				<div className={styles.departure}>
					<div className={styles.departureTime}>{ticket.departure_time}</div>
					<div className={styles.departureCity}>
						{`${ticket.origin}, ${ticket.origin_name}`}
					</div>
					<div className={styles.departureDate}>{ticket.departure_date}</div>
				</div>
				<div className={styles.transfers}>
					{ticket.stops ? (
						<div className={styles.transfersInfo}>
							{ticket.stops} пересадк
							{+ticket.stops > 1 ? `и` : `а`}
						</div>
					) : (
						<div className={styles.transfersInfo}>{`Без пересадок`} </div>
					)}
					<div className={styles.airplane}>
						<img
							src={lineairplane}
							alt="airplane"
						/>
					</div>
				</div>
				<div className={styles.destination}>
					<div className={styles.destinationTime}>{ticket.arrival_time}</div>
					<div className={styles.destinationCity}>
						{`${ticket.destination}, ${ticket.destination_name}`}
					</div>
					<div className={styles.destinationDate}>{ticket.arrival_date}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
