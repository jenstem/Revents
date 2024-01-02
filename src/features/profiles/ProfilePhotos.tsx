import { Grid, Header, Tab, Button, Card, Image } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { auth, storage } from "../../app/config/firebase";
import PhotoUpload from "./PhotoUpload";
import { useAppSelector } from "../../app/store/store";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./photosSlice";
import { updateProfile } from "firebase/auth";
import { Photo } from "../../app/types/profile";
import { deleteObject, ref } from 'firebase/storage';
import { toast } from "react-toastify";



type Props = {
    profile: Profile
}

export default function ProfilePhotos({ profile }: Props) {
    const [editMode, setEditMode] = useState(false);
    const isCurrentUser = auth.currentUser?.uid === profile.id;
    const { data: photos, status } = useAppSelector(state => state.photos);
    const { loadCollection, remove } = useFireStore(`profiles/${profile.id}/photos`);
    // add update function from useFireStore for setting main profile picture
    const { update } = useFireStore('profiles');

    useEffect(() => {
        // actions from photosSlice.ts
        loadCollection(actions);
    }, [loadCollection])

    // create to set main profile picture
    async function handleSetMain(photo: Photo) {
        await update(profile.id, {
            photoURL: photo.url

        });
        await updateProfile(auth.currentUser!, {
            photoURL: photo.url
        });
    }

    // delete a profile picture
    async function handleDeletePhoto(photo: Photo) {
        try {
            // delete from storage
            const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
            await deleteObject(storageRef);
            await remove(photo.id);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        // add loading message to Tab.Pane
        <Tab.Pane loading={status === 'loading'}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='photo' content='Photos' />
                    {isCurrentUser &&
                        <Button
                            floated='right'
                            basic
                            content={editMode ? 'Cancel' : 'Add photo'}
                            onClick={() => setEditMode(!editMode)}
                        />}
                </Grid.Column>
                <Grid.Column width={16}>
                    {/* Add photoupload here with Props from PhotoUpload.tsx*/}
                    {editMode ? <PhotoUpload profile={profile} setEditMode={setEditMode} /> : (
                        <Card.Group itemsPerRow={5}>
                            {photos.map(photo => (
                                // because we're mapping over photos, we'll need an unique key
                                <Card key={photo.id}>
                                    {/*  set source = photo.url */}
                                    <Image src={photo.url} />
                                    {isCurrentUser &&
                                        <Button.Group>
                                            <Button
                                                basic
                                                color='green'
                                                // don't let them select the main photo if it's already the main photo
                                                disabled={photo.url === profile.photoURL}
                                                onClick={() => handleSetMain(photo)}
                                                >Main</Button>
                                            <Button
                                                basic
                                                color='red'
                                                icon='trash'
                                                disabled={photo.url === profile.photoURL}
                                                onClick={() => handleDeletePhoto(photo)}
                                                />
                                        </Button.Group>}
                                </Card>
                            ))}

                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}