module.exports = Object.freeze({
  PRODUCT_CREATED: {
    FR: 'Votre produit a bien été enregistré',
    EN: 'Your product has been successfully updated',
  },
  PRODUCT_UPDATED: {
    FR: 'Votre produit a bien été mis à jour',
    EN: 'Your product has been successfully updated',
  },
  PRODUCT_DELETED: function ({ name }) {
    return {
      FR: `Le produit <${name}> a bien été supprimé`,
      EN: `Product <${name}> has been successfully deleted`,
    };
  },
});
