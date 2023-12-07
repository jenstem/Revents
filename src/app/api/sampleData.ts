import { Timestamp } from "firebase/firestore";

export const sampleData = [
    {
        id: '1',
        title: 'Trip to Empire State building',
        // date: '2018-03-21',
        // need to times by 86400000 to get the milliseconds into days
        date: Timestamp.fromDate(new Date(Date.now() + 30 * 86400000)),
        category: 'culture',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'NY, USA',
        venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
        hostedBy: 'Bob',
        hostPhotoURL: 'https://www.pexels.com/photo/photo-of-a-man-listening-music-on-his-phone-846741/',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://www.pexels.com/photo/photo-of-a-man-listening-music-on-his-phone-846741/'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://www.pexels.com/photo/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-in-front-of-white-wall-2379004/'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: Timestamp.fromDate(new Date(Date.now() + 60 * 86400000)),
        category: 'drinks',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://www.pexels.com/photo/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-in-front-of-white-wall-2379004/',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://www.pexels.com/photo/photo-of-a-man-listening-music-on-his-phone-846741/'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://www.pexels.com/photo/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-in-front-of-white-wall-2379004/'
            }
        ]
    }
];
