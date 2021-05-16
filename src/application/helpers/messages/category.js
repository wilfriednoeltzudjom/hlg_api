module.exports = Object.freeze({
  CATEGORY_CREATED: {
    FR: 'Votre categorie a bien été enregistrée',
    EN: 'Your category has been successfully saved',
  },
  CATEGORY_UPDATED: {
    FR: 'Votre catégorie a bien été mise à jour',
    EN: 'Your category has been successfully updated',
  },
  CATEGORY_DELETED: function ({ name }) {
    return {
      FR: `La catégorie <${name}> a bien été supprimée`,
      EN: `Category <${name}> has been successfully deleted`,
    };
  },
});
