import { Image, List } from "semantic-ui-react";
import { Attendee } from "../../../app/types/event";
import { Link } from "react-router-dom";

type Props = {
    attendee: Attendee
}

    export default function EventListAttendee({attendee}: Props) {
    return (
        // add Link and link to profile, so you can click on picture and go to user's profile
        <List.Item as={Link} to={`/profiles/${attendee.id}`}>
            <Image size='mini' circular src={attendee.photoURL} />
        </List.Item>
    )
}