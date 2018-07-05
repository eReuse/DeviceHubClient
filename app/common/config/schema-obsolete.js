module.exports = {
  'outgoing-lot': {
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Lot',
      'url': 'lots/outgoing-lot',
      'itemMethods': [
        'GET',
        'PATCH',
        'PUT',
        'DELETE'
      ],
      'fa': 'fa-folder',
      'resourceMethods': [
        'GET',
        'POST'
      ]
    },
    'to': {
      'sink': 2,
      'schema': {
        'email': {
          'type': 'email',
          'required': true,
          'sink': 5,
          'unique': true
        },
        'isOrganization': {
          'type': 'boolean',
          'sink': 2
        },
        'organization': {
          'type': 'string',
          'description': 'The name of the organization the account is in. Organizations can be inside others.',
          'sink': 1
        },
        'name': {
          'type': 'string',
          'description': 'The name of an account, if it is a person or an organization.',
          'sink': 3
        }
      },
      'get_from_data_relation_or_create': 'email',
      'doc': 'The user the lot goes to It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
      'type': [
        'objectid',
        'dict',
        'string'
      ],
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      }
    },
    'ancestors': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'doc': 'Although this is a data relation, we cannot specify it to eve as datasourcesare different. This is an ordered set of values where the first is the parent.'
          },
          'places': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'IncomingLot',
              'OutgoingLot',
              'Lot',
              'Place',
              'Package'
            ]
          },
          'lots': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'lots'
              }
            },
            'unique_values': true
          }
        }
      },
      'default': [],
      'materialized': true,
      'doc': 'The schema.schema of ancestors is populated with all subgroups. For example, Lot adds: ancestors.places and ancestors.lots. Which reads as follows:I inherit the following descendants form ancestor._id of type ancestor.@type:ancestor.places = [p1,p2...], ancestor.lots = [l1, l2...]'
    },
    'date': {
      'type': 'datetime',
      'description': 'An agreed or official date of creation or transfer for this lot, most useful in Incoming/Outgoing lots.',
      'sink': -2
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'OutgoingLot'
      ],
      'teaser': false
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'sharedWith': {
      'type': 'list',
      'default': [],
      'doc': 'Explicitly means that an user performed shared with to this resource, in contraposition of inherit the permission.',
      'readonly': true,
      'description': 'A list of accounts that this group is explicitly shared with.'
    },
    'label': {
      'type': 'string',
      'required': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'editable': true,
      'sink': 5
    },
    'children': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'lots': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'lots'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        },
        'pallets': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'pallets'
            }
          },
          'unique_values': true
        }
      },
      'default': {}
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'dict'
      },
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'materialized': true,
      'description': 'A list of events where the first one is the most recent.'
    },
    'perms': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'perm': {
            'type': 'string',
            'required': true,
            'allowed': [
              'ad',
              're',
              'e',
              'r'
            ]
          },
          'account': {
            'type': 'objectid',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'accounts'
            },
            'required': true
          }
        }
      },
      'default': [],
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'toOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the allocation, the user worked in.',
      'materialized': true
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    },
    'policies': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Policies'
          ],
          'teaser': false
        },
        'notifyPolicy': {
          'type': 'dict',
          'schema': {
            'endReuseTime': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeReused': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeRecycled': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'receiver': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'deliveryNote': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'recycler': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'disposal': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'refurbisherLocation': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'socialImpact': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'refurbisherTipology': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'nonResponseOfReceiver': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'startReuseTime': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeRepaired': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'reseller': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            }
          }
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'authorizedResellers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedResellers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            }
          }
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Write here any custom policy or message you want other users to see.',
          'sink': -4
        },
        'finalDisposal': {
          'type': 'dict',
          'schema': {
            'returnToCircuit': {
              'type': 'boolean'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'FinalDisposal'
              ],
              'teaser': false
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'disposeToCollectionPoint': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'returnToReseller': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            }
          }
        },
        'dataDestruction': {
          'type': 'dict',
          'schema': {
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'DataDestruction'
              ],
              'teaser': false
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'endDate': {
              'type': 'datetime'
            },
            'startDate': {
              'type': 'datetime'
            },
            'mechanical': {
              'type': 'boolean'
            },
            'eraseSectors': {
              'type': 'boolean'
            },
            'eraseBasic': {
              'type': 'boolean'
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            }
          }
        },
        'authorizedReceivers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedReceivers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'digitalGapIndividual': {
              'type': 'boolean'
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'endDate': {
              'type': 'datetime'
            }
          }
        },
        'url': {
          'type': 'url',
          'move': 'sameAs',
          'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
          'teaser': false
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'authorizedRefubrishers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedRefurbishers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            }
          }
        },
        'sameAs': {
          'type': 'list',
          'teaser': false,
          'unique': true
        }
      }
    }
  },
  'group-log-entry': {
    '_settings': {
      'parent': 'Thing',
      'useDefaultDatabase': false,
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'url': 'groups/log'
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'UpdateGroupLogEntry',
        'GroupLogEntry'
      ],
      'teaser': false
    },
    'removed': {
      'type': 'dict',
      'schema': {
        'places': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          'unique_values': true
        },
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'lots': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'lots'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        }
      }
    },
    'parent': {
      'type': 'dict',
      'schema': {
        '_id': {
          'type': 'string'
        },
        '@type': {
          'type': 'string'
        }
      }
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'added': {
      'type': 'dict',
      'schema': {
        'places': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          'unique_values': true
        },
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'lots': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'lots'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        }
      }
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'objectid'
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    }
  },
  'pallets': {
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Physical',
      'url': 'pallets',
      'itemMethods': [
        'GET',
        'PATCH',
        'PUT',
        'DELETE'
      ],
      'fa': 'fa-align-justify',
      'resourceMethods': [
        'GET',
        'POST'
      ]
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Pallet'
      ],
      'teaser': false
    },
    'ancestors': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'doc': 'Although this is a data relation, we cannot specify it to eve as datasourcesare different. This is an ordered set of values where the first is the parent.'
          },
          'places': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'IncomingLot',
              'OutgoingLot',
              'Lot',
              'Place',
              'Package'
            ]
          },
          'lots': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'lots'
              }
            },
            'unique_values': true
          }
        }
      },
      'default': [],
      'materialized': true,
      'doc': 'The schema.schema of ancestors is populated with all subgroups. For example, Lot adds: ancestors.places and ancestors.lots. Which reads as follows:I inherit the following descendants form ancestor._id of type ancestor.@type:ancestor.places = [p1,p2...], ancestor.lots = [l1, l2...]'
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'sharedWith': {
      'type': 'list',
      'default': [],
      'doc': 'Explicitly means that an user performed shared with to this resource, in contraposition of inherit the permission.',
      'readonly': true,
      'description': 'A list of accounts that this group is explicitly shared with.'
    },
    'label': {
      'type': 'string',
      'editable': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'sink': 5
    },
    'children': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        }
      },
      'default': {}
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'dict'
      },
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'materialized': true,
      'description': 'A list of events where the first one is the most recent.'
    },
    'perms': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'perm': {
            'type': 'string',
            'required': true,
            'allowed': [
              'ad',
              're',
              'e',
              'r'
            ]
          },
          'account': {
            'type': 'objectid',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'accounts'
            },
            'required': true
          }
        }
      },
      'default': [],
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'size': {
      'type': 'string',
      'allowed': [
        '800-1200',
        '1200-1000',
        '1000-1200',
        '800-600',
        '600-400',
        '400-300',
        '1016-1219',
        '106-1067',
        '1219-1219',
        '1219-1016',
        '1219-1067',
        '1016-1016',
        '1219-1143',
        '1118-1118',
        '914-914',
        '1219-914',
        '889-1156',
        '1219-508',
        '1016-1219',
        '1000-1200',
        '1165-1165',
        '1067-1067',
        '1100-1100',
        '800-1200'
      ],
      'allowed_description': {
        'Europe': {
          '800-600': '800 � 600 mm � 31.5 � 23.62 in',
          '1000-1200': '1000 � 1200 mm � 39.37 � 47.24 in',
          '1200-1000': '1200 � 1000 mm � 47.24 � 39.37 in',
          '600-400': '600 � 400 mm � 23.62 � 15.75 in',
          '400-300': '400 � 300 mm � 15.75 � 11.81 in',
          '800-1200': '800 � 1200 mm � 31.5 � 47.24 in'
        },
        'North America': {
          '1219-1219': '1219 � 1219 mm � 47.99 � 47.99 in',
          '889-1156': '889 � 1156 mm � 35.0 � 45.51 in',
          '914-914': '914 � 914 mm � 35.98 � 35.98 in',
          '1219-1143': '1219 � 1143 mm � 47.99 � 45.0 in',
          '1219-1067': '1219 � 1067 mm � 47.99 � 42.01 in',
          '1219-914': '1219 � 914 mm � 47.99 � 35.98 in',
          '1219-508': '1219 � 508 mm � 47.99 � 20.0 in',
          '1016-1016': '1016 � 1016 mm � 40.0 � 40.0 in',
          '106-1067': '106 � 1067 mm � 4.17 � 42.01 in',
          '1219-1016': '1219 � 1016 mm � 47.99 � 40.0 in',
          '1016-1219': '1016 � 1219 mm � 40.0 � 47.99 in',
          '1118-1118': '1118 � 1118 mm � 44.02 � 44.02 in'
        },
        'ISO': {
          '1165-1165': '1165 � 1165 mm � 45.87 � 45.87 in',
          '1000-1200': '1000 � 1200 mm � 39.37 � 47.24 in',
          '1016-1219': '1016 � 1219 mm � 40.0 � 47.99 in',
          '1067-1067': '1067 � 1067 mm � 42.01 � 42.01 in',
          '1100-1100': '1100 � 1100 mm � 43.31 � 43.31 in',
          '800-1200': '800 � 1200 mm � 31.5 � 47.24 in'
        }
      }
    }
  },
  'places': {
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Physical',
      'url': 'places',
      'itemMethods': [
        'GET',
        'PATCH',
        'PUT',
        'DELETE'
      ],
      'fa': 'fa-map-marker',
      'resourceMethods': [
        'GET',
        'POST'
      ]
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Place'
      ],
      'teaser': false
    },
    'ancestors': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'doc': 'Although this is a data relation, we cannot specify it to eve as datasourcesare different. This is an ordered set of values where the first is the parent.'
          },
          'places': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'places'
              }
            },
            'unique_values': true
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'IncomingLot',
              'OutgoingLot',
              'Lot',
              'Place',
              'Package'
            ]
          }
        }
      },
      'default': [],
      'materialized': true,
      'doc': 'The schema.schema of ancestors is populated with all subgroups. For example, Lot adds: ancestors.places and ancestors.lots. Which reads as follows:I inherit the following descendants form ancestor._id of type ancestor.@type:ancestor.places = [p1,p2...], ancestor.lots = [l1, l2...]'
    },
    'type': {
      'type': 'string',
      'allowed': [
        'Zone',
        'Department',
        'Warehouse',
        'CollectionPoint'
      ]
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'sharedWith': {
      'type': 'list',
      'default': [],
      'doc': 'Explicitly means that an user performed shared with to this resource, in contraposition of inherit the permission.',
      'readonly': true,
      'description': 'A list of accounts that this group is explicitly shared with.'
    },
    'geo': {
      'type': 'polygon',
      'modifiable': false,
      'description': 'Set the area of the place. Be careful! Once set, you cannot update the area.',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'required': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'editable': true,
      'sink': 5
    },
    'children': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'lots': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'lots'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        },
        'pallets': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'pallets'
            }
          },
          'unique_values': true
        },
        'places': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        }
      },
      'default': {}
    },
    'telephone': {
      'type': 'string'
    },
    'perms': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'perm': {
            'type': 'string',
            'required': true,
            'allowed': [
              'ad',
              're',
              'e',
              'r'
            ]
          },
          'account': {
            'type': 'objectid',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'accounts'
            },
            'required': true
          }
        }
      },
      'default': [],
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'address': {
      'type': 'dict',
      'schema': {
        'addressRegion': {
          'type': 'string',
          'description': 'The region. For example, CA.'
        },
        'addressCountry': {
          'type': 'string',
          'allowed_description': {
            'CX': 'Christmas Island',
            'CY': 'Cyprus',
            'VU': 'Vanuatu',
            'KM': 'Comoros',
            'ME': 'Montenegro',
            'OM': 'Oman',
            'IS': 'Iceland',
            'AD': 'Andorra',
            'SA': 'Saudi Arabia',
            'HR': 'Croatia',
            'MS': 'Montserrat',
            'BL': 'Saint Barth�lemy',
            'HU': 'Hungary',
            'CU': 'Cuba',
            'GR': 'Greece',
            'NI': 'Nicaragua',
            'AL': 'Albania',
            'MZ': 'Mozambique',
            'TD': 'Chad',
            'MG': 'Madagascar',
            'PY': 'Paraguay',
            'JE': 'Jersey',
            'TR': 'Turkey',
            'FK': 'Falkland Islands (Malvinas)',
            'GG': 'Guernsey',
            'IQ': 'Iraq',
            'PM': 'Saint Pierre and Miquelon',
            'VN': 'Viet Nam',
            'MO': 'Macao',
            'MR': 'Mauritania',
            'CZ': 'Czechia',
            'BW': 'Botswana',
            'GE': 'Georgia',
            'PG': 'Papua New Guinea',
            'PN': 'Pitcairn',
            'ET': 'Ethiopia',
            'RS': 'Serbia',
            'DZ': 'Algeria',
            'NP': 'Nepal',
            'CM': 'Cameroon',
            'SK': 'Slovakia',
            'EE': 'Estonia',
            'AS': 'American Samoa',
            'SN': 'Senegal',
            'JM': 'Jamaica',
            'TC': 'Turks and Caicos Islands',
            'GI': 'Gibraltar',
            'GP': 'Guadeloupe',
            'GQ': 'Equatorial Guinea',
            'NO': 'Norway',
            'ZW': 'Zimbabwe',
            'BA': 'Bosnia and Herzegovina',
            'SB': 'Solomon Islands',
            'PA': 'Panama',
            'GD': 'Grenada',
            'YT': 'Mayotte',
            'BJ': 'Benin',
            'GM': 'Gambia',
            'AM': 'Armenia',
            'AG': 'Antigua and Barbuda',
            'IM': 'Isle of Man',
            'BY': 'Belarus',
            'CF': 'Central African Republic',
            'RW': 'Rwanda',
            'BM': 'Bermuda',
            'PL': 'Poland',
            'GS': 'South Georgia and the South Sandwich Islands',
            'AZ': 'Azerbaijan',
            'RO': 'Romania',
            'DO': 'Dominican Republic',
            'CV': 'Cabo Verde',
            'BN': 'Brunei Darussalam',
            'BG': 'Bulgaria',
            'TN': 'Tunisia',
            'RU': 'Russian Federation',
            'CD': 'Congo, Democratic Republic of the',
            'SC': 'Seychelles',
            'DM': 'Dominica',
            'MV': 'Maldives',
            'MA': 'Morocco',
            'TW': 'Taiwan, Province of China',
            'DJ': 'Djibouti',
            'SO': 'Somalia',
            'BV': 'Bouvet Island',
            'EC': 'Ecuador',
            'BD': 'Bangladesh',
            'SJ': 'Svalbard and Jan Mayen',
            'SR': 'Suriname',
            'GL': 'Greenland',
            'PT': 'Portugal',
            'GU': 'Guam',
            'NZ': 'New Zealand',
            'TG': 'Togo',
            'SM': 'San Marino',
            'BQ': 'Bonaire, Sint Eustatius and Saba',
            'TZ': 'Tanzania, United Republic of',
            'ZA': 'South Africa',
            'ID': 'Indonesia',
            'EH': 'Western Sahara',
            'AU': 'Australia',
            'GH': 'Ghana',
            'BO': 'Bolivia, Plurinational State of',
            'CN': 'China',
            'CL': 'Chile',
            'VC': 'Saint Vincent and the Grenadines',
            'JP': 'Japan',
            'CR': 'Costa Rica',
            'MX': 'Mexico',
            'NE': 'Niger',
            'CO': 'Colombia',
            'CK': 'Cook Islands',
            'KP': 'Korea, Democratic People\'s Republic of',
            'LA': 'Lao People\'s Democratic Republic',
            'KZ': 'Kazakhstan',
            'SH': 'Saint Helena, Ascension and Tristan da Cunha',
            'BF': 'Burkina Faso',
            'SV': 'El Salvador',
            'TJ': 'Tajikistan',
            'AI': 'Anguilla',
            'MY': 'Malaysia',
            'LR': 'Liberia',
            'WF': 'Wallis and Futuna',
            'TL': 'Timor-Leste',
            'SD': 'Sudan',
            'MC': 'Monaco',
            'ST': 'Sao Tome and Principe',
            'AO': 'Angola',
            'TV': 'Tuvalu',
            'PS': 'Palestine, State of',
            'GF': 'French Guiana',
            'GT': 'Guatemala',
            'IN': 'India',
            'BI': 'Burundi',
            'BE': 'Belgium',
            'VG': 'Virgin Islands, British',
            'AE': 'United Arab Emirates',
            'UA': 'Ukraine',
            'ES': 'Spain',
            'LT': 'Lithuania',
            'VA': 'Holy See',
            'FJ': 'Fiji',
            'AX': '�land Islands',
            'KW': 'Kuwait',
            'LY': 'Libya',
            'CW': 'Cura�ao',
            'TT': 'Trinidad and Tobago',
            'VE': 'Venezuela, Bolivarian Republic of',
            'YE': 'Yemen',
            'UZ': 'Uzbekistan',
            'IO': 'British Indian Ocean Territory',
            'LS': 'Lesotho',
            'ZM': 'Zambia',
            'LU': 'Luxembourg',
            'GY': 'Guyana',
            'PH': 'Philippines',
            'MM': 'Myanmar',
            'LK': 'Sri Lanka',
            'LB': 'Lebanon',
            'NR': 'Nauru',
            'MU': 'Mauritius',
            'KH': 'Cambodia',
            'AF': 'Afghanistan',
            'UY': 'Uruguay',
            'MK': 'Macedonia, the former Yugoslav Republic of',
            'LI': 'Liechtenstein',
            'SI': 'Slovenia',
            'PK': 'Pakistan',
            'IT': 'Italy',
            'NU': 'Niue',
            'NC': 'New Caledonia',
            'KG': 'Kyrgyzstan',
            'SX': 'Sint Maarten (Dutch part)',
            'GW': 'Guinea-Bissau',
            'HT': 'Haiti',
            'HM': 'Heard Island and McDonald Islands',
            'IL': 'Israel',
            'SS': 'South Sudan',
            'FR': 'France',
            'LV': 'Latvia',
            'AQ': 'Antarctica',
            'BB': 'Barbados',
            'CG': 'Congo',
            'JO': 'Jordan',
            'HK': 'Hong Kong',
            'EG': 'Egypt',
            'MT': 'Malta',
            'KI': 'Kiribati',
            'ER': 'Eritrea',
            'NG': 'Nigeria',
            'CA': 'Canada',
            'TH': 'Thailand',
            'NA': 'Namibia',
            'IR': 'Iran, Islamic Republic of',
            'AR': 'Argentina',
            'FM': 'Micronesia, Federated States of',
            'ML': 'Mali',
            'VI': 'Virgin Islands, U.S.',
            'WS': 'Samoa',
            'PF': 'French Polynesia',
            'GN': 'Guinea',
            'BZ': 'Belize',
            'DK': 'Denmark',
            'GA': 'Gabon',
            'FI': 'Finland',
            'CC': 'Cocos (Keeling) Islands',
            'QA': 'Qatar',
            'IE': 'Ireland',
            'CH': 'Switzerland',
            'KN': 'Saint Kitts and Nevis',
            'UG': 'Uganda',
            'MP': 'Northern Mariana Islands',
            'PR': 'Puerto Rico',
            'TO': 'Tonga',
            'SG': 'Singapore',
            'KR': 'Korea, Republic of',
            'FO': 'Faroe Islands',
            'TM': 'Turkmenistan',
            'DE': 'Germany',
            'KY': 'Cayman Islands',
            'SY': 'Syrian Arab Republic',
            'SL': 'Sierra Leone',
            'RE': 'R�union',
            'GB': 'United Kingdom of Great Britain and Northern Ireland',
            'AW': 'Aruba',
            'MF': 'Saint Martin (French part)',
            'CI': 'C�te d\'Ivoire',
            'NL': 'Netherlands',
            'MQ': 'Martinique',
            'US': 'United States',
            'HN': 'Honduras',
            'MH': 'Marshall Islands',
            'UM': 'United States Minor Outlying Islands',
            'KE': 'Kenya',
            'MW': 'Malawi',
            'LC': 'Saint Lucia',
            'NF': 'Norfolk Island',
            'AT': 'Austria',
            'BT': 'Bhutan',
            'TF': 'French Southern Territories',
            'TK': 'Tokelau',
            'PE': 'Peru',
            'BS': 'Bahamas',
            'BH': 'Bahrain',
            'SZ': 'Swaziland',
            'PW': 'Palau',
            'SE': 'Sweden',
            'BR': 'Brazil',
            'MN': 'Mongolia',
            'MD': 'Moldova, Republic of'
          },
          'doc': 'The addressCountry as per ISO 3166 (2 characters).',
          'description': 'The name of the country',
          'allowed': [
            'AD',
            'AE',
            'AF',
            'AG',
            'AI',
            'AL',
            'AM',
            'AO',
            'AQ',
            'AR',
            'AS',
            'AT',
            'AU',
            'AW',
            'AX',
            'AZ',
            'BA',
            'BB',
            'BD',
            'BE',
            'BF',
            'BG',
            'BH',
            'BI',
            'BJ',
            'BL',
            'BM',
            'BN',
            'BO',
            'BQ',
            'BR',
            'BS',
            'BT',
            'BV',
            'BW',
            'BY',
            'BZ',
            'CA',
            'CC',
            'CD',
            'CF',
            'CG',
            'CH',
            'CI',
            'CK',
            'CL',
            'CM',
            'CN',
            'CO',
            'CR',
            'CU',
            'CV',
            'CW',
            'CX',
            'CY',
            'CZ',
            'DE',
            'DJ',
            'DK',
            'DM',
            'DO',
            'DZ',
            'EC',
            'EE',
            'EG',
            'EH',
            'ER',
            'ES',
            'ET',
            'FI',
            'FJ',
            'FK',
            'FM',
            'FO',
            'FR',
            'GA',
            'GB',
            'GD',
            'GE',
            'GF',
            'GG',
            'GH',
            'GI',
            'GL',
            'GM',
            'GN',
            'GP',
            'GQ',
            'GR',
            'GS',
            'GT',
            'GU',
            'GW',
            'GY',
            'HK',
            'HM',
            'HN',
            'HR',
            'HT',
            'HU',
            'ID',
            'IE',
            'IL',
            'IM',
            'IN',
            'IO',
            'IQ',
            'IR',
            'IS',
            'IT',
            'JE',
            'JM',
            'JO',
            'JP',
            'KE',
            'KG',
            'KH',
            'KI',
            'KM',
            'KN',
            'KP',
            'KR',
            'KW',
            'KY',
            'KZ',
            'LA',
            'LB',
            'LC',
            'LI',
            'LK',
            'LR',
            'LS',
            'LT',
            'LU',
            'LV',
            'LY',
            'MA',
            'MC',
            'MD',
            'ME',
            'MF',
            'MG',
            'MH',
            'MK',
            'ML',
            'MM',
            'MN',
            'MO',
            'MP',
            'MQ',
            'MR',
            'MS',
            'MT',
            'MU',
            'MV',
            'MW',
            'MX',
            'MY',
            'MZ',
            'NA',
            'NC',
            'NE',
            'NF',
            'NG',
            'NI',
            'NL',
            'NO',
            'NP',
            'NR',
            'NU',
            'NZ',
            'OM',
            'PA',
            'PE',
            'PF',
            'PG',
            'PH',
            'PK',
            'PL',
            'PM',
            'PN',
            'PR',
            'PS',
            'PT',
            'PW',
            'PY',
            'QA',
            'RE',
            'RO',
            'RS',
            'RU',
            'RW',
            'SA',
            'SB',
            'SC',
            'SD',
            'SE',
            'SG',
            'SH',
            'SI',
            'SJ',
            'SK',
            'SL',
            'SM',
            'SN',
            'SO',
            'SR',
            'SS',
            'ST',
            'SV',
            'SX',
            'SY',
            'SZ',
            'TC',
            'TD',
            'TF',
            'TG',
            'TH',
            'TJ',
            'TK',
            'TL',
            'TM',
            'TN',
            'TO',
            'TR',
            'TT',
            'TV',
            'TW',
            'TZ',
            'UA',
            'UG',
            'UM',
            'US',
            'UY',
            'UZ',
            'VA',
            'VC',
            'VE',
            'VG',
            'VI',
            'VN',
            'VU',
            'WF',
            'WS',
            'YE',
            'YT',
            'ZA',
            'ZM',
            'ZW'
          ]
        },
        'addressLocality': {
          'type': 'string',
          'description': 'The locality. For example, Barcelona.'
        },
        'streetAddress': {
          'type': 'string',
          'description': 'The street address. For example, C/Jordi Girona, 1-3.'
        },
        'postalCode': {
          'type': 'string',
          'description': 'The postal code. For example, 94043.'
        }
      },
      'sink': -4
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'dict'
      },
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'materialized': true,
      'description': 'A list of events where the first one is the most recent.'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    }
  },
  'packages': {
    'depth': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Physical',
      'url': 'packages',
      'itemMethods': [
        'GET',
        'PATCH',
        'PUT',
        'DELETE'
      ],
      'fa': 'fa-archive',
      'resourceMethods': [
        'GET',
        'POST'
      ]
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Package'
      ],
      'teaser': false
    },
    'ancestors': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'places': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'IncomingLot',
              'OutgoingLot',
              'Lot',
              'Place',
              'Package'
            ]
          },
          'lots': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'lots'
              }
            },
            'unique_values': true
          },
          'packages': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'packages'
              }
            },
            'unique_values': true
          },
          'pallets': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'pallets'
              }
            },
            'unique_values': true
          },
          '_id': {
            'type': 'string',
            'doc': 'Although this is a data relation, we cannot specify it to eve as datasourcesare different. This is an ordered set of values where the first is the parent.'
          }
        }
      },
      'default': [],
      'materialized': true,
      'doc': 'The schema.schema of ancestors is populated with all subgroups. For example, Lot adds: ancestors.places and ancestors.lots. Which reads as follows:I inherit the following descendants form ancestor._id of type ancestor.@type:ancestor.places = [p1,p2...], ancestor.lots = [l1, l2...]'
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'sharedWith': {
      'type': 'list',
      'default': [],
      'doc': 'Explicitly means that an user performed shared with to this resource, in contraposition of inherit the permission.',
      'readonly': true,
      'description': 'A list of accounts that this group is explicitly shared with.'
    },
    'label': {
      'type': 'string',
      'editable': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'sink': 5
    },
    'children': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        }
      },
      'default': {}
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'dict'
      },
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'materialized': true,
      'description': 'A list of events where the first one is the most recent.'
    },
    'perms': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'perm': {
            'type': 'string',
            'required': true,
            'allowed': [
              'ad',
              're',
              'e',
              'r'
            ]
          },
          'account': {
            'type': 'objectid',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'accounts'
            },
            'required': true
          }
        }
      },
      'default': [],
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    }
  },
  'manufacturers': {
    '_settings': {
      'parent': 'Organization',
      'useDefaultDatabase': true,
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'url': 'manufacturers'
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Manufacturer'
      ],
      'teaser': false
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'objectid'
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'logo': {
      'type': 'url'
    }
  },
  'accounts': {
    '_settings': {
      'useDefaultDatabase': true,
      'parent': 'Thing',
      'url': 'accounts',
      'itemMethods': [
        'PATCH',
        'DELETE',
        'GET'
      ],
      'fa': 'fa-user-o',
      'resourceMethods': [
        'GET',
        'POST'
      ]
    },
    'shared': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string'
          },
          '_id': {
            'type': 'string'
          },
          '@type': {
            'type': 'string'
          },
          'baseUrl': {
            'type': 'url',
            'doc': 'The scheme, domain, any path to reach the DeviceHub.'
          },
          'db': {
            'type': 'string'
          }
        }
      },
      'default': [],
      'materialized': true,
      'description': 'The groups (eg: lots, packages...) other people shared to this account.'
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    '_id': {
      'type': 'objectid'
    },
    'organization': {
      'type': 'string',
      'description': 'The name of the organization the account is in. Organizations can be inside others.',
      'sink': 1
    },
    'blocked': {
      'dh_allowed_write_role': 'a',
      'type': 'boolean',
      'default': true,
      'description': 'As a manager, you need to specifically accept the user by unblocking it\'s account.',
      'sink': -2
    },
    'password': {
      'type': 'string',
      'minlength': 4,
      'doc': 'Users can only see their own passwords.',
      'sink': 4
    },
    'publicKey': {
      'type': 'string',
      'writeonly': true
    },
    'databases': {
      'sink': -4,
      'valueschema': {
        'type': 'string',
        'allowed': [
          'ac',
          'ad',
          'pa'
        ]
      },
      'dh_allowed_write_role': 'a',
      'type': 'dict',
      'required': true,
      'teaser': false
    },
    'defaultDatabase': {
      'dh_allowed_write_role': 'a',
      'type': 'string',
      'sink': -5,
      'teaser': false
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'role': {
      'dh_allowed_write_role': 'a',
      'type': 'string',
      'default': 'u',
      'allowed': [
        'm',
        'a',
        'u',
        'sm',
        'su'
      ],
      'doc': 'See the Roles section to get more info.'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Account'
      ],
      'teaser': false
    },
    'token': {
      'type': 'string',
      'readonly': true
    },
    'email': {
      'type': 'email',
      'required': true,
      'sink': 5,
      'unique': true
    },
    'isOrganization': {
      'type': 'boolean',
      'sink': 2
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'fingerprints': {
      'type': 'list',
      'readonly': true
    },
    'name': {
      'type': 'string',
      'description': 'The name of an account, if it is a person or an organization.',
      'sink': 3
    },
    'active': {
      'type': 'boolean',
      'default': true,
      'doc': 'Inactive accounts cannot login, and they are created through regular events.',
      'description': 'Activate the account so you can start using it.',
      'sink': -1
    }
  },
  'abstract': {
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    },
    '_settings': {
      'parent': 'Group',
      'useDefaultDatabase': false,
      'itemMethods': [
        'GET',
        'PATCH',
        'PUT',
        'DELETE'
      ],
      'resourceMethods': [
        'GET',
        'POST'
      ],
      'url': 'group/abstract'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'IncomingLot',
        'Abstract',
        'OutgoingLot',
        'Lot'
      ],
      'teaser': false
    },
    'ancestors': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'doc': 'Although this is a data relation, we cannot specify it to eve as datasourcesare different. This is an ordered set of values where the first is the parent.'
          },
          'places': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'IncomingLot',
              'OutgoingLot',
              'Lot',
              'Place',
              'Package'
            ]
          },
          'lots': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'lots'
              }
            },
            'unique_values': true
          }
        }
      },
      'default': [],
      'materialized': true,
      'doc': 'The schema.schema of ancestors is populated with all subgroups. For example, Lot adds: ancestors.places and ancestors.lots. Which reads as follows:I inherit the following descendants form ancestor._id of type ancestor.@type:ancestor.places = [p1,p2...], ancestor.lots = [l1, l2...]'
    },
    'date': {
      'type': 'datetime',
      'description': 'An agreed or official date of creation or transfer for this lot, most useful in Incoming/Outgoing lots.',
      'sink': -2
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'to': {
      'sink': 2,
      'schema': {
        'email': {
          'type': 'email',
          'required': true,
          'sink': 5,
          'unique': true
        },
        'isOrganization': {
          'type': 'boolean',
          'sink': 2
        },
        'organization': {
          'type': 'string',
          'description': 'The name of the organization the account is in. Organizations can be inside others.',
          'sink': 1
        },
        'name': {
          'type': 'string',
          'description': 'The name of an account, if it is a person or an organization.',
          'sink': 3
        }
      },
      'get_from_data_relation_or_create': 'email',
      'doc': 'The user the lot goes to It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
      'type': [
        'objectid',
        'dict',
        'string'
      ],
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      }
    },
    'toOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the allocation, the user worked in.',
      'materialized': true
    },
    'sharedWith': {
      'type': 'list',
      'default': [],
      'doc': 'Explicitly means that an user performed shared with to this resource, in contraposition of inherit the permission.',
      'readonly': true,
      'description': 'A list of accounts that this group is explicitly shared with.'
    },
    'label': {
      'type': 'string',
      'required': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'editable': true,
      'sink': 5
    },
    'children': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'lots': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'lots'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        },
        'pallets': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'pallets'
            }
          },
          'unique_values': true
        }
      },
      'default': {}
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'dict'
      },
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'materialized': true,
      'description': 'A list of events where the first one is the most recent.'
    },
    'perms': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'perm': {
            'type': 'string',
            'required': true,
            'allowed': [
              'ad',
              're',
              'e',
              'r'
            ]
          },
          'account': {
            'type': 'objectid',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'accounts'
            },
            'required': true
          }
        }
      },
      'default': [],
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'description': 'The permissions accounts have on the resource.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'fromOrganization': {
      'type': 'string',
      'readonly': true
    },
    'from': {
      'type': [
        'objectid',
        'dict',
        'string'
      ],
      'schema': {
        'email': {
          'type': 'email',
          'required': true,
          'sink': 5,
          'unique': true
        },
        'isOrganization': {
          'type': 'boolean',
          'sink': 2
        },
        'organization': {
          'type': 'string',
          'description': 'The name of the organization the account is in. Organizations can be inside others.',
          'sink': 1
        },
        'name': {
          'type': 'string',
          'description': 'The name of an account, if it is a person or an organization.',
          'sink': 3
        }
      },
      'get_from_data_relation_or_create': 'email',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'sink': 2
    },
    'policies': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Policies'
          ],
          'teaser': false
        },
        'notifyPolicy': {
          'type': 'dict',
          'schema': {
            'endReuseTime': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeReused': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeRecycled': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'receiver': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'deliveryNote': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'recycler': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'disposal': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'refurbisherLocation': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'socialImpact': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'refurbisherTipology': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'nonResponseOfReceiver': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'startReuseTime': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeRepaired': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'reseller': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            }
          }
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'authorizedResellers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedResellers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            }
          }
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Write here any custom policy or message you want other users to see.',
          'sink': -4
        },
        'finalDisposal': {
          'type': 'dict',
          'schema': {
            'returnToCircuit': {
              'type': 'boolean'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'FinalDisposal'
              ],
              'teaser': false
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'disposeToCollectionPoint': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'returnToReseller': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            }
          }
        },
        'dataDestruction': {
          'type': 'dict',
          'schema': {
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'DataDestruction'
              ],
              'teaser': false
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'endDate': {
              'type': 'datetime'
            },
            'startDate': {
              'type': 'datetime'
            },
            'mechanical': {
              'type': 'boolean'
            },
            'eraseSectors': {
              'type': 'boolean'
            },
            'eraseBasic': {
              'type': 'boolean'
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            }
          }
        },
        'authorizedReceivers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedReceivers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'digitalGapIndividual': {
              'type': 'boolean'
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'endDate': {
              'type': 'datetime'
            }
          }
        },
        'url': {
          'type': 'url',
          'move': 'sameAs',
          'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
          'teaser': false
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'authorizedRefubrishers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedRefurbishers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            }
          }
        },
        'sameAs': {
          'type': 'list',
          'teaser': false,
          'unique': true
        }
      }
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    }
  },
  'incoming-lot': {
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Lot',
      'url': 'lots/incoming-lot',
      'itemMethods': [
        'GET',
        'PATCH',
        'PUT',
        'DELETE'
      ],
      'fa': 'fa-folder',
      'resourceMethods': [
        'GET',
        'POST'
      ]
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'IncomingLot'
      ],
      'teaser': false
    },
    'ancestors': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'doc': 'Although this is a data relation, we cannot specify it to eve as datasourcesare different. This is an ordered set of values where the first is the parent.'
          },
          'places': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'places'
            }
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'IncomingLot',
              'OutgoingLot',
              'Lot',
              'Place',
              'Package'
            ]
          },
          'lots': {
            'type': 'list',
            'schema': {
              'type': 'string',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'lots'
              }
            },
            'unique_values': true
          }
        }
      },
      'default': [],
      'materialized': true,
      'doc': 'The schema.schema of ancestors is populated with all subgroups. For example, Lot adds: ancestors.places and ancestors.lots. Which reads as follows:I inherit the following descendants form ancestor._id of type ancestor.@type:ancestor.places = [p1,p2...], ancestor.lots = [l1, l2...]'
    },
    'date': {
      'type': 'datetime',
      'description': 'An agreed or official date of creation or transfer for this lot, most useful in Incoming/Outgoing lots.',
      'sink': -2
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'sharedWith': {
      'type': 'list',
      'default': [],
      'doc': 'Explicitly means that an user performed shared with to this resource, in contraposition of inherit the permission.',
      'readonly': true,
      'description': 'A list of accounts that this group is explicitly shared with.'
    },
    'label': {
      'type': 'string',
      'required': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'editable': true,
      'sink': 5
    },
    'children': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'devices': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'unique_values': true
        },
        'lots': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'lots'
            }
          },
          'unique_values': true
        },
        'packages': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'packages'
            }
          },
          'unique_values': true
        },
        'pallets': {
          'type': 'list',
          'schema': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'pallets'
            }
          },
          'unique_values': true
        }
      },
      'default': {}
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'dict'
      },
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'materialized': true,
      'description': 'A list of events where the first one is the most recent.'
    },
    'perms': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'perm': {
            'type': 'string',
            'required': true,
            'allowed': [
              'ad',
              're',
              'e',
              'r'
            ]
          },
          'account': {
            'type': 'objectid',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'accounts'
            },
            'required': true
          }
        }
      },
      'default': [],
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'fromOrganization': {
      'type': 'string',
      'readonly': true
    },
    'from': {
      'type': [
        'objectid',
        'dict',
        'string'
      ],
      'schema': {
        'email': {
          'type': 'email',
          'required': true,
          'sink': 5,
          'unique': true
        },
        'isOrganization': {
          'type': 'boolean',
          'sink': 2
        },
        'organization': {
          'type': 'string',
          'description': 'The name of the organization the account is in. Organizations can be inside others.',
          'sink': 1
        },
        'name': {
          'type': 'string',
          'description': 'The name of an account, if it is a person or an organization.',
          'sink': 3
        }
      },
      'get_from_data_relation_or_create': 'email',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'sink': 2
    },
    'policies': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Policies'
          ],
          'teaser': false
        },
        'notifyPolicy': {
          'type': 'dict',
          'schema': {
            'endReuseTime': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeReused': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeRecycled': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'receiver': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'deliveryNote': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'recycler': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'disposal': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'refurbisherLocation': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'socialImpact': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'refurbisherTipology': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'nonResponseOfReceiver': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'startReuseTime': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'devicesSetToBeRepaired': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser',
                    'NotifyPolicy'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            },
            'reseller': {
              'type': 'dict',
              'schema': {
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'NotifyPolicyWithUser'
                  ],
                  'teaser': false
                },
                'sameAs': {
                  'type': 'list',
                  'unique': true,
                  'teaser': false
                },
                'url': {
                  'type': 'url',
                  'move': 'sameAs',
                  'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                  'teaser': false
                },
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                'startDate': {
                  'type': 'datetime'
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'endDate': {
                  'type': 'datetime'
                },
                'to': {
                  'sink': 2,
                  'schema': {
                    'email': {
                      'type': 'email',
                      'required': true,
                      'sink': 5,
                      'unique': true
                    },
                    'isOrganization': {
                      'type': 'boolean',
                      'sink': 2
                    },
                    'organization': {
                      'type': 'string',
                      'description': 'The name of the organization the account is in. Organizations can be inside others.',
                      'sink': 1
                    },
                    'name': {
                      'type': 'string',
                      'description': 'The name of an account, if it is a person or an organization.',
                      'sink': 3
                    }
                  },
                  'get_from_data_relation_or_create': 'email',
                  'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
                  'type': [
                    'objectid',
                    'dict',
                    'string'
                  ],
                  'data_relation': {
                    'embeddable': true,
                    'field': '_id',
                    'resource': 'accounts'
                  },
                  'required': true
                },
                'description': {
                  'maxlength': 500,
                  'type': 'string',
                  'description': 'Full long description.',
                  'sink': -4
                }
              }
            }
          }
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'authorizedResellers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedResellers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            }
          }
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Write here any custom policy or message you want other users to see.',
          'sink': -4
        },
        'finalDisposal': {
          'type': 'dict',
          'schema': {
            'returnToCircuit': {
              'type': 'boolean'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'FinalDisposal'
              ],
              'teaser': false
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'disposeToCollectionPoint': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'returnToReseller': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            }
          }
        },
        'dataDestruction': {
          'type': 'dict',
          'schema': {
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'DataDestruction'
              ],
              'teaser': false
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'endDate': {
              'type': 'datetime'
            },
            'startDate': {
              'type': 'datetime'
            },
            'mechanical': {
              'type': 'boolean'
            },
            'eraseSectors': {
              'type': 'boolean'
            },
            'eraseBasic': {
              'type': 'boolean'
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            }
          }
        },
        'authorizedReceivers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedReceivers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'digitalGapIndividual': {
              'type': 'boolean'
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'endDate': {
              'type': 'datetime'
            }
          }
        },
        'url': {
          'type': 'url',
          'move': 'sameAs',
          'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
          'teaser': false
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'authorizedRefubrishers': {
          'type': 'dict',
          'schema': {
            'to': {
              'sink': 2,
              'schema': {
                'email': {
                  'type': 'email',
                  'required': true,
                  'sink': 5,
                  'unique': true
                },
                'isOrganization': {
                  'type': 'boolean',
                  'sink': 2
                },
                'organization': {
                  'type': 'string',
                  'description': 'The name of the organization the account is in. Organizations can be inside others.',
                  'sink': 1
                },
                'name': {
                  'type': 'string',
                  'description': 'The name of an account, if it is a person or an organization.',
                  'sink': 3
                }
              },
              'get_from_data_relation_or_create': 'email',
              'doc': 'A specific user where the devices have to go toIt can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
              'type': [
                'objectid',
                'dict',
                'string'
              ],
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              },
              'required': true
            },
            'nonForProfit': {
              'type': 'boolean'
            },
            'url': {
              'type': 'url',
              'move': 'sameAs',
              'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
              'teaser': false
            },
            'label': {
              'type': 'string',
              'description': 'A short, descriptive title',
              'sink': 5
            },
            'cooperative': {
              'type': 'boolean'
            },
            'startDate': {
              'type': 'datetime'
            },
            'created': {
              'dh_allowed_write_role': 'su',
              'type': 'datetime',
              'writeonly': true,
              'doc': 'Sets the _created and _updated, thought to be used in imports.'
            },
            'endDate': {
              'type': 'datetime'
            },
            '@type': {
              'type': 'string',
              'required': true,
              'allowed': [
                'AuthorizedRefurbishers'
              ],
              'teaser': false
            },
            'description': {
              'maxlength': 500,
              'type': 'string',
              'description': 'Full long description.',
              'sink': -4
            },
            'sameAs': {
              'type': 'list',
              'unique': true,
              'teaser': false
            }
          }
        },
        'sameAs': {
          'type': 'list',
          'teaser': false,
          'unique': true
        }
      }
    }
  },
}