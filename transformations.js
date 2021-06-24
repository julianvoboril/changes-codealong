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
  inputHubspot = cleanse(inputHubspot);
  inputStripe = deduplicate(inputStripe);

  return inputHubspot.filter((hubspotUser) => {
    const stripeTransactions = inputStripe.filter((transaction) => {
      const fName = transaction.name.split(' ')[0];
      const lName = transaction.name.split(' ').pop();
      return (
        fName === hubspotUser['First Name'] &&
        lName === hubspotUser['Last Name']
      );
    });
    return (
      ['Open Offer', 'Current Customer'].includes(hubspotUser['Lead Status']) &&
      stripeTransactions.length > 1
    );
  });
}

export function getTotalValueOfAllCustomers(input) {
  return [
    {
      total: input.reduce((total, user) => {
        return total + parseInt(user['Total Value']);
      }, 0),
    },
  ];
}

export function getUsersWithNonMatchingEmails(inputMailchimp, inputStripe) {
  inputStripe = deduplicate(inputStripe);

  return inputMailchimp
    .map((user) => {
      const stripeTransaction = inputStripe.find((transaction) => {
        const fName = transaction.name.split(' ')[0];
        const lName = transaction.name.split(' ').pop();
        return fName === user.firstName && lName === user.lastName;
      });

      return {
        mailchimpEmail: user.emailAddress,
        mailchimpStatus: user.status,
        mailchimpAudienceName: user.audienceName,
        mailchimpSubscribeDate: user.subscribeDate,
        stripeId: stripeTransaction?.id,
        stripeEmail: stripeTransaction?.email,
        stripeCreatedAt: stripeTransaction?.created_at_date,
      };
    })
    .filter(
      (user) => user.stripeEmail && user.mailchimpEmail !== user.stripeEmail,
    );
}
