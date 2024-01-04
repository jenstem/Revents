export type AppEvent = {
    // will match with the properties in sampleData.ts
    // do NOT need to use commas or semi-colons
    // we can make any of these optional by adding a ?
    // for example title?: string would make title optional
id: string
title: string
// you can also use date as the date type for date instead of string
date: string
category: string
description: string
city: string
venue: string
// add hostUid for the user who created the event - to link users to the event
hostUid: string
hostedBy: string
hostPhotoURL: string
// add boolean for cancel
isCancelled: boolean
// this is an array
attendees: Attendee[]
// add attendeeIds - an array of string - to link users to the event
// will allow for querying the database for the attendees
attendeeIds: string[]
}

// don't forget to export the type/array
export type Attendee = {
    id: string
    name: string
    photoURL: string
}