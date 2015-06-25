var models = require("../models/models");
var moment = require('moment');
var validations = require('../validations/validations');
var utils = require("../utils/utils");

module.exports =
{
  root:
  {
    handler: function (request, reply)
    {
      reply('Hello, Andy!');
    }
  },

  contacts:
  {
    handler: function (request, reply)
    {
      models.Contact.fetchAll().then(
        function (contacts)
        {
          reply(utils.formatJson('contacts', contacts));
        });
    }
  },

  contact:
    {
      handler: function (request, reply)
      {
        new models.Contact({ id: request.params.id }).fetch().then(
          function (contact)
          {
            reply(utils.formatJson('contact', contact));
          });
      }
    },

  contactCreate: {
    handler: function (request, reply)
    {
      request.payload.contact.created_at = new Date();
      request.payload.contact.updated_at = new Date();
      new models.Contact(request.payload.contact).save().then(function (contact)
      {
        reply(utils.formatJson('contact', contact));
      });
    },
    validate:
    {
      payload: validations
    }
  },

  contactUpdate:
  {
    handler: function (request, reply)
    {
      request.payload.contact.updated_at = new Date();
      new models.Contact(request.payload.contact).save().then(function (contact)
      {
        reply(utils.formatJson('contact', contact));
      });
    },
    validate:
    {
      payload: validations
    }
  },

  contactDelete: {
    handler: function (request, reply)
    {
      new models.Contact(request.params).destroy().then(function (contact)
      {
        reply(JSON.stringify(contact));
      });
    }
  }

};