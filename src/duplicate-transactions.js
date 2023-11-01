
function findDuplicateTransactions(transactions) {
    // Initialize a Map to store groups of duplicate transactions.
    const correspondingGroups = new Map();
 
    // Iterate over each transaction in the input array.
    transactions.forEach((transaction1, i) => {
        // Iterate over all transactions in the array starting from the next transaction (i+1).
        transactions.slice(i + 1).forEach((transaction2) => {
            /** Compare if transaction1 and transaction2 have the same source account, target account, amount, category,
                and their time difference is less than or equal to 60,000 milliseconds (1 minute).*/
            if (
                transaction1.sourceAccount === transaction2.sourceAccount &&
                transaction1.targetAccount === transaction2.targetAccount &&
                transaction1.amount === transaction2.amount &&
                transaction1.category === transaction2.category &&
                Math.abs(new Date(transaction1.time) - new Date(transaction2.time)) <= 60000
            ) {
                // Create a unique key for the group based on the transaction attributes.
                const groupKey = `${transaction1.sourceAccount}-${transaction1.targetAccount}-${transaction1.amount}-${transaction1.category}`;
                // If the group doesn't already exist in the Map, initialize it with the first transaction.
                if (!correspondingGroups.has(groupKey)) {
                    correspondingGroups.set(groupKey, [transaction1]);
                }
                // Add transaction2 to the existing group.
                correspondingGroups.get(groupKey).push(transaction2);
            }
        });
    });
 
    // Convert Map values (groups) to an array and sort them by the time of the first transaction in each group.
    return Array.from(correspondingGroups.values())
        .map((group) => group.sort((a, b) => new Date(a.time) - new Date(b.time)))
        .sort((group1, group2) => new Date(group1[0].time) - new Date(group2[0].time));
}

// Export the findDuplicateTransactions function for use in other parts of the application.
export default findDuplicateTransactions;
