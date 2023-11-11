

export function convertTime24to12(time24) {
    let [hours, minutes] = time24.split(':');
    let period = +hours < 12 ? 'AM' : 'PM';
    hours = +hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}