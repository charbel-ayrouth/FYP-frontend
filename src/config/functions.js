import { formatDistanceToNow } from 'date-fns'

export function getInitials(name) {
  let initials = name.match(/\b\w/g) || []
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  return initials
}

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}
