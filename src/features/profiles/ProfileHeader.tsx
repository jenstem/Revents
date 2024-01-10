import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { auth } from "../../app/config/firebase";
import { getDoc, increment } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../app/config/firebase";
import { doc } from "firebase/firestore";
import { useAppDispatch } from "../../app/store/store";
import { actions } from "./profileSlice";



type Props = {
    profile: Profile
}

export default function ProfileHeader({ profile }: Props) {
    const { update } = useFireStore('profiles');
    const { set: setFollower, remove: removeFollower } = useFireStore(`profiles/${profile.id}/followers`);
    const { set: setFollowing, remove: removeFollowing } = useFireStore(`profiles/${auth.currentUser?.uid}/following`);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const docRef = doc(db, `profiles/${profile.id}/followers/${auth.currentUser?.uid}`);
        getDoc(docRef).then(docSnap => {
            dispatch(actions.setFollowing({id: profile.id, isFollowing: docSnap.exists()}));
        })
    }, [dispatch, profile.id])

    // follow toggle
    async function handleFollowToggle(follow: boolean) {
        if (!profile.id || !auth.currentUser?.uid) return;
        setLoading(true);
        if (follow) {
            await update(auth.currentUser.uid, {
                followingCount: increment(1)
            });
            await update(profile.id, {
                followerCount: increment(1)
            });
            // set the following
            await setFollowing(profile.id, {
                displayName: profile.displayName,
                photoURL: profile.photoURL,
            });
            // set the follower
            await setFollower(auth.currentUser.uid, {
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
            });
            // unfollow
        } else {
            await update(auth.currentUser.uid, {
                followingCount: increment(-1)
            });
            await update(profile.id, {
                followerCount: increment(-1)
            });
            await removeFollowing(profile.id);
            await removeFollower(auth.currentUser.uid);
        }

        dispatch(actions.setFollowing({id: profile.id, isFollowing: follow}));
        setLoading(false);
    }


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
                        <Statistic label='Followers' value={profile.followerCount || 0} />
                        <Statistic label='Following' value={profile.followingCount || 0} />
                    </Statistic.Group>
                    <Divider />

                    <Reveal animated='move'>
                        <Reveal.Content visible style={{ width: '100%' }}>
                            <Button
                                fluid
                                color='teal'
                                content={profile.isFollowing ? 'Following' : 'Not following'}
                            />
                        </Reveal.Content>
                        <Reveal.Content hidden style={{ width: '100%' }}>
                            <Button
                                fluid
                                basic
                                color={profile.isFollowing ? 'red' : 'green'}
                                content={profile.isFollowing ? 'Unfollow' : 'Follow'}
                                onClick={() => handleFollowToggle(!profile.isFollowing)}
                                loading={loading}
                            />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}