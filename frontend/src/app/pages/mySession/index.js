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
						<thead>
							<tr>
								<th>Date</th>
								<th>Module</th>
								<th>Groupe</th>
							</tr>
						</thead>
						<tbody>						
							{ (Object.keys(mySession).length === 0)? (
								<PageLoader />
							):(                            
								Object.entries(mySession). map(m => (
									<div>
										{
											Object.entries(m[1]). map(n => (
												<div>
													{
														Object.entries(n[1]). map(o => (
															<Session session={o[1][0]} />
														))
													}
												</div>												
											))
										}
									</div>									
								))
							)}
						</tbody>
					</table>
				</div>
			</Card>
		</Container>
	)
}