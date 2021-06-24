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
  return input.reduce((users, user) => {
    const existingUser = users.find((u) => {
      return (
        u.id === user.id &&
        u.name === user.name &&
        u.email === user.email &&
        u.created_at_date === user.created_at_date
      );
    });
    if (!existingUser) users.push(user);
    return users;
  }, []);
}

export function cleanse(input) {
  return input.map((user) => {
    user['Lead Status'] = user['Lead Status']
      .replaceAll('Interrrrrested', 'Interested')
      .replaceAll('Customerr', 'Customer');

    user['Registered At'] = user['Registered At'].replace(/s.+$/, '');

    return user;
  });
}

// Codealong: Data Analysis in Node.js
export function getInterestedRepeatCustomers(inputHubspot, inputStripe) {
  return inputHubspot.map((hubspotUser) => {
    // Identify by first name and last name because
    // sometimes the email address doesn't match
    const firstName = hubspotUser['First Name'].split(' ')[0];
    const lastName = hubspotUser['Last Name'];
    const mailchimpUser = inputMailchimp.find(
      (user) => user.firstName === firstName && user.lastName === lastName,
    );
    const stripeTransaction = inputStripe.find((transaction) => {
      const fName = transaction.name.split(' ')[0];
      const lName = transaction.name.split(' ').pop();
      return fName === firstName && lName === lastName;
    });

    return {
      hubspotContactId: hubspotUser['Contact Id'],
      firstName,
      lastName,
      hubspotLeadStatus: hubspotUser['Lead Status'],
      hubspotRegisteredAt: hubspotUser['Registered At'],
      hubspotTotalValue: hubspotUser['Total Value'],
      mailchimpEmail: mailchimpUser.emailAddress,
      mailchimpStatus: mailchimpUser.status,
      mailchimpAudienceName: mailchimpUser.audienceName,
      mailchimpSubscribeDate: mailchimpUser.subscribeDate,
      stripeId: stripeTransaction?.id,
      stripeEmail: stripeTransaction?.email,
      stripeCreatedAt: stripeTransaction?.created_at_date,
    };
  });
}

export function getTotalValueOfAllCustomers(input) {
  return input;
}

export function getUsersWithNonMatchingEmails(inputMailchimp, inputStripe) {
  return [];
}
