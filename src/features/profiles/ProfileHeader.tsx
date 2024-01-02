import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";


type Props = {
    profile: Profile
}

export default function ProfileHeader({profile}: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.photoURL || '/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header
                                    as='h1'
                                    style={{ display: 'block', marginBottom: 10 }}
                                    content={profile.displayName}
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group>
                        <Statistic label='Followers' value={10} />
                        <Statistic label='Following' value={5} />
                    </Statistic.Group>
                    <Divider />
                    {/* When you reveal content, what you want to show is put in the Reveal.Content */}
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{ width: '100%' }}>
                            <Button
                                fluid
                                color='teal'
                                content='Following'
                            />
                        </Reveal.Content>
                        <Reveal.Content hidden style={{ width: '100%' }}>
                            <Button
                                fluid
                                basic
                                color='red'
                                content='Unfollow'
                            />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}