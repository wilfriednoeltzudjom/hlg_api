module.exports = Object.freeze({
  SUPPLIER_CREATED: {
    FR: 'Votre fournisseur a bien été enregistré',
    EN: 'Your supplier has been successfully updated',
  },
  SUPPLIER_UPDATED: {
    FR: 'Votre fournisseur a bien été mis à jour',
    EN: 'Your supplier has been successfully updated',
  },
  SUPPLIER_DELETED: function ({ companyName }) {
    return {
      FR: `Le fournisseur <${companyName}> a bien été supprimé`,
      EN: `Supplier <${companyName}> has been successfully deleted`,
    };
  },
});
