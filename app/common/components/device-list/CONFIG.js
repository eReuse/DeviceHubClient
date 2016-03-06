'use strict';

var Case = require('case');

var CONFIG = (function(){
    return {
        defaultSearchParams: [
            {key: "_id", name: "id", placeholder: "id..."},
            {key: "label", name: "Label", placeholder: "Label..."},
            {key: "hid", name: "hid", placeholder: "Hid..."},
            {
                key: "@type", name: "Type", methods: [Case.pascal],
                select: ['Computer', 'Peripheral', 'Monitor', 'Mobile', 'Hard Drive', 'Network Adapter', 'Optical Drive', 'Sound Card', 'Graphic Card', 'Ram Module', 'Motherboard', 'Processor']
            },
            {
                key: 'type', name: "Computers", methods: [Case.pascal],
                select: ['Desktop', 'Laptop', 'Netbook', 'Server', 'Microtower']
            },
            {
                key: 'type', name: "Peripherals", methods: [Case.pascal],
                select: ['Router', 'Switch', 'Printer', 'Scanner', 'Multifunction printer', 'Terminal', 'HUB', 'SAI', 'Keyboard', 'Mouse']
            },
            {
                key: 'type', name: "Monitors", methods: [Case.pascal],
                select: ['TFT', 'LCD']
            },
            {
                key: 'type', name: "Mobiles", methods: [Case.pascal],
                select: ['Smartphone', 'Tablet']
            },
            {key: 'serialNumber', name: 'Serial Number', placeholder: "S/N..."},
            {key: 'model', name: 'Model', placeholder: 'Vaio...'},
            {key: 'manufacturer', name: 'Manufacturer', placeholder: 'Apple...'},
            {key: 'parent', name: 'Components of', placeholder: 'Identifier of the computer'},
            // { key: 'totalMemory', name: 'Total of RAM', placeholder: "In Gigabytes..."},
            //{ key: 'event', name: 'Type of event', placeholder: "Devices with this event..."}, todo
            // { key: 'byUser', name: 'Author', placeholder: "email or name of the author..."}, //todo
            // { key: '_created', name: 'Registered in', placeholder: "YYYY-MM-DD" },
            // { key: '_updated', name: 'Last updated in', placeholder: "YYYY-MM-DD"},
            {
                key: '_created',
                name: 'Registered in before or eq',
                date: true,
                comparison: '<=',
                placeholder: 'This way: 2016-01-01'
            },  //todo
            {
                key: '_createdAfter',
                name: 'Registered in after or eq',
                date: true,
                comparison: '>=',
                realKey: '_created',
                placeholder: 'This way: 2016-01-01'
            } //todo
        ]
    };
}());

module.exports = CONFIG;