import React, {useState, useEffect} from 'react';
import {APIgetMySession} from '../../api/sessionFetch';
import style from './mySession.module.css';
import Session from '../../components/sessions_components/Session';
import {
	Container,
	Card,
	CardHeader
} from 'shards-react';
import PageLoader from '../../components/layouts/loader';

export default function MySession()
{
	const [mySession, setMySession] = useState({})

	useEffect(() => {
		APIgetMySession()
		.then(data => {     
			setMySession(data.data);            
		})
		.catch(err => console.log(err));
	}, [])

	return (
		<Container fluid className={style.EventsContainer}>
			<Card >
				<CardHeader><h5>Mes sessions</h5></CardHeader>
				<div className="table-responsive">
					<table className={`table  ${style.EventTable}`}>
							<tr>
								<th>Date</th>
								<th>Module</th>
								<th>Groupe</th>
							</tr>
							{ (Object.keys(mySession).length === 0)? (
								<PageLoader />
							):(
								Object.entries(mySession). map(years => (
									<>
										{
											Object.entries(years[1]). map(week => (
												<>
													{
														Object.entries(week[1]). map(day => (
															<Session session={day[1][0]} />
														))
													}
												</>
											))
										}
									</>
								))
							)}
					</table>
				</div>
			</Card>
		</Container>
	)
}