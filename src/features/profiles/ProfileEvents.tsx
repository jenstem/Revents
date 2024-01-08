import { Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Profile } from "../../app/types/profile";
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import { useAppSelector } from "../../app/store/store";
import { CollectionOptions } from "../../app/hooks/firestore/types";
import { actions } from "../events/eventSlice";

// pass profile into profileEvents
type Props = {
    profile: Profile
}
// pass profile and props in
export default function ProfileEvents({ profile }: Props) {
    // remove local state, we no longer need it after we set up our custom hook handleSetQuery
    // const [activeTab, setActiveTab] = useState(0);
    // add const loadCollection and data: events, status
    const { loadCollection } = useFireStore('events');
    const { data: events, status } = useAppSelector(state => state.events);
    const panes = [
        { menuItem: 'Future Events', pane: { key: 'future' } },
        { menuItem: 'Past Events', pane: { key: 'past' } },
        { menuItem: 'Hosting', pane: { key: 'hosting' } }
    ]

    // add initialOptions
    const initialOptions: CollectionOptions = {
        queries: [
            { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
            { attribute: 'date', operator: '>=', value: new Date() }
        ],
        sort: { attribute: 'date', order: 'asc' }
    }

    // we'll store our query in local state
    // we're setting the options based on the initial state
    const [options, setOptions] = useState<CollectionOptions>(initialOptions);

    // add function to handle set query
    function handleSetQuery(tab: number) {
        let options: CollectionOptions = {} as CollectionOptions;
        switch (tab) {
            // past events
            case 1:
                options.queries = [
                    { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
                    { attribute: 'date', operator: '<', value: new Date() }
                ]
                options.sort = { attribute: 'date', order: 'desc' }
                break;

                // hosting events
            case 2:
                options.queries = [
                    { attribute: 'hostUid', operator: '==', value: profile.id }
                ],
                options.sort = {attribute: 'date', order: 'asc'}
                break;
                // default is set to what we had initially
            default:
                options = initialOptions
                break;
        }
        setOptions(options);
    }

    // add useEffect
    useEffect(() => {
        // actions come from eventSlice
        loadCollection(actions, options)
    }, [loadCollection, options])

    return (
        // give tab pane a loading property
        <Tab.Pane loading={status === 'loading'}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content='events' />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                    // change setActiveTab to handleSetQuery
                        onTabChange={(_e, data) => handleSetQuery(data.activeIndex as number)}
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                    />
                    <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
                        {events.map(event => (
                            // add a key because we are mapping over
                            <Card as={Link} to='/' key={event.id}>
                                <Image src={`/categoryImages/drinks.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }} />
                                <Card.Content>
                                    {/*  replace content with event.title */}
                                    <Card.Header content={event.title} textAlign='center' />
                                    <Card.Meta textAlign='center'>
                                        {/*  replace Date with event.date */}
                                        <span>{event.date}</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}