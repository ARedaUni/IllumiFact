export function convertToStringData(date: string | null) {
  if(typeof date === 'string'){
    const x = new Date(date as string);
    const day = x.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[x.getMonth()];
    const year = x.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }
  return null;
  }

export function convertToStringDateWithTime(date: string | null){
  if(typeof date === 'string'){
    const x = new Date(date);
    const day = x.getDate();
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[x.getMonth()];
    const year = x.getFullYear();
  
    let hours = x.getHours();
    const minutes = x.getMinutes().toString().padStart(2, '0'); 
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
  
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes} ${amOrPm}`; 
    return formattedDate;
  }
  return null;
}