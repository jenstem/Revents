// get these imports from filepond documentation
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { useState } from 'react';
import { useStore } from 'react-redux';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import { auth, storage } from '../../app/config/firebase';
import { createId } from '@paralleldrive/cuid2';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Profile } from '../../app/types/profile';
import { updateProfile } from 'firebase/auth';

// register plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageTransform);

type Props = {
    profile: Profile
    setEditMode: (value: boolean) => void
}

export default function PhotoUpload({profile, setEditMode}: Props) {
    // set up empty arrays
    const [files, setFiles] = useState<any>([]);
    const { update } = useFireStore('profiles');
    const { set } = useFireStore(`profiles/${auth.currentUser?.uid}/photos`);

    return (
        // copy from filepond documentation
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            // server="/api"
            // need to add server to upload
            server={{
                // specify process - parameters have to be used in the same order
                // can put an underscore in front and it will ignore the error
                process: (_fieldName, file, metadata, load, error, progress) => {
                    // what we want to happen when we upload a file
                    const id = createId();
                    // make sure to specify ref from firebase storage
                    const storageRef = ref(storage, `${auth.currentUser?.uid}/user_images/${id}`);
                    // create a task - use uploadBytesResumable from firebase storage
                    const task = uploadBytesResumable(storageRef, file);

                    task.on(
                        'state_changed',
                        snap => {
                            // first parameter is true because we are uploading, is length computable?
                            progress(true, snap.bytesTransferred, snap.totalBytes)
                        },
                        err => {
                            error(err.message)
                        },
                        () => {
                            getDownloadURL(task.snapshot.ref).then(async (url) => {
                                // check to see if user has a main photo
                                if (!profile.photoURL) {
                                    await update(profile.id, {
                                        photoURL: url
                                    });
                                    // updateProfile comes from firebase auth
                                    await updateProfile(auth.currentUser!, {
                                        photoURL: url
                                    })
                                }
                                // set new image
                                await set(id, {
                                    name: file.name,
                                    url
                                })
                                // turn off edit mode
                                setEditMode(false);
                            })
                            load(id);
                        }
                    )
                }
            }}
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            // turns off credits of company filepond
            credits={false}
            allowImageCrop={true}
            // gives us a square image
            imageCropAspectRatio='1:1'
            instantUpload={false}
        />
    )
}