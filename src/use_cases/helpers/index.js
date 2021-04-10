function getSafeDeleteParams(dateUtils, account) {
  return { deleted: true, deletedAt: dateUtils.now(), deletedBy: account.id };
}

module.exports = { getSafeDeleteParams };
