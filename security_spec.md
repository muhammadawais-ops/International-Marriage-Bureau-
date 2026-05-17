# NikahConnect Security Specification

## Data Invariants
1. A user profile MUST have a valid UID matching the authenticated user.
2. A match can only exist between two distinct, verified users.
3. Chat access is strictly limited to the two participants defined in the match.
4. Photos are blurred by default and only revealed on mutual match or user-driven permissions.
5. Wali (Guardian) access is read-only unless explicitly granted permission to approve/decline matches.

## The "Dirty Dozen" Payloads (Deny List)
1. **Identity Theft**: Creating a profile for another UID.
2. **Age Bypass**: Setting DOB to make user under 18.
3. **Ghost Verification**: Manually setting `isVerified: true` without admin action.
4. **Unauthorized Read**: Reading a non-matched user's private photos.
5. **Chat Hijack**: Sending messages to a chat where user is not a participant.
6. **Wali Escalation**: Wali trying to edit a user's bio or education.
7. **Relational Sync Failure**: Creating a match without a corresponding mutual like event.
8. **Spamming Likes**: Exceeding the daily like limit (enforced via rules + timestamps).
9. **Gender Swapping**: Changing gender after initial registration to bypass filters.
10. **Screenshot Leak**: Attempting to query raw photo URLs if they are restricted (though client-side mostly).
11. **Orphaned Message**: Writing a message to a non-existent chat.
12. **Status Poisoning**: Marking a match as 'Nikah Complete' without parent verification.

## Identity Hierarchy
- **Level 0**: Anonymous (No access)
- **Level 1**: Authenticated (Can create profile, browse basic public info)
- **Level 2**: Verified (Can like, match, chat)
- **Level 3**: Wali (Linked to a user, restricted view/action)
- **Level 4**: Admin (System moderation)
