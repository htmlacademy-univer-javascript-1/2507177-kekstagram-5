function parseTime(timeString) {
  const [hour, minute] = timeString.split(':');
  return hour * 60 + Number(minute);
}

function checkMeeting(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartMinutes = parseTime(dayStart);
  const dayEndMinutes = parseTime(dayEnd);
  const meetingStartMinutes = parseTime(meetingStart);

  return (
    meetingStartMinutes >= dayStartMinutes &&
    meetingStartMinutes + meetingDuration <= dayEndMinutes
  );
}

console.log(checkMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(checkMeeting('8:0', '10:0', '8:0', 120));     // true
console.log(checkMeeting('08:00', '14:30', '14:00', 90)); // false
console.log(checkMeeting('14:00', '17:30', '08:0', 90));  // false
console.log(checkMeeting('8:00', '17:30', '08:00', 900)); // false
