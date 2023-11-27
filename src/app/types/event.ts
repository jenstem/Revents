export type AppEvent = {
    // will match with the properties in sampleData.ts
    // do NOT need to use commas or semi-colons
id: string
title: string
// you can also use date as the date type for date instead of string
date: string
description: string
city: string
venue: string
hostedBy: string
hostPhotoURL: string
// this is an array
attendees: Attendee[]
}

// don't forget to export the type/array
export type Attendee = {
    id: string
    name: string
    photoURL: string
}