/**
 * Format a date relative to the current time
 * @param {Date} date 
 * @returns {string} Formatted date
 */
export const formatDistanceToNow = (date) => {
  const now = new Date()
  const diffInDays = Math.floor((date - now) / (1000 * 60 * 60 * 24))
  
  if (diffInDays < 0) {
    return `Overdue by ${Math.abs(diffInDays)} day${Math.abs(diffInDays) !== 1 ? 's' : ''}`
  }
  
  if (diffInDays === 0) {
    return 'Due today'
  }
  
  if (diffInDays === 1) {
    return 'Due tomorrow'
  }
  
  if (diffInDays < 7) {
    return `Due in ${diffInDays} days`
  }
  
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `Due in ${weeks} week${weeks !== 1 ? 's' : ''}`
  }
  
  // Format as a regular date for dates far in the future
  return `Due on ${date.toLocaleDateString()}`
}