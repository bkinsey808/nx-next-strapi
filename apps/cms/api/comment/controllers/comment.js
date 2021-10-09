const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.Author = ctx.state.User.id;
      entity = await strapi.services.comment.create(data, { files });
    } else {
      ctx.request.body.Author = ctx.state.User.id;
      entity = await strapi.services.comment.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [comment] = await strapi.services.comment.find({
      id: ctx.params.id,
      'Author.id': ctx.state.User.id,
    });

    if (!comment) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comment.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
