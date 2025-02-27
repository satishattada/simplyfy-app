
const selectOptions = {
    bpSubPortfolio: [
      { value: '', label: 'Select a SubPortfolio' },
    { value: 'mandc', label: 'M&C (CandP2 (B2C))' },
    { value: 'pulse', label: 'Pulse (CandP1 (Pulse))' },
    { value: 'aviation', label: 'Aviation' },
    { value: 'fleet', label: 'Fleet' },
    { value: 'castrol', label: 'Castrol' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'crm', label: 'CRM' },
    ],
    contractType: [
      { value: '', label: 'Select a Contract Type' },
      { value: 'milestone', label: 'Milestone' },
      { value: 'fullTeam', label: 'FullTeam' },
      { value: 'resources', label: 'Resources' },
      { value: 'sustain', label: 'Sustain' },
    ],
    teamType: [
      { value: '', label: 'Select a Team Type' },
      { value: 'devops', label: 'DevOps' },
      { value: 'opsdev', label: 'OpsDev' },
      { value: 'ops', label: 'Ops' },
      { value: 'dev', label: 'Dev' }
    ],
    contractCurrency: [
      { value: '', label: 'Select a Currency' },
      { value: 'USD', label: 'USD' },
      { value: 'AUD', label: 'AUD' },
      { value: 'GBP', label: 'GBP' },
      { value: 'EUR', label: 'EUR' }
    ] ,
    PORevision: [
      { value: '', label: 'Select a PO Revision' },
      { value: 'Original', label: 'Original' },
      { value: 'Rev1', label: 'Rev1' },
      { value: 'Rev2', label: 'Rev2' },
    ],
    revenueType: [
      { value: '', label: 'Select a Revenue Type' },
      { value: 'Capex', label: 'Capex' },
      { value: 'Opex', label: 'Opex' },
      { value: 'Revex', label: 'Revex' },
    ],
    infosysContractType: [
      { value: '', label: 'Select a Contract Type' },
      { value: 'FP', label: 'FP' },
      { value: 'T&M', label: 'T&M' },
      { value: 'UOM', label: 'UOM' },
    ]
  };

  export default selectOptions;

    