import { Comment, Header, Segment } from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import { ChatComment } from "../../../app/types/event";
import { ref } from "@firebase/database";
import { fb } from "../../../app/config/firebase";
import { onChildAdded } from "firebase/database";
import { Link } from "react-router-dom";

import { formatDistance } from 'date-fns';


type Props = {
    eventId: string
}

export default function EventDetailedChat({ eventId }: Props) {
    const [comments, setComments] = useState<ChatComment[]>([]);
    const [replyForm, setReplyForm] = useState<any>({
        open: false,
        commentId: null
    });

    useEffect(() => {
        const chatRef = ref(fb, `chat/${eventId}`);
        const unsubscribe = onChildAdded(chatRef, data => {
            const comment = { ...data.val(), id: data.key };
            setComments(prevState => ([...prevState, comment]));
        })
        return () => unsubscribe();
    }, [eventId])

    // Nested comments
    function createCommentTree(data: ChatComment[]) {
        const table = Object.create(null);
        data.forEach(item => table[item.id] = { ...item, childNodes: [] });
        const dataTree: ChatComment[] = [];
        data.forEach(item => {
            if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
            else dataTree.push(table[item.id])
        })
        return dataTree;
    }

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            {/* Add scroll to the chat */}
            <Segment attached style={{height: 400, overflowY: 'scroll'}}>
                {/* Move ChatForm to the top */}
                <ChatForm eventId={eventId} />
                {/* Add padding and margin to Comment.Group */}
                <Comment.Group style={{paddingBottom: 0, marginBottom: 0}}>
                    {/* Add reverse to the comment tree */}
                    {createCommentTree(comments).reverse().map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.photoURL || "/user.png"} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`profiles/${comment.uid}`}>
                                    {comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistance(comment.date, new Date())} Ago</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action
                                        onClick={() => setReplyForm({ open: true, commentId: comment.id })}
                                    >
                                        Reply
                                    </Comment.Action>
                                    {replyForm.open && replyForm.commentId === comment.id && (
                                        <ChatForm
                                            key={comment.id}
                                            eventId={eventId}
                                            parentId={comment.id}
                                            setReplyForm={setReplyForm}
                                        />
                                    )}
                                </Comment.Actions>
                            </Comment.Content>
                            <Comment.Group style={{ paddingBottom: 0 }}>
                                {comment.childNodes.map(child => (
                                    <Comment key={child.id}>
                                        <Comment.Avatar src={child.photoURL || "/user.png"} />
                                        <Comment.Content>
                                            <Comment.Author as={Link} to={`profiles/${child.uid}`}>
                                                {child.displayName}</Comment.Author>
                                            <Comment.Metadata>
                                                <div>{formatDistance(child.date, new Date())} Ago</div>
                                            </Comment.Metadata>
                                            <Comment.Text>{child.text}</Comment.Text>
                                            <Comment.Actions>
                                                <Comment.Action
                                                    onClick={() => setReplyForm({ open: true, commentId: child.id })}
                                                >
                                                    Reply
                                                </Comment.Action>
                                                {replyForm.open && replyForm.commentId === child.id && (
                                                    <ChatForm
                                                        key={comment.id}
                                                        eventId={eventId}
                                                        parentId={child.parentId}
                                                        setReplyForm={setReplyForm}
                                                    />
                                                )}
                                            </Comment.Actions>
                                        </Comment.Content>
                                    </Comment>
                                )
                                )}

                            </Comment.Group>



                        </Comment>
                    ))}

                </Comment.Group>

            </Segment>
        </>

    )
}