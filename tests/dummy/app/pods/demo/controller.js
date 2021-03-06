import Ember from 'ember'

export default Ember.Controller.extend({
  selected: {},
  actionBarItems: [
    {label: 'Details', id: 'details', enabled: false},
    {label: 'Delete', id: 'delete', enabled: false},
    {label: 'Edit', id: 'edit', enabled: false}
  ],

  viewSchema: {
    low: {
      'version': '1.0',
      'type': 'form',
      'rootContainers': [
        {'label': 'Main', 'container': 'main'}
      ],
      'containers': [
        {
          'id': 'main',
          'className': 'flex-row',
          'rows': [
            [
              {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ],
            [
              {
                'model': 'updatedAt',
                'label': 'Last Updated',
                'labelClassName': 'ob-label',
                'inputClassName': 'ob-input'
              }
            ]
          ]
        }
      ]
    },
    medium: {
      'version': '1.0',
      'type': 'form',
      'rootContainers': [
        {'label': 'Main', 'container': 'main'}
      ],
      'containers': [
        {
          'id': 'main',
          'className': 'flex-row',
          'rows': [
            [
              {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
              {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ],
            [
              {
                'model': 'updatedAt',
                'label': 'Last Updated',
                'labelClassName': 'ob-label',
                'inputClassName': 'ob-input'
              }
            ]
          ]
        }
      ]
    },
    high: {
      'version': '1.0',
      'type': 'form',
      'rootContainers': [
        {'label': 'Main', 'container': 'main'}
      ],
      'containers': [
        {
          'id': 'main',
          'className': 'flex-row',
          'rows': [
            [
              {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
              {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ],
            [
              {
                'model': 'updatedAt',
                'label': 'Last Updated',
                'labelClassName': 'ob-label',
                'inputClassName': 'ob-input'
              },
              {'model': 'id', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ]
          ]
        }
      ]
    }
  },

  actions: {
    onCreate () {
      window.alert('One does not merely create things')
    },

    onOptionSelected: function () {
      let selected = this.get('selected')
      console.log('Facet changed')
      const facet = arguments[0]
      if (facet.value.length === 0) {
        delete selected[facet.id]
      } else {
        selected[facet.id] = facet.value
      }
      this.set('selected', selected)
    },

    onRowSelect (allSelected, newSelected, deSelected) {
      if (allSelected.length === 1) {
        this.set('actionBarItems', [
          {label: 'Details', id: 'details', enabled: true},
          {label: 'Delete', id: 'delete', enabled: true},
          {label: 'Edit', id: 'edit', enabled: true}
        ])
      } else if (allSelected.length > 1) {
        this.set('actionBarItems', [
          {label: 'Details', id: 'details', enabled: false},
          {label: 'Delete', id: 'delete', enabled: true},
          {label: 'Edit', id: 'edit', enabled: false}
        ])
      } else {
        this.set('actionBarItems', [
          {label: 'Details', id: 'details', enabled: false},
          {label: 'Delete', id: 'delete', enabled: false},
          {label: 'Edit', id: 'edit', enabled: false}
        ])
      }
    },

    onActionClick (buttonId, selectedItems) {
      const ids = selectedItems.map((si) => si.get('id')).join(', ')
      if (buttonId === 'delete') {
        selectedItems.forEach((item) => {
          item.destroyRecord()
        })
      } else {
        window.alert(`clicked ${buttonId} for ${ids}`)
      }
    }
  }
})
