module.exports = {
  'physical': {
    'depth': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
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
      'url': 'group/physical'
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
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'allowed': [
        'Warehouse',
        'CollectionPoint',
        'Zone',
        'Department'
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
    '_id': {
      'type': 'string',
      'short': 'ID',
      'teaser': true,
      'readonly': true,
      'sink': 4
    },
    'telephone': {
      'type': 'string'
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'required': true,
      'description': 'The name or title. Write it to easily search and identify this.',
      'editable': true,
      'sink': 5
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
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Physical',
        'Package',
        'Pallet',
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'readonly': true
    },
    'geo': {
      'type': 'polygon',
      'modifiable': false,
      'description': 'Set the area of the place. Be careful! Once set, you cannot update the area.',
      'sink': -5
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
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    }
  },
  'graphic-card': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/graphic-card',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'memory': {
      'type': 'float',
      'unitCode': '4L',
      'min': 1,
      'sink': 3
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'GraphicCard'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'computer': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Device',
      'url': 'devices/computer',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'totalHardDriveSize': {
      'sink': 1,
      'materialized': true,
      'short': 'HDD',
      'type': 'float',
      'unitCode': '4L',
      'default': 0,
      'description': 'The total amount of hard-drive capacity the computer has.'
    },
    'type': {
      'type': 'string',
      'allowed': [
        'Laptop',
        'Desktop',
        'Server',
        'Microtower',
        'Netbook'
      ]
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Computer'
      ],
      'teaser': false
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
    },
    'forceCreation': {
      'type': 'boolean',
      'default': false
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'processorModel': {
      'type': 'string',
      'sink': 1,
      'materialized': true,
      'description': 'The model of the processor.',
      'short': 'CPU'
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'totalRamSize': {
      'sink': 1,
      'materialized': true,
      'doc': 'It is updated after a Register, Add o Remove',
      'short': 'RAM',
      'type': 'float',
      'unitCode': 'E34',
      'default': 0,
      'description': 'The total amount of RAM memory the computer has.'
    }
  },
  'optical-drive': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/optical-drive',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'OpticalDrive'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'mobile': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Device',
      'url': 'devices/mobile',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Mod.'
    },
    'imei': {
      'type': 'string',
      'unique': true
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Smartphone',
        'Tablet'
      ]
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'S/N'
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Mobile'
      ],
      'teaser': false
    },
    'manufacturer': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Man.'
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
    'meid': {
      'type': 'string',
      'unique': true
    },
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
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
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    }
  },
  /*
   * EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS EVENTS
   */
  'devices_reserve': {
    '_settings': {
      'sink': -5,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/reserve',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-book',
      'shortDescription': 'Notifies to the owners of the devices that you (or someone you are on behalf of) are willing to get or buy the devices.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '_id': {
      'type': 'objectid'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Reserve'
      ],
      'teaser': false
    },
    'sell': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'materialized': true,
      'description': 'A Sell event that has completed this reservation.'
    },
    'for': {
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
      'doc': 'This field is auto-fulfilled with "byUser" value if the user is the owner of the DB, otherwise it isrequired to be fulfilled.',
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
      'description': 'Who are you reserving for? If you leave it blank, you will reserve it for yourself.'
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'cancel': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'materialized': true,
      'description': 'A CancelReservation event has cancelled this reservation.'
    },
    'notify': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'description': 'Accounts that have been notified for this reservation.'
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'deadline': {
      'type': 'datetime'
    }
  },
  'devices_erase-basic': {
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'events/devices/erase-basic',
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-eraser',
      'shortDescription': 'Fast erasure of the HardDrive'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'device': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
    'cleanWithZeros': {
      'type': 'boolean'
    },
    'success': {
      'type': 'boolean'
    },
    'startingTime': {
      'type': 'datetime'
    },
    '_id': {
      'type': 'objectid'
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'materialized': true,
      'description': 'The event triggered in this computer.'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'steps': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean',
            'required': true
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'Zeros',
              'Random'
            ]
          },
          'secureRandomSteps': {
            'type': 'boolean'
          },
          'cleanWithZeros': {
            'type': 'boolean'
          },
          'startingTime': {
            'type': 'datetime'
          },
          'endingTime': {
            'type': 'datetime'
          }
        }
      }
    },
    'endingTime': {
      'type': 'datetime'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:EraseBasic',
        'devices:EraseSectors'
      ],
      'teaser': false
    },
    'secureRandomSteps': {
      'type': 'natural',
      'required': true
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    }
  },
  'devices_migrate': {
    '_settings': {
      'sink': -6,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/migrate',
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-share-alt',
      'shortDescription': 'Changes the DeviceHub that contains (i.e. holds) the device.'
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
        'devices:Migrate'
      ],
      'teaser': false
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '_id': {
      'type': 'objectid'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
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
      'materialized': true,
      'doc': 'The result of the materialized components'
    },
    'to': {
      'or': [
        'from'
      ],
      'excludes': 'from',
      'schema': {
        'database': {
          'type': 'string',
          'required': true,
          'doc': 'The name of the database as in the URL'
        },
        'baseUrl': {
          'type': 'url',
          'required': true,
          'doc': 'The scheme, domain, any path to reach the DeviceHub. With trailing slash.'
        },
        'url': {
          'type': 'url',
          'readonly': true,
          'doc': 'The URL of the Migrate in the other database.'
        }
      },
      'type': 'dict'
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'unsecured': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'type': {
            'type': 'string',
            'allowed': [
              'model',
              'pid'
            ]
          },
          '@type': {
            'type': 'string'
          }
        }
      },
      'default': [],
      'readonly': true
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'returnedSameAs': {
      'excludes': 'to',
      'valueschema': {
        'type': 'list',
        'valueschema': [
          'type',
          'url'
        ]
      },
      'writeonly': true,
      'doc': 'A mapping of {deviceUrlInAgent1: sameAsValuesAgent2Sent, ...} representing the sameAs urls that are sent back to the agent that started the Migrate. Those values need to be sent, and keeping them helps in future debug sessions.',
      'type': 'dict',
      'propertyschema': {
        'type': 'url'
      },
      'readonly': true
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'devices': {
      'type': 'list',
      'schema': {
        'type': [
          'string',
          'dict'
        ],
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'devices'
        }
      },
      'required': true,
      'doc': 'A list of device identifiers. When one DeviceHub sends a Migrate to the other, devices are full devices with their components.'
    },
    'from': {
      'dh_allowed_write_role': 'm',
      'excludes': 'to',
      'doc': 'This value is only filled by other DeviceHub when transmitting the Migrate',
      'type': 'url'
    }
  },
  'devices_erase-sectors': {
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EraseBasic',
      'url': 'events/devices/erase-sectors',
      'itemMethods': [
        'GET'
      ],
      'fa': 'fa-eraser',
      'resourceMethods': [
        'POST'
      ]
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'device': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
    'cleanWithZeros': {
      'type': 'boolean'
    },
    'success': {
      'type': 'boolean'
    },
    'startingTime': {
      'type': 'datetime'
    },
    '_id': {
      'type': 'objectid'
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'materialized': true,
      'description': 'The event triggered in this computer.'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'steps': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean',
            'required': true
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'Zeros',
              'Random'
            ]
          },
          'secureRandomSteps': {
            'type': 'boolean'
          },
          'cleanWithZeros': {
            'type': 'boolean'
          },
          'startingTime': {
            'type': 'datetime'
          },
          'endingTime': {
            'type': 'datetime'
          }
        }
      }
    },
    'endingTime': {
      'type': 'datetime'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:EraseSectors'
      ],
      'teaser': false
    },
    'secureRandomSteps': {
      'type': 'natural',
      'required': true
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    }
  },
  'devices_free': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': -4,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/free',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-shopping-cart',
      'shortDescription': 'The devices are available to be received for someone (sold, donated)'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Free'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_test-hard-drive': {
    'snapshot': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      }
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'events/devices/test-hard-drive',
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-flask',
      'shortDescription': 'A test of the health of the hard drive'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'lifetime': {
      'type': 'integer'
    },
    'device': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'type': {
      'type': 'string'
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'reportedUncorrectableErrors': {
      'type': 'integer'
    },
    'assessment': {
      'type': 'boolean'
    },
    'error': {
      'type': 'boolean',
      'required': true
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
        'devices:TestHardDrive'
      ],
      'teaser': false
    },
    'status': {
      'type': 'string',
      'required': true
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
    'RemainingLifetimePercentage': {
      'type': 'integer'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'OfflineUncorrectable': {
      'type': 'integer'
    },
    'powerCycleCount': {
      'type': 'integer'
    },
    'CommandTimeout': {
      'type': 'integer'
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'materialized': true,
      'description': 'The event triggered in this computer.'
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'reallocatedSectorCount': {
      'type': 'integer'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'firstError': {
      'nullable': true,
      'type': 'integer'
    },
    'passedLifetime': {
      'type': 'integer'
    },
    'CurrentPendingSectorCount': {
      'type': 'integer'
    }
  },
  'devices_register': {
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'events/devices/register',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-plus',
      'shortDescription': 'The creation of a new device in the system.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'device': {
      'type': [
        'dict',
        'string'
      ],
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
    'force': {
      'type': [
        'boolean'
      ]
    },
    '_id': {
      'type': 'objectid'
    },
    'deviceIsNew': {
      'type': 'boolean',
      'default': false,
      'doc': 'Note that prior may 2017 this value is None for everyone.'
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'components': {
      'type': [
        'list',
        'string'
      ],
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Register'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'doc': 'Please, discover first its parent before registering a component.',
      'placeholder_disallowed': true
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'place': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'places'
      },
      'description': 'Where did it happened',
      'sink': 0
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
    }
  },
  'devices_repair': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': -1,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/repair',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-chain-broken',
      'shortDescription': 'The devices have been succesfully repaired'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Repair'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_ready': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': -2,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/ready',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-check',
      'shortDescription': 'The devices work correctly, so they are ready to be used, sold, donated...'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Ready'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_receive': {
    '_settings': {
      'sink': -7,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/receive',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-cart-arrow-down',
      'shortDescription': 'Someone receives the devices: you, a transporter, the client...'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'CollectionPoint',
        'FinalUser',
        'RecyclingPoint'
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
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '_id': {
      'type': 'objectid'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    'acceptedConditions': {
      'type': 'boolean',
      'required': true,
      'allowed': [
        true
      ]
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Receive'
      ],
      'teaser': false
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'receiverOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the receive, the user worked in.',
      'materialized': true
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'receiver': {
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
      'doc': 'The user that receives it. It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
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
    'place': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'places'
      },
      'description': 'Where did it happened',
      'sink': 0
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'automaticallyAllocate': {
      'type': 'boolean',
      'default': false,
      'description': 'Allocates to the user'
    }
  },
  'devices_remove': {
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
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'events/devices/remove',
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-minus-square-o',
      'shortDescription': 'Components have been removed from a device'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Remove'
      ],
      'teaser': false
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'device': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'placeholder_disallowed': true
    }
  },
  'devices_add': {
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
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'events/devices/add',
      'itemMethods': [
        'GET'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-plus-square-o',
      'shortDescription': 'Components have been added to a device'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Add'
      ],
      'teaser': false
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'device': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'placeholder_disallowed': true
    }
  },
  'devices_locate': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': -3,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/locate',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-map-marker',
      'shortDescription': 'The devices have been placed.'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Locate'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'place': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'places'
      },
      'description': 'Where did it happened',
      'sink': 0
    },
    'geo': {
      'or': [
        'place'
      ],
      'type': 'point',
      'excludes': 'place',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_sell': {
    '_settings': {
      'sink': -5,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/sell',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-money',
      'shortDescription': 'A successful selling.'
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'invoices': {
      'type': 'list',
      'schema': {
        'type': 'media',
        'accept': 'application/pdf'
      },
      'description': 'Upload invoices in PDF. You can select multiple by pressing Ctrl or Cmd.You won\'t be able to modify them later and we will save them with the name they have.'
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
        'devices:Sell'
      ],
      'teaser': false
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '_id': {
      'type': 'objectid'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    'shippingDate': {
      'type': 'datetime',
      'description': 'When are the devices going to be ready for shipping?'
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
      'description': 'The user buying. If you leave it empty and you reference below a reference, we will set it to the user of the reference.'
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'reserve': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'description': 'The reserve this sell confirms.',
      'unique': true
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'invoiceNumber': {
      'type': 'string',
      'description': 'The id of your invoice so they can be linked.'
    }
  },
  'devices_to-prepare': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': 1,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/to-prepare',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-wrench',
      'shortDescription': 'The devices need some maintenance, some kind of testing or preparation to be ready'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:ToPrepare'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_deallocate': {
    '_settings': {
      'sink': -6,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/deallocate',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-hand-o-left',
      'shortDescription': 'The opposite of Allocate. Remove the ownership of the devices from someone'
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
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
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Deallocate'
      ],
      'teaser': false
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'fromOrganization': {
      'type': 'string',
      'readonly': true
    },
    'from': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'sink': 2
    }
  },
  'devices_to-dispose': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': -8,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/to-dispose',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-trash-o',
      'shortDescription': 'The devices need to be taken for disposal.'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:ToDispose'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_dispose': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': -9,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/dispose',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-trash-o',
      'shortDescription': 'The devices have been successfully taken for disposal.'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Dispose'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'devices_snapshot': {
    'date': {
      'type': 'datetime'
    },
    'debug': {
      'type': 'dict',
      'teaser': false
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'color': {
      'type': 'string',
      'allowed_description': {
        '#00FF00': 'lime',
        '#808000': 'olive',
        '#FFFFFF': 'white',
        '#C0C0C0': 'silver',
        '#0000FF': 'blue',
        '#800000': 'maroon',
        '#008080': 'teal',
        '#800080': 'purple',
        '#008000': 'green',
        '#808080': 'gray',
        '#000080': 'navy',
        '#FF00FF': 'fuchsia',
        '#FF0000': 'red',
        '#FFFF00': 'yellow',
        '#000000': 'black',
        '#00FFFF': 'aqua'
      },
      'description': 'The primary color of the device.'
    },
    'version': {
      'type': 'version',
      'teaser': false
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true,
      'description': 'The events triggered by the Snapshot.'
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'inventory': {
      'type': 'dict',
      'schema': {
        'elapsed': {
          'type': 'time'
        }
      }
    },
    'place': {
      'label': 'Place where the devices are saved',
      'type': 'string',
      'data_relation': {
        'resource': 'places',
        'field': '_id',
        'embeddable': true
      },
      'description': 'Place the devices to an existing location.',
      'sink': 0
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkRamSysbench'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'score': {
            'type': 'float'
          }
        }
      }
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'snapshotSoftware': {
      'type': 'string',
      'default': 'Workbench',
      'allowed': [
        'AndroidApp',
        'WorkbenchAuto',
        'Photobox',
        'Web',
        'DesktopApp',
        'Workbench'
      ]
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'doc': 'This is not the same as the materialized "parent" field. This field can be set when snapshotting a component, for example through Scan, that should be included in a device.'
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'device': {
      'type': 'dict',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'required': true,
      'sink': 4
    },
    'automatic': {
      'type': 'boolean'
    },
    'software': {
      'type': 'dict',
      'schema': {
        'productKey': {
          'type': 'string'
        }
      },
      'sink': -1
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'condition': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'teaser': true,
      'sink': 1
    },
    'licenseKey': {
      'type': 'string'
    },
    'tests': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean'
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'StressTest'
            ]
          },
          'elapsed': {
            'type': 'time'
          }
        }
      }
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'tags',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-camera',
      'shortDescription': 'A fast picture of the state and key information of the computer and it\'s devices.'
    },
    'osInstallation': {
      'type': 'dict',
      'schema': {
        'label': {
          'type': 'string'
        },
        'success': {
          'type': 'boolean'
        },
        'elapsed': {
          'type': 'time'
        }
      }
    },
    'autoUploaded': {
      'type': 'boolean',
      'default': false
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
    'group': {
      'type': 'dict',
      'schema': {
        '_id': {
          'type': 'string',
          'required': true
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Pallet',
            'Group',
            'IncomingLot',
            'OutgoingLot',
            'Place',
            'Physical',
            'Abstract',
            'Lot',
            'Package'
          ]
        }
      },
      'doc': 'After performing the snapshot, adds the device to the group if it was not there already.',
      'description': 'Automatically add the device to the group, if any.'
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'sink': 1
    },
    '_id': {
      'type': 'objectid'
    },
    'offline': {
      'type': 'boolean'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    '_uuid': {
      'type': 'uuid',
      'teaser': false,
      'modifiable': false,
      'unique': true
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'address': {
            'type': 'integer',
            'unitCode': 'A99',
            'allowed': [
              32,
              256,
              64,
              128,
              8,
              16
            ],
            'sink': -1
          },
          'weight': {
            'type': 'float',
            'unitCode': 'KGM',
            'teaser': false,
            'sink': -1
          },
          'type': {
            'type': 'string',
            'teaser': true,
            'required': false,
            'allowed': [
              'HDD',
              'SSD'
            ],
            'sink': 2
          },
          'serialNumber': {
            'type': 'string',
            'short': 'S/N',
            'sink': 4
          },
          'pid': {
            'sink': 5,
            'externalSynthetic': true,
            'short': 'PID',
            'type': 'string',
            'uid': true,
            'description': 'The PID identifies a device under a circuit or platform.',
            'unique': true
          },
          'events': {
            'schema': {
              'type': 'dict'
            },
            'materialized': true,
            'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
            'type': 'list',
            'default': [],
            'description': 'A list of events where the first one is the most recent.'
          },
          'isUidSecured': {
            'type': 'boolean',
            'default': true,
            'teaser': false
          },
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          'benchmarks': {
            'type': 'list',
            'schema': {
              'type': 'dict',
              'schema': {
                'label': {
                  'type': 'string',
                  'description': 'A short, descriptive title',
                  'sink': 5
                },
                '@type': {
                  'type': 'string',
                  'required': true,
                  'allowed': [
                    'BenchmarkProcessorSysbench',
                    'BenchmarkProcessor'
                  ],
                  'teaser': false
                },
                'created': {
                  'dh_allowed_write_role': 'su',
                  'type': 'datetime',
                  'writeonly': true,
                  'doc': 'Sets the _created and _updated, thought to be used in imports.'
                },
                'score': {
                  'type': 'float'
                }
              }
            }
          },
          'maxAcceptedMemory': {
            'type': 'integer',
            'teaser': false
          },
          'parent': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'numberOfCores': {
            'type': 'integer',
            'min': 1,
            'sink': 1
          },
          'manufacturer': {
            'type': 'string',
            'short': 'Man.',
            'sink': 4
          },
          'speed': {
            'type': 'number',
            'unitCode': 'MHZ',
            'min': 0.1,
            'sink': -1
          },
          'blockSize': {
            'type': 'integer',
            'teaser': false,
            'sink': -1
          },
          'condition': {
            'sink': 1,
            'schema': {
              'components': {
                'type': 'dict',
                'schema': {
                  'ram': {
                    'type': 'number',
                    'min': 0,
                    'max': 10
                  },
                  'hardDrives': {
                    'type': 'number',
                    'min': 0,
                    'max': 10
                  },
                  'processors': {
                    'type': 'number',
                    'min': 0,
                    'max': 10
                  }
                }
              },
              'appearance': {
                'type': 'dict',
                'schema': {
                  'score': {
                    'type': 'number',
                    'min': -3,
                    'max': 10
                  },
                  'general': {
                    'type': 'string',
                    'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
                    'allowed': [
                      '0',
                      'A',
                      'B',
                      'C',
                      'D',
                      'E'
                    ],
                    'allowed_description': {
                      '0': '0. The device is new',
                      'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                      'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                      'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                      'A': 'A. Is like new (without visual damage)',
                      'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
                    }
                  }
                }
              },
              'labelling': {
                'type': 'boolean',
                'description': 'Sets if there are labels stuck that should be removed.'
              },
              'functionality': {
                'type': 'dict',
                'schema': {
                  'score': {
                    'type': 'number',
                    'min': -3,
                    'max': 10
                  },
                  'general': {
                    'type': 'string',
                    'description': 'Grades the defects of a device that affect its usage.',
                    'allowed': [
                      'A',
                      'B',
                      'C',
                      'D'
                    ],
                    'allowed_description': {
                      'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                      'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                      'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                      'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
                    }
                  }
                }
              },
              '_created': {
                'type': 'datetime',
                'readonly': true
              },
              'scoringSoftware': {
                'type': 'dict',
                'schema': {
                  'label': {
                    'type': 'string'
                  },
                  'version': {
                    'type': 'version'
                  }
                }
              },
              'bios': {
                'type': 'dict',
                'schema': {
                  'general': {
                    'type': 'string',
                    'description': 'How difficult it has been to set the bios to boot from the network.',
                    'allowed': [
                      'A',
                      'B',
                      'C',
                      'D',
                      'E'
                    ],
                    'allowed_description': {
                      'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                      'C': 'C. Like B, but with more than 5 steps',
                      'E': 'E. The device could not be booted through the network.',
                      'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                      'A': 'A. If by pressing a key you could access a boot menu with the network boot'
                    }
                  }
                }
              },
              'general': {
                'type': 'dict',
                'schema': {
                  'score': {
                    'type': 'number',
                    'min': 0,
                    'max': 10
                  },
                  'range': {
                    'type': 'string',
                    'doc': 'allowed is ordered by range ascending.',
                    'allowed': [
                      'VeryLow',
                      'Low',
                      'Medium',
                      'High'
                    ],
                    'description': 'An easier way to see the grade.'
                  }
                }
              }
            },
            'materialized': true,
            'doc': 'Materialized condition from the last snapshot.',
            'type': 'dict',
            'teaser': true
          },
          'labelId': {
            'type': 'string',
            'short': 'Label',
            'sink': 5
          },
          'connectors': {
            'type': 'dict',
            'schema': {
              'usb': {
                'type': 'natural'
              },
              'firewire': {
                'type': 'natural'
              },
              'pcmcia': {
                'type': 'natural'
              },
              'serial': {
                'type': 'natural'
              }
            }
          },
          'erasure': {
            'type': 'dict',
            'schema': {
              'date': {
                'type': 'datetime',
                'description': 'When this happened. Leave blank if it is happening now.',
                'sink': -2
              },
              'device': {
                'type': 'string',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'devices'
                },
                'required': false
              },
              'byOrganization': {
                'type': 'string',
                'readonly': true
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
              'success': {
                'type': 'boolean'
              },
              'startingTime': {
                'type': 'datetime'
              },
              'cleanWithZeros': {
                'type': 'boolean'
              },
              'parent': {
                'type': 'string',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'devices'
                },
                'materialized': true,
                'description': 'The event triggered in this computer.'
              },
              'byUser': {
                'type': 'objectid',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'accounts'
                },
                'coerce_with_context': '<callable>',
                'sink': 2
              },
              'label': {
                'type': 'string',
                'description': 'A short, descriptive title',
                'sink': 5
              },
              'endingTime': {
                'type': 'datetime'
              },
              'steps': {
                'type': 'list',
                'schema': {
                  'type': 'dict',
                  'schema': {
                    'success': {
                      'type': 'boolean',
                      'required': true
                    },
                    '@type': {
                      'type': 'string',
                      'required': true,
                      'allowed': [
                        'Zeros',
                        'Random'
                      ]
                    },
                    'secureRandomSteps': {
                      'type': 'boolean'
                    },
                    'cleanWithZeros': {
                      'type': 'boolean'
                    },
                    'startingTime': {
                      'type': 'datetime'
                    },
                    'endingTime': {
                      'type': 'datetime'
                    }
                  }
                }
              },
              '@type': {
                'type': 'string',
                'required': true,
                'allowed': [
                  'devices:EraseBasic',
                  'devices:EraseSectors'
                ],
                'teaser': false
              },
              'secureRandomSteps': {
                'type': 'natural',
                'required': true
              },
              'secured': {
                'type': 'boolean',
                'sink': -3
              },
              'incidence': {
                'type': 'boolean',
                'description': 'Check if something went wrong, you can add details in a comment',
                'sink': -3
              },
              'comment': {
                'type': 'string',
                'description': 'Short comment for fast and easy reading',
                'doc': 'This field is deprecated (it does not show in clients); use description instead.',
                'sink': -4
              },
              'geo': {
                'type': 'point',
                'description': 'Where did it happened',
                'sink': -5
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
                'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
                'materialized': true,
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
              }
            },
            'writeonly': true
          },
          'totalSlots': {
            'type': 'integer',
            'teaser': false
          },
          'tests': {
            'type': 'list',
            'schema': {
              'type': 'objectid',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'events'
              }
            },
            'readonly': true
          },
          'productId': {
            'type': 'string',
            'teaser': false,
            'sink': 3
          },
          'sectors': {
            'type': 'integer',
            'teaser': false,
            'sink': -1
          },
          'usedSlots': {
            'type': 'integer',
            'teaser': false
          },
          'model': {
            'type': 'string',
            'short': 'Mod.',
            'sink': 4
          },
          'memory': {
            'type': 'float',
            'unitCode': '4L',
            'min': 1,
            'sink': 3
          },
          'height': {
            'type': 'float',
            'unitCode': 'MTR',
            'teaser': false,
            'sink': -1
          },
          'erasures': {
            'type': 'list',
            'schema': {
              'type': 'objectid',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'events'
              }
            },
            'readonly': true
          },
          'placeholder': {
            'type': 'boolean',
            'default': false,
            'doc': 'Invalid for components.'
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
          'benchmark': {
            'type': 'dict',
            'schema': {
              '@type': {
                'type': 'string',
                'required': true,
                'allowed': [
                  'BenchmarkHardDrive',
                  'BenchmarkProcessor'
                ],
                'teaser': false
              },
              'readingSpeed': {
                'type': 'float',
                'unitCode': '4L'
              },
              'label': {
                'type': 'string',
                'description': 'A short, descriptive title',
                'sink': 5
              },
              'score': {
                'type': 'float'
              },
              'created': {
                'dh_allowed_write_role': 'su',
                'type': 'datetime',
                'writeonly': true,
                'doc': 'Sets the _created and _updated, thought to be used in imports.'
              },
              'writingSpeed': {
                'type': 'float',
                'unitCode': '4L'
              }
            },
            'writeonly': true
          },
          'public': {
            'type': 'boolean',
            'default': false
          },
          'interface': {
            'type': 'string',
            'teaser': false,
            'sink': -1
          },
          'width': {
            'type': 'float',
            'unitCode': 'MTR',
            'teaser': false,
            'sink': -1
          },
          '_id': {
            'sink': 4,
            'short': 'ID',
            'device_id': true,
            'type': 'string',
            'uid': true,
            'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
            'unique': true
          },
          'size': {
            'type': 'number',
            'unitCode': '4L',
            'min': 1,
            'sink': 1
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
            'default': [],
            'sink': 1
          },
          'hid': {
            'sink': 5,
            'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
            'short': 'HID',
            'type': 'hid',
            'uid': true,
            'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
            'teaser': false
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'NetworkAdapter',
              'Processor',
              'SoundCard',
              'Motherboard',
              'GraphicCard',
              'OpticalDrive',
              'RamModule',
              'Component',
              'HardDrive'
            ],
            'teaser': false
          },
          'sameAs': {
            'type': 'list',
            'unique': true,
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
          'rid': {
            'externalSynthetic': true,
            'short': 'RID',
            'type': 'string',
            'unique': true,
            'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
            'uid': true
          },
          'firmwareRevision': {
            'type': 'string',
            'sink': -1,
            'teaser': false
          },
          'perms': {
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
            'materialized': true,
            'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
            'type': 'list',
            'default': [],
            'description': 'The permissions accounts have on the resource.'
          },
          'owners': {
            'type': 'list',
            'schema': {
              'type': 'objectid',
              'data_relation': {
                'embeddable': true,
                'field': '_id',
                'resource': 'accounts'
              }
            },
            'materialized': true,
            'sink': 2
          },
          'url': {
            'type': 'url',
            'move': 'sameAs',
            'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
            'teaser': false
          },
          'gid': {
            'externalSynthetic': true,
            'unique': true,
            'short': 'GID',
            'type': 'string',
            'uid': true,
            'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
            'teaser': true
          },
          'pricing': {
            'type': 'dict',
            'schema': {
              'total': {
                'type': 'dict',
                'schema': {
                  'standard': {
                    'type': 'number',
                    'min': 0,
                    'max': 10000
                  },
                  'warranty2': {
                    'type': 'number',
                    'min': 0,
                    'max': 10000
                  }
                }
              },
              'platform': {
                'type': 'dict',
                'schema': {
                  'standard': {
                    'type': 'dict',
                    'schema': {
                      'percentage': {
                        'type': 'number',
                        'min': 0,
                        'max': 1
                      },
                      'amount': {
                        'type': 'number',
                        'min': 0,
                        'max': 10000
                      }
                    }
                  },
                  'warranty2': {
                    'type': 'dict',
                    'schema': {
                      'percentage': {
                        'type': 'number',
                        'min': 0,
                        'max': 1
                      },
                      'amount': {
                        'type': 'number',
                        'min': 0,
                        'max': 10000
                      }
                    }
                  }
                }
              },
              'retailer': {
                'type': 'dict',
                'schema': {
                  'standard': {
                    'type': 'dict',
                    'schema': {
                      'percentage': {
                        'type': 'number',
                        'min': 0,
                        'max': 1
                      },
                      'amount': {
                        'type': 'number',
                        'min': 0,
                        'max': 10000
                      }
                    }
                  },
                  'warranty2': {
                    'type': 'dict',
                    'schema': {
                      'percentage': {
                        'type': 'number',
                        'min': 0,
                        'max': 1
                      },
                      'amount': {
                        'type': 'number',
                        'min': 0,
                        'max': 10000
                      }
                    }
                  }
                }
              },
              'refurbisher': {
                'type': 'dict',
                'schema': {
                  'standard': {
                    'type': 'dict',
                    'schema': {
                      'percentage': {
                        'type': 'number',
                        'min': 0,
                        'max': 1
                      },
                      'amount': {
                        'type': 'number',
                        'min': 0,
                        'max': 10000
                      }
                    }
                  },
                  'warranty2': {
                    'type': 'dict',
                    'schema': {
                      'percentage': {
                        'type': 'number',
                        'min': 0,
                        'max': 1
                      },
                      'amount': {
                        'type': 'number',
                        'min': 0,
                        'max': 10000
                      }
                    }
                  }
                }
              }
            },
            'teaser': true,
            'materialized': true,
            'sink': 1
          },
          '_blacklist': {
            'type': 'set'
          },
          'test': {
            'type': 'dict',
            'schema': {
              'snapshot': {
                'type': 'objectid',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'events'
                }
              },
              'date': {
                'type': 'datetime',
                'description': 'When this happened. Leave blank if it is happening now.',
                'sink': -2
              },
              'lifetime': {
                'type': 'integer'
              },
              'device': {
                'type': 'string',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'devices'
                },
                'required': false
              },
              'type': {
                'type': 'string'
              },
              'created': {
                'dh_allowed_write_role': 'su',
                'type': 'datetime',
                'writeonly': true,
                'doc': 'Sets the _created and _updated, thought to be used in imports.'
              },
              'reportedUncorrectableErrors': {
                'type': 'integer'
              },
              'assessment': {
                'type': 'boolean'
              },
              'error': {
                'type': 'boolean',
                'required': true
              },
              'firstError': {
                'nullable': true,
                'type': 'integer'
              },
              '@type': {
                'type': 'string',
                'required': true,
                'allowed': [
                  'devices:TestHardDrive'
                ],
                'teaser': false
              },
              'status': {
                'type': 'string',
                'required': true
              },
              'description': {
                'maxlength': 500,
                'type': 'string',
                'description': 'Full long description.',
                'sink': -4
              },
              'label': {
                'type': 'string',
                'description': 'A short, descriptive title',
                'sink': 5
              },
              'RemainingLifetimePercentage': {
                'type': 'integer'
              },
              'byUser': {
                'type': 'objectid',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'accounts'
                },
                'coerce_with_context': '<callable>',
                'sink': 2
              },
              'OfflineUncorrectable': {
                'type': 'integer'
              },
              'powerCycleCount': {
                'type': 'integer'
              },
              'CommandTimeout': {
                'type': 'integer'
              },
              'parent': {
                'type': 'string',
                'data_relation': {
                  'embeddable': true,
                  'field': '_id',
                  'resource': 'devices'
                },
                'materialized': true,
                'description': 'The event triggered in this computer.'
              },
              'secured': {
                'type': 'boolean',
                'sink': -3
              },
              'incidence': {
                'type': 'boolean',
                'description': 'Check if something went wrong, you can add details in a comment',
                'sink': -3
              },
              'reallocatedSectorCount': {
                'type': 'integer'
              },
              'comment': {
                'type': 'string',
                'description': 'Short comment for fast and easy reading',
                'doc': 'This field is deprecated (it does not show in clients); use description instead.',
                'sink': -4
              },
              'geo': {
                'type': 'point',
                'description': 'Where did it happened',
                'sink': -5
              },
              'url': {
                'type': 'url',
                'move': 'sameAs',
                'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
                'teaser': false
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
                'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
                'materialized': true,
                'description': 'The permissions accounts have on the resource.'
              },
              'sameAs': {
                'type': 'list',
                'unique': true,
                'teaser': false
              },
              'byOrganization': {
                'type': 'string',
                'readonly': true
              },
              'passedLifetime': {
                'type': 'integer'
              },
              'CurrentPendingSectorCount': {
                'type': 'integer'
              }
            }
          }
        },
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'devices'
        }
      },
      'default': [],
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Snapshot'
      ],
      'teaser': false
    },
    'request': {
      'type': 'string',
      'readonly': true,
      'doc': 'The whole Snapshot saved in case for debugging'
    },
    'pictures': {
      'type': 'list',
      'schema': {
        'type': 'media',
        'accept': 'image/jpeg'
      },
      'description': 'Pictures of the device.'
    },
    'unsecured': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'type': {
            'type': 'string',
            'allowed': [
              'model',
              'pid'
            ]
          },
          '@type': {
            'type': 'string'
          }
        }
      },
      'default': [],
      'readonly': true,
      'description': 'Information about existing non-HID device.'
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
    'orientation': {
      'type': 'string',
      'allowed': [
        'Vertical',
        'Horizontal'
      ]
    },
    'from': {
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
      'doc': 'Disabled for now as incoming lot provides this functionality, want to see if it is really needed.',
      'label': 'E-mail of the giver',
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
      'readonly': true,
      'description': 'The e-mail of the person or organization that gave the devices. You cannot change this later.'
    },
    'elapsed': {
      'type': 'time'
    },
    'picture_info': {
      'type': 'dict',
      'schema': {
        'version': {
          'type': 'version',
          'description': 'The version of the software.'
        },
        'software': {
          'type': 'string',
          'description': 'The software used to take the picture.',
          'allowed': [
            'Pbx'
          ],
          'allowed_description': {
            'Pbx': 'Photobox'
          }
        }
      },
      'description': 'Information about the pictures of the device.'
    }
  },
  'devices_allocate': {
    '_settings': {
      'sink': -5,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/allocate',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-hand-o-right',
      'shortDescription': 'Assign the devices to someone, so that person \'owns\' the device'
    },
    'toOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the allocation, the user worked in.',
      'materialized': true
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
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
      'doc': 'The user the devices are allocated to. It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
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
    },
    '_id': {
      'type': 'objectid'
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Allocate'
      ],
      'teaser': false
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    }
  },
  'devices_device-event': {
    'toOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the allocation, the user worked in.',
      'materialized': true
    },
    'date': {
      'type': 'datetime'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'assessment': {
      'type': 'boolean'
    },
    'cleanWithZeros': {
      'type': 'boolean'
    },
    'organization': {
      'type': 'string',
      'readonly': true
    },
    '_for': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'materialized': true
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'inventory': {
      'type': 'dict',
      'schema': {
        'elapsed': {
          'type': 'time'
        }
      }
    },
    'RemainingLifetimePercentage': {
      'type': 'integer'
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkRamSysbench'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'score': {
            'type': 'float'
          }
        }
      }
    },
    'snapshotSoftware': {
      'type': 'string',
      'default': 'Workbench',
      'allowed': [
        'AndroidApp',
        'WorkbenchAuto',
        'Photobox',
        'Web',
        'DesktopApp',
        'Workbench'
      ]
    },
    'CommandTimeout': {
      'type': 'integer'
    },
    'secureRandomSteps': {
      'type': 'natural',
      'required': true
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'receiverOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the receive, the user worked in.',
      'materialized': true
    },
    'cancel': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'materialized': true,
      'description': 'A CancelReservation event has cancelled this reservation.'
    },
    'reallocatedSectorCount': {
      'type': 'integer'
    },
    'geo': {
      'or': [
        'place'
      ],
      'type': 'point',
      'excludes': 'place',
      'description': 'Where did it happened',
      'sink': -5
    },
    'color': {
      'type': 'string',
      'allowed_description': {
        '#00FF00': 'lime',
        '#808000': 'olive',
        '#FFFFFF': 'white',
        '#C0C0C0': 'silver',
        '#0000FF': 'blue',
        '#800000': 'maroon',
        '#008080': 'teal',
        '#800080': 'purple',
        '#008000': 'green',
        '#808080': 'gray',
        '#000080': 'navy',
        '#FF00FF': 'fuchsia',
        '#FF0000': 'red',
        '#FFFF00': 'yellow',
        '#000000': 'black',
        '#00FFFF': 'aqua'
      },
      'description': 'The primary color of the device.'
    },
    'returnedSameAs': {
      'excludes': 'to',
      'valueschema': {
        'type': 'list',
        'valueschema': [
          'type',
          'url'
        ]
      },
      'writeonly': true,
      'doc': 'A mapping of {deviceUrlInAgent1: sameAsValuesAgent2Sent, ...} representing the sameAs urls that are sent back to the agent that started the Migrate. Those values need to be sent, and keeping them helps in future debug sessions.',
      'type': 'dict',
      'propertyschema': {
        'type': 'url'
      },
      'readonly': true
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'FinalUser',
        'RecyclingPoint',
        'CollectionPoint'
      ]
    },
    'devices': {
      'type': 'list',
      'schema': {
        'type': [
          'string',
          'dict'
        ],
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'devices'
        }
      },
      'required': true,
      'doc': 'A list of device identifiers. When one DeviceHub sends a Migrate to the other, devices are full devices with their components.'
    },
    '_uuid': {
      'type': 'uuid',
      'teaser': false,
      'modifiable': false,
      'unique': true
    },
    'fromOrganization': {
      'type': 'string',
      'readonly': true
    },
    'passedLifetime': {
      'type': 'integer'
    },
    'invoiceNumber': {
      'type': 'string',
      'description': 'The id of your invoice so they can be linked.'
    },
    'snapshot': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      }
    },
    'osInstallation': {
      'type': 'dict',
      'schema': {
        'label': {
          'type': 'string'
        },
        'success': {
          'type': 'boolean'
        },
        'elapsed': {
          'type': 'time'
        }
      }
    },
    'autoUploaded': {
      'type': 'boolean',
      'default': false
    },
    '_id': {
      'type': 'objectid'
    },
    'invoices': {
      'type': 'list',
      'schema': {
        'type': 'media',
        'accept': 'application/pdf'
      },
      'description': 'Upload invoices in PDF. You can select multiple by pressing Ctrl or Cmd.You won\'t be able to modify them later and we will save them with the name they have.'
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
      'doc': 'The user the devices are allocated to. It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
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
    },
    'group': {
      'type': 'dict',
      'schema': {
        '_id': {
          'type': 'string',
          'required': true
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Pallet',
            'Group',
            'IncomingLot',
            'OutgoingLot',
            'Place',
            'Physical',
            'Abstract',
            'Lot',
            'Package'
          ]
        }
      },
      'doc': 'After performing the snapshot, adds the device to the group if it was not there already.',
      'description': 'Automatically add the device to the group, if any.'
    },
    'success': {
      'type': 'boolean'
    },
    'status': {
      'type': 'string',
      'required': true
    },
    'startingTime': {
      'type': 'datetime'
    },
    'firstError': {
      'nullable': true,
      'type': 'integer'
    },
    'offline': {
      'type': 'boolean'
    },
    'software': {
      'type': 'dict',
      'schema': {
        'productKey': {
          'type': 'string'
        }
      },
      'sink': -1
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Snapshot',
        'devices:Locate',
        'devices:Ready',
        'devices:TestHardDrive',
        'devices:ToRepair',
        'devices:EraseBasic',
        'devices:Migrate',
        'devices:Register',
        'devices:Allocate',
        'devices:DeviceEvent',
        'devices:EventWithOneDevice',
        'devices:Deallocate',
        'devices:CancelReservation',
        'devices:Reserve',
        'devices:Dispose',
        'devices:ToDispose',
        'devices:ToPrepare',
        'devices:EventWithDevices',
        'devices:Remove',
        'devices:EraseSectors',
        'devices:Sell',
        'devices:Live',
        'devices:Repair',
        'devices:Add',
        'devices:Receive',
        'devices:Free'
      ],
      'teaser': false
    },
    'receiver': {
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
      'doc': 'The user that receives it. It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
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
    'error': {
      'type': 'boolean',
      'required': true
    },
    'shippingDate': {
      'type': 'datetime',
      'description': 'When are the devices going to be ready for shipping?'
    },
    'automatic': {
      'type': 'boolean'
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'orientation': {
      'type': 'string',
      'allowed': [
        'Vertical',
        'Horizontal'
      ]
    },
    'automaticallyAllocate': {
      'type': 'boolean',
      'default': false,
      'description': 'Allocates to the user'
    },
    'from': {
      'dh_allowed_write_role': 'm',
      'excludes': 'to',
      'doc': 'This value is only filled by other DeviceHub when transmitting the Migrate',
      'type': 'url'
    },
    'CurrentPendingSectorCount': {
      'type': 'integer'
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Event',
      'url': 'events/devices',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'fa': 'fa-bookmark-o',
      'resourceMethods': [
        'GET'
      ]
    },
    'debug': {
      'type': 'dict',
      'teaser': false
    },
    'force': {
      'type': [
        'boolean'
      ]
    },
    'version': {
      'type': 'version',
      'teaser': false
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true,
      'description': 'The events triggered by the Snapshot.'
    },
    'pictures': {
      'type': 'list',
      'schema': {
        'type': 'media',
        'accept': 'image/jpeg'
      },
      'description': 'Pictures of the device.'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'endingTime': {
      'type': 'datetime'
    },
    'reportedUncorrectableErrors': {
      'type': 'integer'
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'doc': 'This is not the same as the materialized "parent" field. This field can be set when snapshotting a component, for example through Scan, that should be included in a device.'
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'reserve': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'description': 'The reserve this sell confirms.',
      'unique': true
    },
    'ip': {
      'type': 'string',
      'readonly': true
    },
    'administrativeArea': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'AdministrativeArea'
          ],
          'teaser': false
        },
        'isoCode': {
          'type': 'string',
          'description': 'The ISO Code as ISO 3166-1'
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
        'confidence': {
          'type': 'natural'
        }
      },
      'readonly': true
    },
    'acceptedConditions': {
      'type': 'boolean',
      'required': true,
      'allowed': [
        true
      ]
    },
    'place': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'places'
      },
      'description': 'Where did it happened',
      'sink': 0
    },
    'condition': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'teaser': true,
      'sink': 1
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'tests': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean'
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'StressTest'
            ]
          },
          'elapsed': {
            'type': 'time'
          }
        }
      }
    },
    'lifetime': {
      'type': 'integer'
    },
    'device': {
      'type': 'dict',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'required': true,
      'sink': 4
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'deviceIsNew': {
      'type': 'boolean',
      'default': false,
      'doc': 'Note that prior may 2017 this value is None for everyone.'
    },
    'userType': {
      'type': 'string',
      'readonly': true
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'city': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'City'
          ],
          'teaser': false
        },
        'confidence': {
          'type': 'natural'
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
      'readonly': true
    },
    'continent': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Continent'
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
        'geoipCode': {
          'type': 'string',
          'description': 'The GEOIP Code'
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Full long description.',
          'sink': -4
        }
      },
      'readonly': true
    },
    'autonomousSystemNumber': {
      'type': 'natural',
      'readonly': true
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'steps': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean',
            'required': true
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'Zeros',
              'Random'
            ]
          },
          'secureRandomSteps': {
            'type': 'boolean'
          },
          'cleanWithZeros': {
            'type': 'boolean'
          },
          'startingTime': {
            'type': 'datetime'
          },
          'endingTime': {
            'type': 'datetime'
          }
        }
      }
    },
    'OfflineUncorrectable': {
      'type': 'integer'
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    'powerCycleCount': {
      'type': 'integer'
    },
    'isp': {
      'type': 'string',
      'readonly': true
    },
    'sell': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'materialized': true,
      'description': 'A Sell event that has completed this reservation.'
    },
    'for': {
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
      'doc': 'This field is auto-fulfilled with "byUser" value if the user is the owner of the DB, otherwise it isrequired to be fulfilled.',
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
      'description': 'Who are you reserving for? If you leave it blank, you will reserve it for yourself.'
    },
    'request': {
      'type': 'string',
      'readonly': true,
      'doc': 'The whole Snapshot saved in case for debugging'
    },
    'country': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Country'
          ],
          'teaser': false
        },
        'isoCode': {
          'type': 'string',
          'description': 'The ISO Code as ISO 3166-1'
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
        'confidence': {
          'type': 'natural'
        }
      },
      'readonly': true
    },
    'notify': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'description': 'Accounts that have been notified for this reservation.'
    },
    'unsecured': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'type': {
            'type': 'string',
            'allowed': [
              'model',
              'pid'
            ]
          },
          '@type': {
            'type': 'string'
          }
        }
      },
      'default': [],
      'readonly': true
    },
    'licenseKey': {
      'type': 'string'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'sink': 1
    },
    'deadline': {
      'type': 'datetime'
    },
    'elapsed': {
      'type': 'time'
    },
    'picture_info': {
      'type': 'dict',
      'schema': {
        'version': {
          'type': 'version',
          'description': 'The version of the software.'
        },
        'software': {
          'type': 'string',
          'description': 'The software used to take the picture.',
          'allowed': [
            'Pbx'
          ],
          'allowed_description': {
            'Pbx': 'Photobox'
          }
        }
      },
      'description': 'Information about the pictures of the device.'
    }
  },
  'devices_live': {
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithOneDevice',
      'url': 'events/devices/live',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'fa': 'fa-bookmark-o',
      'resourceMethods': [
        'POST'
      ]
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'device': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'created': {
      'dh_allowed_write_role': 'su',
      'type': 'datetime',
      'writeonly': true,
      'doc': 'Sets the _created and _updated, thought to be used in imports.'
    },
    'userType': {
      'type': 'string',
      'readonly': true
    },
    'description': {
      'maxlength': 500,
      'type': 'string',
      'description': 'Full long description.',
      'sink': -4
    },
    'city': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'City'
          ],
          'teaser': false
        },
        'confidence': {
          'type': 'natural'
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
      'readonly': true
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Live'
      ],
      'teaser': false
    },
    '_id': {
      'type': 'objectid'
    },
    'continent': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Continent'
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
        'geoipCode': {
          'type': 'string',
          'description': 'The GEOIP Code'
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Full long description.',
          'sink': -4
        }
      },
      'readonly': true
    },
    'autonomousSystemNumber': {
      'type': 'natural',
      'readonly': true
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    'isp': {
      'type': 'string',
      'readonly': true
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'country': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Country'
          ],
          'teaser': false
        },
        'isoCode': {
          'type': 'string',
          'description': 'The ISO Code as ISO 3166-1'
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
        'confidence': {
          'type': 'natural'
        }
      },
      'readonly': true
    },
    'ip': {
      'type': 'string',
      'readonly': true
    },
    'administrativeArea': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'AdministrativeArea'
          ],
          'teaser': false
        },
        'isoCode': {
          'type': 'string',
          'description': 'The ISO Code as ISO 3166-1'
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
        'confidence': {
          'type': 'natural'
        }
      },
      'readonly': true
    },
    'organization': {
      'type': 'string',
      'readonly': true
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
    }
  },
  'devices_cancel-reservation': {
    '_settings': {
      'sink': -6,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/cancel-reservation',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-times',
      'shortDescription': 'Cancels a reservation.'
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    '_for': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'materialized': true
    },
    '_id': {
      'type': 'objectid'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:CancelReservation'
      ],
      'teaser': false
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'reserve': {
      'doc': 'Write only a reservation.',
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'required': true,
      'description': 'The reserve to cancel.',
      'unique': true
    },
    'notify': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'description': 'Accounts that have been notified for this cancellation.'
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    }
  },
  'devices_to-repair': {
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    '_settings': {
      'sink': 0,
      'useDefaultDatabase': false,
      'parent': 'devices:EventWithDevices',
      'url': 'events/devices/to-repair',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'resourceMethods': [
        'POST'
      ],
      'fa': 'fa-chain-broken',
      'shortDescription': 'The devices need repairing'
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:ToRepair'
      ],
      'teaser': false
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'date': {
      'type': 'datetime',
      'description': 'When this happened. Leave blank if it is happening now.',
      'sink': -2
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
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
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'geo': {
      'type': 'point',
      'description': 'Where did it happened',
      'sink': -5
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    '_id': {
      'type': 'objectid'
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
      'default': [],
      'doc': 'We want either \'devices\' xor \'groups\'.'
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    }
  },
  'peripheral': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Device',
      'url': 'devices/peripheral',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Mod.'
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Router',
        'Terminal',
        'Keyboard',
        'MemoryCardReader',
        'HUB',
        'Amplifier',
        'Projector',
        'Microphone',
        'Switch',
        'Printer',
        'VideoconferenceDevice',
        'VideoScaler',
        'Scaler',
        'WirelessMicrophone',
        'AudioAmplifier',
        'LabelPrinter',
        'MultifunctionPrinter',
        'SAI',
        'Scanner',
        'WirelessAccessPoint',
        'SoundDevice',
        'Mouse'
      ]
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'S/N'
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Peripheral'
      ],
      'teaser': false
    },
    'manufacturer': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Man.'
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
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
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    }
  },
  'computer-monitor': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Device',
      'url': 'devices/computer-monitor',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Mod.'
    },
    'inches': {
      'type': 'natural'
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'TFT',
        'OLED',
        'LED',
        'LCD'
      ]
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'S/N'
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'ComputerMonitor'
      ],
      'teaser': false
    },
    'manufacturer': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Man.'
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
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
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    }
  },
  'processor': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/processor',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
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
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'address': {
      'type': 'integer',
      'unitCode': 'A99',
      'allowed': [
        32,
        256,
        64,
        128,
        8,
        16
      ],
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'benchmark': {
      'type': 'dict',
      'schema': {
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'BenchmarkProcessorSysbench',
            'BenchmarkProcessor'
          ],
          'teaser': false
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'score': {
          'type': 'float'
        }
      },
      'writeonly': true
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkProcessorSysbench',
              'BenchmarkProcessor'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'score': {
            'type': 'float'
          }
        }
      }
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Processor'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'numberOfCores': {
      'type': 'integer',
      'min': 1,
      'sink': 1
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
    },
    'speed': {
      'type': 'float',
      'unitCode': 'A86',
      'min': 0.1,
      'sink': 1
    },
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'devices': {
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'IndividualProduct',
      'url': 'devices/', // devices URL
      'pathToDataInResponse': 'devices',
      'itemMethods': [
        'GET',
        'PATCH',
        'DELETE'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
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
    'address': {
      'type': 'integer',
      'unitCode': 'A99',
      'allowed': [
        32,
        256,
        64,
        128,
        8,
        16
      ],
      'sink': -1
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'allowed': [
        'Router',
        'HDD',
        'Terminal',
        'CRT',
        'Plasma',
        'Keyboard',
        'MemoryCardReader',
        'Smartphone',
        'Microtower',
        'HUB',
        'LCD',
        'Tablet',
        'Server',
        'Amplifier',
        'TFT',
        'Projector',
        'OLED',
        'Microphone',
        'Switch',
        'LED',
        'Printer',
        'Netbook',
        'SSD',
        'VideoconferenceDevice',
        'VideoScaler',
        'Scaler',
        'WirelessMicrophone',
        'AudioAmplifier',
        'Desktop',
        'LabelPrinter',
        'MultifunctionPrinter',
        'SAI',
        'Laptop',
        'Scanner',
        'WirelessAccessPoint',
        'SoundDevice',
        'Mouse'
      ]
    },
    'inches': {
      'type': 'natural'
    },
    'serialNumber': {
      'type': 'string',
      'sink': 4,
      'short': 'S/N'
    },
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkProcessorSysbench',
              'BenchmarkProcessor'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'score': {
            'type': 'float'
          }
        }
      }
    },
    'maxAcceptedMemory': {
      'type': 'integer',
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'numberOfCores': {
      'type': 'integer',
      'min': 1,
      'sink': 1
    },
    'manufacturer': {
      'type': 'string',
      'sink': 4,
      'short': 'Man.'
    },
    'speed': {
      'type': 'float',
      'unitCode': 'MHZ',
      'min': 0.1,
      'sink': -1
    },
    'totalHardDriveSize': {
      'sink': 1,
      'materialized': true,
      'short': 'HDD',
      'type': 'float',
      'unitCode': '4L',
      'default': 0,
      'description': 'The total amount of hard-drive capacity the computer has.'
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'connectors': {
      'type': 'dict',
      'schema': {
        'usb': {
          'type': 'natural'
        },
        'firewire': {
          'type': 'natural'
        },
        'pcmcia': {
          'type': 'natural'
        },
        'serial': {
          'type': 'natural'
        }
      }
    },
    'erasure': {
      'type': 'dict',
      'schema': {
        'date': {
          'type': 'datetime',
          'description': 'When this happened. Leave blank if it is happening now.',
          'sink': -2
        },
        'device': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'required': false
        },
        'byOrganization': {
          'type': 'string',
          'readonly': true
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
        'success': {
          'type': 'boolean'
        },
        'startingTime': {
          'type': 'datetime'
        },
        'cleanWithZeros': {
          'type': 'boolean'
        },
        'parent': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'materialized': true,
          'description': 'The event triggered in this computer.'
        },
        'byUser': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'accounts'
          },
          'coerce_with_context': '<callable>',
          'sink': 2
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'endingTime': {
          'type': 'datetime'
        },
        'steps': {
          'type': 'list',
          'schema': {
            'type': 'dict',
            'schema': {
              'success': {
                'type': 'boolean',
                'required': true
              },
              '@type': {
                'type': 'string',
                'required': true,
                'allowed': [
                  'Zeros',
                  'Random'
                ]
              },
              'secureRandomSteps': {
                'type': 'boolean'
              },
              'cleanWithZeros': {
                'type': 'boolean'
              },
              'startingTime': {
                'type': 'datetime'
              },
              'endingTime': {
                'type': 'datetime'
              }
            }
          }
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'devices:EraseBasic',
            'devices:EraseSectors'
          ],
          'teaser': false
        },
        'secureRandomSteps': {
          'type': 'natural',
          'required': true
        },
        'secured': {
          'type': 'boolean',
          'sink': -3
        },
        'incidence': {
          'type': 'boolean',
          'description': 'Check if something went wrong, you can add details in a comment',
          'sink': -3
        },
        'comment': {
          'type': 'string',
          'description': 'Short comment for fast and easy reading',
          'doc': 'This field is deprecated (it does not show in clients); use description instead.',
          'sink': -4
        },
        'geo': {
          'type': 'point',
          'description': 'Where did it happened',
          'sink': -5
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
          'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
          'materialized': true,
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
        }
      },
      'writeonly': true
    },
    'totalSlots': {
      'type': 'integer',
      'teaser': false
    },
    'tests': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
    },
    'totalRamSize': {
      'sink': 1,
      'materialized': true,
      'doc': 'It is updated after a Register, Add o Remove',
      'short': 'RAM',
      'type': 'float',
      'unitCode': 'E34',
      'default': 0,
      'description': 'The total amount of RAM memory the computer has.'
    },
    'usedSlots': {
      'type': 'integer',
      'teaser': false
    },
    'firmwareRevision': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'model': {
      'type': 'string',
      'sink': 4,
      'short': 'Mod.'
    },
    'imei': {
      'type': 'string',
      'unique': true
    },
    'memory': {
      'type': 'float',
      'unitCode': '4L',
      'min': 1,
      'sink': 3
    },
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'erasures': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'benchmark': {
      'type': 'dict',
      'schema': {
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'BenchmarkProcessorSysbench',
            'BenchmarkProcessor'
          ],
          'teaser': false
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'score': {
          'type': 'float'
        }
      },
      'writeonly': true
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    'interface': {
      'type': 'string',
      'teaser': false,
      'sink': -1
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'size': {
      'type': 'integer',
      'unitCode': '4L',
      'min': 1,
      'sink': 1
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
      'default': [],
      'sink': 1
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'TelevisionSet',
        'Mobile',
        'NetworkAdapter',
        'Processor',
        'HardDrive',
        'SoundCard',
        'Motherboard',
        'GraphicCard',
        'Device',
        'OpticalDrive',
        'ComputerMonitor',
        'Component',
        'Computer',
        'RamModule',
        'Peripheral'
      ],
      'teaser': false
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'forceCreation': {
      'type': 'boolean',
      'default': false
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'meid': {
      'type': 'string',
      'unique': true
    },
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'blockSize': {
      'type': 'integer',
      'teaser': false,
      'sink': -1
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'processorModel': {
      'type': 'string',
      'sink': 1,
      'materialized': true,
      'description': 'The model of the processor.',
      'short': 'CPU'
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'test': {
      'type': 'dict',
      'schema': {
        'snapshot': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'events'
          }
        },
        'date': {
          'type': 'datetime',
          'description': 'When this happened. Leave blank if it is happening now.',
          'sink': -2
        },
        'lifetime': {
          'type': 'integer'
        },
        'device': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'required': false
        },
        'type': {
          'type': 'string'
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'reportedUncorrectableErrors': {
          'type': 'integer'
        },
        'assessment': {
          'type': 'boolean'
        },
        'error': {
          'type': 'boolean',
          'required': true
        },
        'firstError': {
          'nullable': true,
          'type': 'integer'
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'devices:TestHardDrive'
          ],
          'teaser': false
        },
        'status': {
          'type': 'string',
          'required': true
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Full long description.',
          'sink': -4
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'RemainingLifetimePercentage': {
          'type': 'integer'
        },
        'byUser': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'accounts'
          },
          'coerce_with_context': '<callable>',
          'sink': 2
        },
        'OfflineUncorrectable': {
          'type': 'integer'
        },
        'powerCycleCount': {
          'type': 'integer'
        },
        'CommandTimeout': {
          'type': 'integer'
        },
        'parent': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'materialized': true,
          'description': 'The event triggered in this computer.'
        },
        'secured': {
          'type': 'boolean',
          'sink': -3
        },
        'incidence': {
          'type': 'boolean',
          'description': 'Check if something went wrong, you can add details in a comment',
          'sink': -3
        },
        'reallocatedSectorCount': {
          'type': 'integer'
        },
        'comment': {
          'type': 'string',
          'description': 'Short comment for fast and easy reading',
          'doc': 'This field is deprecated (it does not show in clients); use description instead.',
          'sink': -4
        },
        'geo': {
          'type': 'point',
          'description': 'Where did it happened',
          'sink': -5
        },
        'url': {
          'type': 'url',
          'move': 'sameAs',
          'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
          'teaser': false
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
          'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
          'materialized': true,
          'description': 'The permissions accounts have on the resource.'
        },
        'sameAs': {
          'type': 'list',
          'unique': true,
          'teaser': false
        },
        'byOrganization': {
          'type': 'string',
          'readonly': true
        },
        'passedLifetime': {
          'type': 'integer'
        },
        'CurrentPendingSectorCount': {
          'type': 'integer'
        }
      }
    },
    'sectors': {
      'type': 'integer',
      'teaser': false,
      'sink': -1
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'television-set': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Device',
      'url': 'devices/television-set',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Mod.'
    },
    'inches': {
      'type': 'natural'
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'OLED',
        'LED',
        'CRT',
        'LCD',
        'Plasma'
      ]
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'S/N'
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'TelevisionSet'
      ],
      'teaser': false
    },
    'manufacturer': {
      'type': 'string',
      'required': true,
      'sink': 4,
      'short': 'Man.'
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
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
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    }
  },
  'component': {
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Device',
      'url': 'devices/component',
      'itemMethods': [],
      'resourceMethods': [],
      'fa': 'fa-desktop'
    },
    'address': {
      'type': 'integer',
      'unitCode': 'A99',
      'allowed': [
        32,
        256,
        64,
        128,
        8,
        16
      ],
      'sink': -1
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'teaser': true,
      'required': false,
      'allowed': [
        'HDD',
        'SSD'
      ],
      'sink': 2
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkProcessorSysbench',
              'BenchmarkProcessor'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'score': {
            'type': 'float'
          }
        }
      }
    },
    'maxAcceptedMemory': {
      'type': 'integer',
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'numberOfCores': {
      'type': 'integer',
      'min': 1,
      'sink': 1
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
    },
    'speed': {
      'type': 'number',
      'unitCode': 'MHZ',
      'min': 0.1,
      'sink': -1
    },
    'blockSize': {
      'type': 'integer',
      'teaser': false,
      'sink': -1
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'connectors': {
      'type': 'dict',
      'schema': {
        'usb': {
          'type': 'natural'
        },
        'firewire': {
          'type': 'natural'
        },
        'pcmcia': {
          'type': 'natural'
        },
        'serial': {
          'type': 'natural'
        }
      }
    },
    'erasure': {
      'type': 'dict',
      'schema': {
        'date': {
          'type': 'datetime',
          'description': 'When this happened. Leave blank if it is happening now.',
          'sink': -2
        },
        'device': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'required': false
        },
        'byOrganization': {
          'type': 'string',
          'readonly': true
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
        'success': {
          'type': 'boolean'
        },
        'startingTime': {
          'type': 'datetime'
        },
        'cleanWithZeros': {
          'type': 'boolean'
        },
        'parent': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'materialized': true,
          'description': 'The event triggered in this computer.'
        },
        'byUser': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'accounts'
          },
          'coerce_with_context': '<callable>',
          'sink': 2
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'endingTime': {
          'type': 'datetime'
        },
        'steps': {
          'type': 'list',
          'schema': {
            'type': 'dict',
            'schema': {
              'success': {
                'type': 'boolean',
                'required': true
              },
              '@type': {
                'type': 'string',
                'required': true,
                'allowed': [
                  'Zeros',
                  'Random'
                ]
              },
              'secureRandomSteps': {
                'type': 'boolean'
              },
              'cleanWithZeros': {
                'type': 'boolean'
              },
              'startingTime': {
                'type': 'datetime'
              },
              'endingTime': {
                'type': 'datetime'
              }
            }
          }
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'devices:EraseBasic',
            'devices:EraseSectors'
          ],
          'teaser': false
        },
        'secureRandomSteps': {
          'type': 'natural',
          'required': true
        },
        'secured': {
          'type': 'boolean',
          'sink': -3
        },
        'incidence': {
          'type': 'boolean',
          'description': 'Check if something went wrong, you can add details in a comment',
          'sink': -3
        },
        'comment': {
          'type': 'string',
          'description': 'Short comment for fast and easy reading',
          'doc': 'This field is deprecated (it does not show in clients); use description instead.',
          'sink': -4
        },
        'geo': {
          'type': 'point',
          'description': 'Where did it happened',
          'sink': -5
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
          'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
          'materialized': true,
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
        }
      },
      'writeonly': true
    },
    'totalSlots': {
      'type': 'integer',
      'teaser': false
    },
    'tests': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
    },
    'sectors': {
      'type': 'integer',
      'teaser': false,
      'sink': -1
    },
    'usedSlots': {
      'type': 'integer',
      'teaser': false
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'memory': {
      'type': 'float',
      'unitCode': '4L',
      'min': 1,
      'sink': 3
    },
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'erasures': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'benchmark': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'BenchmarkHardDrive',
            'BenchmarkProcessor'
          ],
          'teaser': false
        },
        'readingSpeed': {
          'type': 'float',
          'unitCode': '4L'
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'score': {
          'type': 'float'
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'writingSpeed': {
          'type': 'float',
          'unitCode': '4L'
        }
      },
      'writeonly': true
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    'interface': {
      'type': 'string',
      'teaser': false,
      'sink': -1
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'size': {
      'type': 'number',
      'unitCode': '4L',
      'min': 1,
      'sink': 1
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
      'default': [],
      'sink': 1
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'NetworkAdapter',
        'Processor',
        'SoundCard',
        'Motherboard',
        'GraphicCard',
        'OpticalDrive',
        'RamModule',
        'Component',
        'HardDrive'
      ],
      'teaser': false
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'firmwareRevision': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    '_blacklist': {
      'type': 'set'
    },
    'test': {
      'type': 'dict',
      'schema': {
        'snapshot': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'events'
          }
        },
        'date': {
          'type': 'datetime',
          'description': 'When this happened. Leave blank if it is happening now.',
          'sink': -2
        },
        'lifetime': {
          'type': 'integer'
        },
        'device': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'required': false
        },
        'type': {
          'type': 'string'
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'reportedUncorrectableErrors': {
          'type': 'integer'
        },
        'assessment': {
          'type': 'boolean'
        },
        'error': {
          'type': 'boolean',
          'required': true
        },
        'firstError': {
          'nullable': true,
          'type': 'integer'
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'devices:TestHardDrive'
          ],
          'teaser': false
        },
        'status': {
          'type': 'string',
          'required': true
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Full long description.',
          'sink': -4
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'RemainingLifetimePercentage': {
          'type': 'integer'
        },
        'byUser': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'accounts'
          },
          'coerce_with_context': '<callable>',
          'sink': 2
        },
        'OfflineUncorrectable': {
          'type': 'integer'
        },
        'powerCycleCount': {
          'type': 'integer'
        },
        'CommandTimeout': {
          'type': 'integer'
        },
        'parent': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'materialized': true,
          'description': 'The event triggered in this computer.'
        },
        'secured': {
          'type': 'boolean',
          'sink': -3
        },
        'incidence': {
          'type': 'boolean',
          'description': 'Check if something went wrong, you can add details in a comment',
          'sink': -3
        },
        'reallocatedSectorCount': {
          'type': 'integer'
        },
        'comment': {
          'type': 'string',
          'description': 'Short comment for fast and easy reading',
          'doc': 'This field is deprecated (it does not show in clients); use description instead.',
          'sink': -4
        },
        'geo': {
          'type': 'point',
          'description': 'Where did it happened',
          'sink': -5
        },
        'url': {
          'type': 'url',
          'move': 'sameAs',
          'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
          'teaser': false
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
          'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
          'materialized': true,
          'description': 'The permissions accounts have on the resource.'
        },
        'sameAs': {
          'type': 'list',
          'unique': true,
          'teaser': false
        },
        'byOrganization': {
          'type': 'string',
          'readonly': true
        },
        'passedLifetime': {
          'type': 'integer'
        },
        'CurrentPendingSectorCount': {
          'type': 'integer'
        }
      }
    }
  },
  'motherboard': {
    'usedSlots': {
      'type': 'integer',
      'teaser': false
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/motherboard',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
    },
    'maxAcceptedMemory': {
      'type': 'integer',
      'teaser': false
    },
    '_blacklist': {
      'type': 'set'
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
      'default': [],
      'sink': 1
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'Motherboard'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'connectors': {
      'type': 'dict',
      'schema': {
        'usb': {
          'type': 'natural'
        },
        'firewire': {
          'type': 'natural'
        },
        'pcmcia': {
          'type': 'natural'
        },
        'serial': {
          'type': 'natural'
        }
      }
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'totalSlots': {
      'type': 'integer',
      'teaser': false
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    }
  },
  'ram-module': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/ram-module',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
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
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
    },
    'size': {
      'type': 'integer',
      'unitCode': '4L',
      'min': 1,
      'sink': 1
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'RamModule'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
    },
    'speed': {
      'type': 'float',
      'unitCode': 'MHZ',
      'min': 0.1,
      'sink': -1
    },
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'hard-drive': {
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'teaser': true,
      'required': false,
      'allowed': [
        'HDD',
        'SSD'
      ],
      'sink': 2
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkHardDrive'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'readingSpeed': {
            'type': 'float',
            'unitCode': '4L'
          },
          'writingSpeed': {
            'type': 'float',
            'unitCode': '4L'
          }
        }
      },
      'readonly': true
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
    },
    'blockSize': {
      'type': 'integer',
      'teaser': false,
      'sink': -1
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'firmwareRevision': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'erasure': {
      'type': 'dict',
      'schema': {
        'date': {
          'type': 'datetime',
          'description': 'When this happened. Leave blank if it is happening now.',
          'sink': -2
        },
        'device': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'required': false
        },
        'byOrganization': {
          'type': 'string',
          'readonly': true
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
        'success': {
          'type': 'boolean'
        },
        'startingTime': {
          'type': 'datetime'
        },
        'cleanWithZeros': {
          'type': 'boolean'
        },
        'parent': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'materialized': true,
          'description': 'The event triggered in this computer.'
        },
        'byUser': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'accounts'
          },
          'coerce_with_context': '<callable>',
          'sink': 2
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'endingTime': {
          'type': 'datetime'
        },
        'steps': {
          'type': 'list',
          'schema': {
            'type': 'dict',
            'schema': {
              'success': {
                'type': 'boolean',
                'required': true
              },
              '@type': {
                'type': 'string',
                'required': true,
                'allowed': [
                  'Zeros',
                  'Random'
                ]
              },
              'secureRandomSteps': {
                'type': 'boolean'
              },
              'cleanWithZeros': {
                'type': 'boolean'
              },
              'startingTime': {
                'type': 'datetime'
              },
              'endingTime': {
                'type': 'datetime'
              }
            }
          }
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'devices:EraseBasic',
            'devices:EraseSectors'
          ],
          'teaser': false
        },
        'secureRandomSteps': {
          'type': 'natural',
          'required': true
        },
        'secured': {
          'type': 'boolean',
          'sink': -3
        },
        'incidence': {
          'type': 'boolean',
          'description': 'Check if something went wrong, you can add details in a comment',
          'sink': -3
        },
        'comment': {
          'type': 'string',
          'description': 'Short comment for fast and easy reading',
          'doc': 'This field is deprecated (it does not show in clients); use description instead.',
          'sink': -4
        },
        'geo': {
          'type': 'point',
          'description': 'Where did it happened',
          'sink': -5
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
          'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
          'materialized': true,
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
        }
      },
      'writeonly': true
    },
    'tests': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
    },
    'sectors': {
      'type': 'integer',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/hard-drive',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'erasures': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'benchmark': {
      'type': 'dict',
      'schema': {
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'BenchmarkHardDrive'
          ],
          'teaser': false
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'readingSpeed': {
          'type': 'float',
          'unitCode': '4L'
        },
        'writingSpeed': {
          'type': 'float',
          'unitCode': '4L'
        }
      },
      'writeonly': true
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    'interface': {
      'type': 'string',
      'teaser': false,
      'sink': -1
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'size': {
      'type': 'float',
      'unitCode': '4L',
      'sink': 1
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
      'default': [],
      'sink': 1
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'HardDrive'
      ],
      'teaser': false
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
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
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'test': {
      'type': 'dict',
      'schema': {
        'snapshot': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'events'
          }
        },
        'date': {
          'type': 'datetime',
          'description': 'When this happened. Leave blank if it is happening now.',
          'sink': -2
        },
        'lifetime': {
          'type': 'integer'
        },
        'device': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'required': false
        },
        'type': {
          'type': 'string'
        },
        'created': {
          'dh_allowed_write_role': 'su',
          'type': 'datetime',
          'writeonly': true,
          'doc': 'Sets the _created and _updated, thought to be used in imports.'
        },
        'reportedUncorrectableErrors': {
          'type': 'integer'
        },
        'assessment': {
          'type': 'boolean'
        },
        'error': {
          'type': 'boolean',
          'required': true
        },
        'firstError': {
          'nullable': true,
          'type': 'integer'
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'devices:TestHardDrive'
          ],
          'teaser': false
        },
        'status': {
          'type': 'string',
          'required': true
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Full long description.',
          'sink': -4
        },
        'label': {
          'type': 'string',
          'description': 'A short, descriptive title',
          'sink': 5
        },
        'RemainingLifetimePercentage': {
          'type': 'integer'
        },
        'byUser': {
          'type': 'objectid',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'accounts'
          },
          'coerce_with_context': '<callable>',
          'sink': 2
        },
        'OfflineUncorrectable': {
          'type': 'integer'
        },
        'powerCycleCount': {
          'type': 'integer'
        },
        'CommandTimeout': {
          'type': 'integer'
        },
        'parent': {
          'type': 'string',
          'data_relation': {
            'embeddable': true,
            'field': '_id',
            'resource': 'devices'
          },
          'materialized': true,
          'description': 'The event triggered in this computer.'
        },
        'secured': {
          'type': 'boolean',
          'sink': -3
        },
        'incidence': {
          'type': 'boolean',
          'description': 'Check if something went wrong, you can add details in a comment',
          'sink': -3
        },
        'reallocatedSectorCount': {
          'type': 'integer'
        },
        'comment': {
          'type': 'string',
          'description': 'Short comment for fast and easy reading',
          'doc': 'This field is deprecated (it does not show in clients); use description instead.',
          'sink': -4
        },
        'geo': {
          'type': 'point',
          'description': 'Where did it happened',
          'sink': -5
        },
        'url': {
          'type': 'url',
          'move': 'sameAs',
          'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
          'teaser': false
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
          'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
          'materialized': true,
          'description': 'The permissions accounts have on the resource.'
        },
        'sameAs': {
          'type': 'list',
          'unique': true,
          'teaser': false
        },
        'byOrganization': {
          'type': 'string',
          'readonly': true
        },
        'passedLifetime': {
          'type': 'integer'
        },
        'CurrentPendingSectorCount': {
          'type': 'integer'
        }
      }
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'lots': {
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
      'parent': 'Abstract',
      'url': 'inventories/',
      'pathToDataInResponse': 'lots',
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
        'IncomingLot',
        'OutgoingLot',
        'Lot'
      ],
      'teaser': false
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
  'network-adapter': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/network-adapter',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
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
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'NetworkAdapter'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
    },
    'speed': {
      'type': 'float',
      'unitCode': 'E20',
      'min': 0.1,
      'sink': 1
    },
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'sound-card': {
    'height': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'icon': 'devices/icons/',
      'useDefaultDatabase': false,
      'parent': 'Component',
      'url': 'devices/sound-card',
      'itemMethods': [
        'DELETE',
        'GET'
      ],
      'resourceMethods': [
        'GET'
      ],
      'fa': 'fa-desktop'
    },
    'model': {
      'type': 'string',
      'short': 'Mod.',
      'sink': 4
    },
    'isUidSecured': {
      'type': 'boolean',
      'default': true,
      'teaser': false
    },
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'placeholder': {
      'type': 'boolean',
      'default': false,
      'doc': 'Invalid for components.'
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
    'pid': {
      'sink': 5,
      'externalSynthetic': true,
      'short': 'PID',
      'type': 'string',
      'uid': true,
      'description': 'The PID identifies a device under a circuit or platform.',
      'unique': true
    },
    'hid': {
      'sink': 5,
      'doc': 'The unique constrained is evaluated manually as this field needs to be computed',
      'short': 'HID',
      'type': 'hid',
      'uid': true,
      'description': 'The Hardware ID is the unique ID traceability systems use to ID a device globally.',
      'teaser': false
    },
    '_id': {
      'sink': 4,
      'short': 'ID',
      'device_id': true,
      'type': 'string',
      'uid': true,
      'description': 'The System ID, or simply ID, is an easy-to-read internal id.',
      'unique': true
    },
    'events': {
      'schema': {
        'type': 'dict'
      },
      'materialized': true,
      'doc': 'Few values of events are kept, avoiding big documents. See device/hooks/MaterializeEvents.fields.',
      'type': 'list',
      'default': [],
      'description': 'A list of events where the first one is the most recent.'
    },
    'serialNumber': {
      'type': 'string',
      'short': 'S/N',
      'sink': 4
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'labelId': {
      'type': 'string',
      'short': 'Label',
      'sink': 5
    },
    'productId': {
      'type': 'string',
      'teaser': false,
      'sink': 3
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
      'default': [],
      'sink': 1
    },
    'public': {
      'type': 'boolean',
      'default': false
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'SoundCard'
      ],
      'teaser': false
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      }
    },
    'manufacturer': {
      'type': 'string',
      'short': 'Man.',
      'sink': 4
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
    'rid': {
      'externalSynthetic': true,
      'short': 'RID',
      'type': 'string',
      'unique': true,
      'description': 'The Receiver ID is the internal identifier a Refurbisher uses.',
      'uid': true
    },
    'condition': {
      'sink': 1,
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'materialized': true,
      'doc': 'Materialized condition from the last snapshot.',
      'type': 'dict',
      'teaser': true
    },
    'perms': {
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
      'materialized': true,
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'type': 'list',
      'default': [],
      'description': 'The permissions accounts have on the resource.'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'interface': {
      'type': 'string',
      'sink': -1,
      'teaser': false
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'gid': {
      'externalSynthetic': true,
      'unique': true,
      'short': 'GID',
      'type': 'string',
      'uid': true,
      'description': 'The Giver ID links the device to the giver\'s (donor, seller) internal inventory.',
      'teaser': true
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'materialized': true,
      'sink': 1
    },
    'owners': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'sink': 2
    },
    '_blacklist': {
      'type': 'set'
    }
  },
  'events': {
    'toOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the allocation, the user worked in.',
      'materialized': true
    },
    'date': {
      'type': 'datetime'
    },
    'byOrganization': {
      'type': 'string',
      'readonly': true
    },
    'startingTime': {
      'type': 'datetime'
    },
    'cleanWithZeros': {
      'type': 'boolean'
    },
    'organization': {
      'type': 'string',
      'readonly': true
    },
    '_for': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'materialized': true
    },
    'label': {
      'type': 'string',
      'description': 'A short, descriptive title',
      'sink': 5
    },
    'inventory': {
      'type': 'dict',
      'schema': {
        'elapsed': {
          'type': 'time'
        }
      }
    },
    'RemainingLifetimePercentage': {
      'type': 'integer'
    },
    'benchmarks': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'label': {
            'type': 'string',
            'description': 'A short, descriptive title',
            'sink': 5
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'BenchmarkRamSysbench'
            ],
            'teaser': false
          },
          'created': {
            'dh_allowed_write_role': 'su',
            'type': 'datetime',
            'writeonly': true,
            'doc': 'Sets the _created and _updated, thought to be used in imports.'
          },
          'score': {
            'type': 'float'
          }
        }
      }
    },
    'snapshotSoftware': {
      'type': 'string',
      'default': 'Workbench',
      'allowed': [
        'AndroidApp',
        'WorkbenchAuto',
        'Photobox',
        'Web',
        'DesktopApp',
        'Workbench'
      ]
    },
    'CommandTimeout': {
      'type': 'integer'
    },
    'secureRandomSteps': {
      'type': 'natural',
      'required': true
    },
    'secured': {
      'type': 'boolean',
      'default': false,
      'sink': -3
    },
    'receiverOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the receive, the user worked in.',
      'materialized': true
    },
    'cancel': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'materialized': true,
      'description': 'A CancelReservation event has cancelled this reservation.'
    },
    'reallocatedSectorCount': {
      'type': 'integer'
    },
    'geo': {
      'or': [
        'place'
      ],
      'type': 'point',
      'excludes': 'place',
      'description': 'Where did it happened',
      'sink': -5
    },
    'color': {
      'type': 'string',
      'allowed_description': {
        '#00FF00': 'lime',
        '#808000': 'olive',
        '#FFFFFF': 'white',
        '#C0C0C0': 'silver',
        '#0000FF': 'blue',
        '#800000': 'maroon',
        '#008080': 'teal',
        '#800080': 'purple',
        '#008000': 'green',
        '#808080': 'gray',
        '#000080': 'navy',
        '#FF00FF': 'fuchsia',
        '#FF0000': 'red',
        '#FFFF00': 'yellow',
        '#000000': 'black',
        '#00FFFF': 'aqua'
      },
      'description': 'The primary color of the device.'
    },
    'returnedSameAs': {
      'excludes': 'to',
      'valueschema': {
        'type': 'list',
        'valueschema': [
          'type',
          'url'
        ]
      },
      'writeonly': true,
      'doc': 'A mapping of {deviceUrlInAgent1: sameAsValuesAgent2Sent, ...} representing the sameAs urls that are sent back to the agent that started the Migrate. Those values need to be sent, and keeping them helps in future debug sessions.',
      'type': 'dict',
      'propertyschema': {
        'type': 'url'
      },
      'readonly': true
    },
    'type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'FinalUser',
        'RecyclingPoint',
        'CollectionPoint'
      ]
    },
    'devices': {
      'type': 'list',
      'schema': {
        'type': [
          'string',
          'dict'
        ],
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'devices'
        }
      },
      'required': true,
      'doc': 'A list of device identifiers. When one DeviceHub sends a Migrate to the other, devices are full devices with their components.'
    },
    '_uuid': {
      'type': 'uuid',
      'teaser': false,
      'modifiable': false,
      'unique': true
    },
    'fromOrganization': {
      'type': 'string',
      'readonly': true
    },
    'passedLifetime': {
      'type': 'integer'
    },
    'invoiceNumber': {
      'type': 'string',
      'description': 'The id of your invoice so they can be linked.'
    },
    'snapshot': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      }
    },
    'osInstallation': {
      'type': 'dict',
      'schema': {
        'label': {
          'type': 'string'
        },
        'success': {
          'type': 'boolean'
        },
        'elapsed': {
          'type': 'time'
        }
      }
    },
    'autoUploaded': {
      'type': 'boolean',
      'default': false
    },
    '_id': {
      'type': 'objectid'
    },
    'invoices': {
      'type': 'list',
      'schema': {
        'type': 'media',
        'accept': 'application/pdf'
      },
      'description': 'Upload invoices in PDF. You can select multiple by pressing Ctrl or Cmd.You won\'t be able to modify them later and we will save them with the name they have.'
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
      'doc': 'The user the devices are allocated to. It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
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
    },
    'group': {
      'type': 'dict',
      'schema': {
        '_id': {
          'type': 'string',
          'required': true
        },
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Pallet',
            'Group',
            'IncomingLot',
            'OutgoingLot',
            'Place',
            'Physical',
            'Abstract',
            'Lot',
            'Package'
          ]
        }
      },
      'doc': 'After performing the snapshot, adds the device to the group if it was not there already.',
      'description': 'Automatically add the device to the group, if any.'
    },
    'success': {
      'type': 'boolean'
    },
    'status': {
      'type': 'string',
      'required': true
    },
    'assessment': {
      'type': 'boolean'
    },
    'firstError': {
      'nullable': true,
      'type': 'integer'
    },
    'offline': {
      'type': 'boolean'
    },
    'software': {
      'type': 'dict',
      'schema': {
        'productKey': {
          'type': 'string'
        }
      },
      'sink': -1
    },
    '@type': {
      'type': 'string',
      'required': true,
      'allowed': [
        'devices:Snapshot',
        'devices:Locate',
        'devices:Ready',
        'devices:TestHardDrive',
        'devices:ToRepair',
        'devices:EraseBasic',
        'devices:Migrate',
        'devices:Register',
        'devices:Allocate',
        'devices:DeviceEvent',
        'devices:EventWithOneDevice',
        'devices:Deallocate',
        'devices:CancelReservation',
        'devices:Reserve',
        'devices:Dispose',
        'devices:ToDispose',
        'devices:ToPrepare',
        'devices:EventWithDevices',
        'devices:Remove',
        'devices:EraseSectors',
        'Event',
        'devices:Sell',
        'devices:Live',
        'devices:Repair',
        'devices:Add',
        'devices:Receive',
        'devices:Free'
      ],
      'teaser': false
    },
    'receiver': {
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
      'doc': 'The user that receives it. It can be a reference to an account, or a basic account object. The object has to contain at least an e-mail. If the e-mail does not match to an existing one, an account is created. If the e-mail exists, that account is used, and the rest of the data (name, org...) is discarded.',
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
    'error': {
      'type': 'boolean',
      'required': true
    },
    'shippingDate': {
      'type': 'datetime',
      'description': 'When are the devices going to be ready for shipping?'
    },
    'automatic': {
      'type': 'boolean'
    },
    'url': {
      'type': 'url',
      'move': 'sameAs',
      'doc': 'The url of the resource. If passed in, the value it is moved to sameAs.',
      'teaser': false
    },
    'orientation': {
      'type': 'string',
      'allowed': [
        'Vertical',
        'Horizontal'
      ]
    },
    'automaticallyAllocate': {
      'type': 'boolean',
      'default': false,
      'description': 'Allocates to the user'
    },
    'from': {
      'dh_allowed_write_role': 'm',
      'excludes': 'to',
      'doc': 'This value is only filled by other DeviceHub when transmitting the Migrate',
      'type': 'url'
    },
    'CurrentPendingSectorCount': {
      'type': 'integer'
    },
    '_settings': {
      'useDefaultDatabase': false,
      'parent': 'Thing',
      'url': 'events',
      'itemMethods': [
        'GET',
        'DELETE'
      ],
      'fa': 'fa-bookmark-o',
      'resourceMethods': [
        'GET'
      ]
    },
    'debug': {
      'type': 'dict',
      'teaser': false
    },
    'force': {
      'type': [
        'boolean'
      ]
    },
    'version': {
      'type': 'version',
      'teaser': false
    },
    'events': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'events'
        }
      },
      'readonly': true,
      'description': 'The events triggered by the Snapshot.'
    },
    'pictures': {
      'type': 'list',
      'schema': {
        'type': 'media',
        'accept': 'image/jpeg'
      },
      'description': 'Pictures of the device.'
    },
    'byUser': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'accounts'
      },
      'coerce_with_context': '<callable>',
      'sink': 2
    },
    'endingTime': {
      'type': 'datetime'
    },
    'reportedUncorrectableErrors': {
      'type': 'integer'
    },
    'parent': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'doc': 'This is not the same as the materialized "parent" field. This field can be set when snapshotting a component, for example through Scan, that should be included in a device.'
    },
    'incidence': {
      'type': 'boolean',
      'default': false,
      'description': 'Check if something went wrong, you can add details in a comment',
      'sink': -3
    },
    'reserve': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'description': 'The reserve this sell confirms.',
      'unique': true
    },
    'ip': {
      'type': 'string',
      'readonly': true
    },
    'administrativeArea': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'AdministrativeArea'
          ],
          'teaser': false
        },
        'isoCode': {
          'type': 'string',
          'description': 'The ISO Code as ISO 3166-1'
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
        'confidence': {
          'type': 'natural'
        }
      },
      'readonly': true
    },
    'acceptedConditions': {
      'type': 'boolean',
      'required': true,
      'allowed': [
        true
      ]
    },
    'place': {
      'type': 'string',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'places'
      },
      'description': 'Where did it happened',
      'sink': 0
    },
    'condition': {
      'type': 'dict',
      'schema': {
        'components': {
          'type': 'dict',
          'schema': {
            'ram': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'hardDrives': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'processors': {
              'type': 'number',
              'min': 0,
              'max': 10
            }
          }
        },
        'appearance': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the imperfections that aesthetically affect the device, but not its usage.',
              'allowed': [
                '0',
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                '0': '0. The device is new',
                'D': 'D. Is acceptable (visual damage in visible parts, not on screens)',
                'C': 'C. Is in good condition (small visual damage in parts that are easy to spot, not on screens)',
                'B': 'B. Is in really good condition (small visual damage in difficult places to spot)',
                'A': 'A. Is like new (without visual damage)',
                'E': 'E. Is unacceptable (considerable visual damage that can affect usage)'
              }
            }
          }
        },
        'labelling': {
          'type': 'boolean',
          'description': 'Sets if there are labels stuck that should be removed.'
        },
        'functionality': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': -3,
              'max': 10
            },
            'general': {
              'type': 'string',
              'description': 'Grades the defects of a device that affect its usage.',
              'allowed': [
                'A',
                'B',
                'C',
                'D'
              ],
              'allowed_description': {
                'D': 'D. Multiple buttons don\'t work; screen has visual damage resulting in uncomfortable usage',
                'C': 'C. A non-important button (or similar) doesn\'t work; screen has multiple scratches in edges',
                'B': 'B. There is a button difficult to press or a small scratch in an edge of a screen',
                'A': 'A. Everything works perfectly (buttons, and in case of screens there are no scratches)'
              }
            }
          }
        },
        '_created': {
          'type': 'datetime',
          'readonly': true
        },
        'scoringSoftware': {
          'type': 'dict',
          'schema': {
            'label': {
              'type': 'string'
            },
            'version': {
              'type': 'version'
            }
          }
        },
        'bios': {
          'type': 'dict',
          'schema': {
            'general': {
              'type': 'string',
              'description': 'How difficult it has been to set the bios to boot from the network.',
              'allowed': [
                'A',
                'B',
                'C',
                'D',
                'E'
              ],
              'allowed_description': {
                'D': 'D. Like B or C, but you had to unlock the BIOS (i.e. by removing the battery)',
                'C': 'C. Like B, but with more than 5 steps',
                'E': 'E. The device could not be booted through the network.',
                'B': 'B. You had to get into the BIOS, and in less than 5 steps you could set the network boot',
                'A': 'A. If by pressing a key you could access a boot menu with the network boot'
              }
            }
          }
        },
        'general': {
          'type': 'dict',
          'schema': {
            'score': {
              'type': 'number',
              'min': 0,
              'max': 10
            },
            'range': {
              'type': 'string',
              'doc': 'allowed is ordered by range ascending.',
              'allowed': [
                'VeryLow',
                'Low',
                'Medium',
                'High'
              ],
              'description': 'An easier way to see the grade.'
            }
          }
        }
      },
      'teaser': true,
      'sink': 1
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
      'doc': 'These permissions are set on groups, and their children inherit them.Apart from this, accounts can have access to resources if they have access to the entire database, too.That access is stored in the Account *databases* field.',
      'materialized': true,
      'description': 'The permissions accounts have on the resource.'
    },
    'tests': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean'
          },
          '@type': {
            'type': 'string',
            'allowed': [
              'StressTest'
            ]
          },
          'elapsed': {
            'type': 'time'
          }
        }
      }
    },
    'lifetime': {
      'type': 'integer'
    },
    'device': {
      'type': 'dict',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'devices'
      },
      'required': true,
      'sink': 4
    },
    'originalGroups': {
      'type': 'dict',
      'schema': {
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
      },
      'readonly': true,
      'doc': 'The groups the user performed the event on, without its descendants.'
    },
    'deviceIsNew': {
      'type': 'boolean',
      'default': false,
      'doc': 'Note that prior may 2017 this value is None for everyone.'
    },
    'userType': {
      'type': 'string',
      'readonly': true
    },
    'groups': {
      'type': 'dict',
      'schema': {
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
      },
      'doc': 'This field contains the groups and all its descendants.',
      'description': 'The groups the event has been performed on.'
    },
    'city': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'City'
          ],
          'teaser': false
        },
        'confidence': {
          'type': 'natural'
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
      'readonly': true
    },
    'continent': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Continent'
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
        'geoipCode': {
          'type': 'string',
          'description': 'The GEOIP Code'
        },
        'description': {
          'maxlength': 500,
          'type': 'string',
          'description': 'Full long description.',
          'sink': -4
        }
      },
      'readonly': true
    },
    'autonomousSystemNumber': {
      'type': 'natural',
      'readonly': true
    },
    'comment': {
      'type': 'string',
      'description': 'Short comment for fast and easy reading',
      'doc': 'This field is deprecated (it does not show in clients); use description instead.',
      'sink': -4
    },
    'steps': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          'success': {
            'type': 'boolean',
            'required': true
          },
          '@type': {
            'type': 'string',
            'required': true,
            'allowed': [
              'Zeros',
              'Random'
            ]
          },
          'secureRandomSteps': {
            'type': 'boolean'
          },
          'cleanWithZeros': {
            'type': 'boolean'
          },
          'startingTime': {
            'type': 'datetime'
          },
          'endingTime': {
            'type': 'datetime'
          }
        }
      }
    },
    'OfflineUncorrectable': {
      'type': 'integer'
    },
    'components': {
      'type': 'list',
      'schema': {
        'type': 'string',
        'data_relation': {
          'resource': 'devices',
          'field': '_id',
          'embeddable': true
        }
      },
      'materialized': true,
      'description': 'Components affected by the event.',
      'teaser': false
    },
    'powerCycleCount': {
      'type': 'integer'
    },
    'isp': {
      'type': 'string',
      'readonly': true
    },
    'sell': {
      'type': 'objectid',
      'data_relation': {
        'embeddable': true,
        'field': '_id',
        'resource': 'events'
      },
      'materialized': true,
      'description': 'A Sell event that has completed this reservation.'
    },
    'for': {
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
      'doc': 'This field is auto-fulfilled with "byUser" value if the user is the owner of the DB, otherwise it isrequired to be fulfilled.',
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
      'description': 'Who are you reserving for? If you leave it blank, you will reserve it for yourself.'
    },
    'request': {
      'type': 'string',
      'readonly': true,
      'doc': 'The whole Snapshot saved in case for debugging'
    },
    'country': {
      'type': 'dict',
      'schema': {
        '@type': {
          'type': 'string',
          'required': true,
          'allowed': [
            'Country'
          ],
          'teaser': false
        },
        'isoCode': {
          'type': 'string',
          'description': 'The ISO Code as ISO 3166-1'
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
        'confidence': {
          'type': 'natural'
        }
      },
      'readonly': true
    },
    'notify': {
      'type': 'list',
      'schema': {
        'type': 'objectid',
        'data_relation': {
          'embeddable': true,
          'field': '_id',
          'resource': 'accounts'
        }
      },
      'materialized': true,
      'description': 'Accounts that have been notified for this reservation.'
    },
    'unsecured': {
      'type': 'list',
      'schema': {
        'type': 'dict',
        'schema': {
          '_id': {
            'type': 'string',
            'data_relation': {
              'embeddable': true,
              'field': '_id',
              'resource': 'devices'
            }
          },
          'type': {
            'type': 'string',
            'allowed': [
              'model',
              'pid'
            ]
          },
          '@type': {
            'type': 'string'
          }
        }
      },
      'default': [],
      'readonly': true
    },
    'licenseKey': {
      'type': 'string'
    },
    'sameAs': {
      'type': 'list',
      'unique': true,
      'teaser': false
    },
    'pricing': {
      'type': 'dict',
      'schema': {
        'total': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'number',
              'min': 0,
              'max': 10000
            },
            'warranty2': {
              'type': 'number',
              'min': 0,
              'max': 10000
            }
          }
        },
        'platform': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'retailer': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        },
        'refurbisher': {
          'type': 'dict',
          'schema': {
            'standard': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            },
            'warranty2': {
              'type': 'dict',
              'schema': {
                'percentage': {
                  'type': 'number',
                  'min': 0,
                  'max': 1
                },
                'amount': {
                  'type': 'number',
                  'min': 0,
                  'max': 10000
                }
              }
            }
          }
        }
      },
      'teaser': true,
      'sink': 1
    },
    'deadline': {
      'type': 'datetime'
    },
    'elapsed': {
      'type': 'time'
    },
    'picture_info': {
      'type': 'dict',
      'schema': {
        'version': {
          'type': 'version',
          'description': 'The version of the software.'
        },
        'software': {
          'type': 'string',
          'description': 'The software used to take the picture.',
          'allowed': [
            'Pbx'
          ],
          'allowed_description': {
            'Pbx': 'Photobox'
          }
        }
      },
      'description': 'Information about the pictures of the device.'
    }
  },
  'groups': {
    'depth': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
    },
    '_settings': {
      'parent': 'Thing',
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
      'url': 'group'
    },
    'toOrganization': {
      'type': 'string',
      'readonly': true,
      'doc': 'Materialization of the organization that, by the time of the allocation, the user worked in.',
      'materialized': true
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
    'weight': {
      'type': 'float',
      'unitCode': 'KGM',
      'teaser': false,
      'sink': -1
    },
    'type': {
      'type': 'string',
      'allowed': [
        'Warehouse',
        'CollectionPoint',
        'Zone',
        'Department'
      ]
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
        'Pallet',
        'IncomingLot',
        'Group',
        'OutgoingLot',
        'Place',
        'Physical',
        'Abstract',
        'Lot',
        'Package'
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
    'telephone': {
      'type': 'string'
    },
    'width': {
      'type': 'float',
      'unitCode': 'MTR',
      'teaser': false,
      'sink': -1
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
    },
    'geo': {
      'type': 'polygon',
      'modifiable': false,
      'description': 'Set the area of the place. Be careful! Once set, you cannot update the area.',
      'sink': -5
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
  'route': 'schema',
  'reqParams': null,
  'restangularized': true,
  'fromServer': true,
  '_links.parent.href': null,
  'restangularCollection': false
}
