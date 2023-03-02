function commaFormat(num) {
  return num?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || 0;
}

export default commaFormat;
