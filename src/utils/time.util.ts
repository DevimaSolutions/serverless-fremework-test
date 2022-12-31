const getMinutelyTimeStamp = (date: Date) => new Date(date.setSeconds(0)).setMilliseconds(0);

const timeUtil = { getMinutelyTimeStamp };

export default timeUtil;
