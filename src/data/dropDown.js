
const selectOptions = {
    bpSubPortfolio: [
      { value: '', label: 'Select a SubPortfolio' },
    { value: 'M&C (CandP2 (B2C))', label: 'M&C (CandP2 (B2C))' },
    { value: 'Pulse (CandP1 (Pulse))', label: 'Pulse (CandP1 (Pulse))' },
    { value: 'Aviation', label: 'Aviation' },
    { value: 'Fleet', label: 'Fleet' },
    { value: 'Castrol', label: 'Castrol' },
    { value: 'Sustainability', label: 'Sustainability' },
    { value: 'CRM', label: 'CRM' },
    ],
    contractType: [
      { value: '', label: 'Select a Contract Type' },
      { value: 'Milestone', label: 'Milestone' },
      { value: 'FullTeam', label: 'FullTeam' },
      { value: 'Resources', label: 'Resources' },
      { value: 'Sustain', label: 'Sustain' },
    ],
    teamType: [
      { value: '', label: 'Select a Team Type' },
      { value: 'DevOps', label: 'DevOps' },
      { value: 'OpsDev', label: 'OpsDev' },
      { value: 'Ops', label: 'Ops' },
      { value: 'Dev', label: 'Dev' }
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

    