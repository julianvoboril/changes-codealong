// Codealong: Data Sorting and Filtering in Node.js
export function sortBySubscriptionDate(input) {
  return input.sort(
    (a, b) => new Date(a.subscribeDate) - new Date(b.subscribeDate),
  );
}

export function sortByFirstName(input) {
  return input;
}

export function filterToFirstNameStartingWithB(input) {
  return input.filter((user) => user['First Name'].startsWith('B'));
}

export function filterToCreatedAfter2010(input) {
  return input;
}

// Codealong: Data Aggregation, Deduplication and Cleansing in Node.js
export function aggregateAllChannels(
  inputHubspot,
  inputMailchimp,
  inputStripe,
) {
  return [];
}

export function deduplicate(input) {
  return input;
}

export function cleanse(input) {
  return input;
}

// Codealong: Data Analysis in Node.js
export function getInterestedRepeatCustomers(inputHubspot, inputStripe) {
  return [];
}

export function getTotalValueOfAllCustomers(input) {
  return input;
}

export function getUsersWithNonMatchingEmails(inputMailchimp, inputStripe) {
  return [];
}
