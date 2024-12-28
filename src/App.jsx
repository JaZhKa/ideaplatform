import './App.css';
import Card from './components/card';
import Filters from './components/filters';
import tickets from './../tickets.json';
import { useState } from 'react';

function App() {
	const [currency, setCurrency] = useState('rub');
	const [displayedTickets, setDisplayedTickets] = useState(tickets.tickets);

	const updateTickets = (filterCriteria) => {
		let filteredTickets = tickets.tickets;
		console.log(filterCriteria);

		if (filterCriteria.stops && filterCriteria.stops.length > 0) {
			filteredTickets = filteredTickets.filter((ticket) =>
				filterCriteria.stops.includes(ticket.stops)
			);
		}

		setDisplayedTickets(filteredTickets);
	};

	return (
		<>
			<img
				src="./../public/img/logo.png"
				alt="logo"
				className="logo"
			/>
			<div className="main">
				<Filters
					currency={currency}
					tickets={tickets.tickets}
					displayedTickets={displayedTickets}
					setCurrency={setCurrency}
					updateTickets={updateTickets}
				/>
				<ul>
					{displayedTickets.map((ticket) => (
						<li key={Math.random() * ticket.price}>
							<Card
								ticket={ticket}
								currency={currency}
							/>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default App;
