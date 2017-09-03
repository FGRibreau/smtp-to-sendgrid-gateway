// String -> Array[EmailAddress]
// EmailAddress = {name: String, email: String}
function parseAddresses(addresses) {
  return addresses.trim().split(',').map(function(entry) {
    if (!entry.includes('<')) {
      return { email: entry, name: entry };
    }

    const enc = entry.split('<');
    const name = enc[0].trim();
    const address = enc[1].split('>')[0].trim();
    return { email: address, name: name };
  });
}

module.exports = {
  parseAddresses,
};
