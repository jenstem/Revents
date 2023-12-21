// change User to AppUser to avoid conflict with firebase.User
// for authentication - add providerId, uid, displayName
export type AppUser = {
    email: string | null
    photoURL: string | null
    uid?: string
    displayName: string | null
    providerId: string | null
}