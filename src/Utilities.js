
export const getSentTimeStr = (timeToEvaluate) => {
    var sentTimeStr;
    var sentTime = new Date(timeToEvaluate);
    var now = new Date();
    // Same Day
    if( (sentTime.getFullYear() === now.getFullYear()) &&
        (sentTime.getMonth() === now.getMonth()) && 
        (sentTime.getDate() === now.getDate()) ) 
        {
            sentTimeStr = sentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }
    // Same Year
    else if(sentTime.getFullYear() === now.getFullYear())
        sentTimeStr = sentTime.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    // Last year & backwards
    else
        sentTimeStr = sentTime.toDateString();

    return sentTimeStr;
};

export const getSentTimeStrExt = (timeToEvaluate) => {
    var sentTimeStr;
    var sentTime = new Date(timeToEvaluate);
    var now = new Date();
    // Same Day
    if( (sentTime.getFullYear() === now.getFullYear()) &&
        (sentTime.getMonth() === now.getMonth()) && 
        (sentTime.getDate() === now.getDate()) ) 
        {
            sentTimeStr = sentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        }
    // Same Year
    else if(sentTime.getFullYear() === now.getFullYear())
        sentTimeStr = sentTime.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    // Last year & backwards
    else
        sentTimeStr = sentTime.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

    return sentTimeStr;
};