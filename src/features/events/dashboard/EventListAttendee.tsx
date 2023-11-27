import { Image, List } from "semantic-ui-react";
// import Attendee
import { Attendee } from "../../../app/types/event";

type Props = {
    attendee: Attendee
}

// change any to Props
// export default function EventListAttendee({attendee}: any) {
    export default function EventListAttendee({attendee}: Props) {
    return (
        <List.Item>
            <Image size='mini' circular src={attendee.photoURL} />
        </List.Item>
    )
}