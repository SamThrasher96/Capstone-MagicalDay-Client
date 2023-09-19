export const formatTime = (timeString) => {
    if (!timeString) {
        return '';
    }

    const parts = timeString.split(':');
    if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    } else {
        return timeString;
    }
}

export const formatDate = (dateString) => {
    if (!dateString) {
        return '';
    }

    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}
