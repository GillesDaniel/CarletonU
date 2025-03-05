/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023, 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import moment from 'moment-timezone';
import { DataFormatter } from '@maximo/maximo-js-api';

const runOptimizationForEmergency = async (app) => {
  const projectDS = app.findDatasource('skdprojectsDS');
  const option = {
    record: projectDS.items[0],
    parameters: {},
  };

  await projectDS.invokeAction('runOptimizationEm', option);
};

const formatTime = (timestamp) => {
  const formattedTimeString = moment(timestamp).format('hh:mm A');
  if (formattedTimeString.charAt(0) === '0') {
    return formattedTimeString.substring(1);
  }
  return formattedTimeString;
};

const formatHoursToHoursMinutes = (duration) => {
  const formattedHoursMinutesString = moment
    .utc(moment.duration(duration, 'hours').asMilliseconds())
    .format('HH:mm');
  if (formattedHoursMinutesString.charAt(0) === '0') {
    return formattedHoursMinutesString.substring(1);
  }
  return formattedHoursMinutesString;
};

const formatDateTime = (timestamp, timezone) => {
  if (!timestamp) {
    return '';
  }
  const dataFormatter = DataFormatter.get();
  return dataFormatter.dateTimeToString(timestamp, null, null, timezone, null);
};

const functions = {
  runOptimizationForEmergency,
  formatTime,
  formatHoursToHoursMinutes,
  formatDateTime,
};

export default functions;
