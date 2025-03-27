export const validateISSN = (issn: string): boolean => {
    const formattedIssn = issn.replace(/-/g, "").toUpperCase();
  
    if (!/^\d{7}[\dX]$/.test(formattedIssn)) return false;
  
    const digits = formattedIssn.split("").map((char) => (char === "X" ? 10 : parseInt(char, 10)));
    const checksum = digits
      .slice(0, 7)
      .reduce((sum, digit, index) => sum + digit * (8 - index), 0);
  
    return checksum % 11 === digits[7];
  };