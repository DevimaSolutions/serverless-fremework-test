const getMinutelyTimeStamp = (date: Date) => {
  const resultDate = new Date(date);
  resultDate.setSeconds(0);
  resultDate.setMilliseconds(0);
  return resultDate.getTime();
};

const timeUtil = { getMinutelyTimeStamp };

export default timeUtil;
