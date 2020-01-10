import React, {useState, useEffect} from 'react';
import {APIgetMySession} from '../../../api/sessionFetch';
import style from './mySession.module.css';
import Session from '../../../components/sessions_components/Session';
import {
	Container,
	Card,
	CardHeader
} from 'shards-react';
import PageLoader from '../../../components/layouts/loader';

export default function MySession()
{
	const [mySession, setMySession] = useState({});
	const [refresh, setRefresh] = useState(0);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true)
		APIgetMySession()
		.then(data => {     
			setMySession(data.data);
			setLoader(false)
		})
		.catch(err => console.log(err));
	}, [refresh])
;

	return (
		<>
			<Container fluid className={style.EventsContainer}>
				<Card >
					<CardHeader><h5>Mes seances</h5></CardHeader>
					<div className="table-responsive">
						<table className={`table  ${style.EventTable}`}>
							<tr>
								<th>Date</th>
								<th>Module</th>
								<th>Groupe</th>
								<th>Modification</th>
							</tr>
							<tbody>

							{ (Object.keys(mySession).length > 0) && (
								Object.entries(mySession). map(years => (
									<>
										{
											Object.entries(years[1]). map(week => (
												<>
													{
														Object.entries(week[1]). map(day => (
															<Session key={day[1][0]} session={day[1][0]} setRefresh={setRefresh} refresh={refresh} />
														))
													}
												</>
											))
										}
									</>
								))
							)}
							</tbody>
						</table>
					</div>
				</Card>
			</Container>
			{loader &&
			<PageLoader />
			}
		</>
	)
}