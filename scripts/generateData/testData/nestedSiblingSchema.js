module.exports = {
  schemas: [
    {
      name: 'donor',
      required: true,
      description: 'donor description',
      meta: { parent: 'specimen' },
      fields: [
        {
          name: 'program_id',
          valueType: 'string',
          description: 'Unique identifier of the ARGO program.',
          restrictions: { required: true },
        },
      ],
    },
    {
      name: 'treatment',
      required: true,
      description: 'treatment description',
      meta: { parent: 'donor' },
      fields: [
        {
          name: 'donor_submitter_id',
          restrictions: { required: true },
        },
      ],
    },
    {
      name: 'specimen',
      description:
        "The collection of data elements related to a donor's specimen. A specimen is any material sample taken for testing, diagnostic or research purposes.",
      meta: { parent: 'sample_registration' },
      fields: [
        {
          name: 'specimen_submitter_id',
          valueType: 'string',
          description: 'dummy description',
          restrictions: { required: true },
        },
      ],
    },
    {
      name: 'sample_registration',
      required: true,
      description:
        'The collection of elements required to register the required Donor-Specimen-Sample data to the ARGO Platform. Registration of samples is required before genomic and clinical data submission can proceed.',
      fields: [
        {
          name: 'program_id',
          valueType: 'string',
          description: 'Unique identifier of the ARGO program.',
          meta: { primaryId: true, examples: 'PACA-AU,BR-CA' },
          restrictions: { required: true },
        },
      ],
    },
    {
      name: 'hormone_therapy',
      description:
        'The collection of data elements describing the details of a hormone treatment therapy completed by a donor.',
      meta: { parent: 'treatment' },
      required: true,
      fields: [
        {
          name: 'program_id',
          valueType: 'string',
          description: 'Unique identifier of the ARGO program.',
          meta: {
            primaryId: true,
            foreignKey: 'sample_registration.program_id',
          },
          restrictions: { required: true },
        },
      ],
    },
    {
      name: 'radiation',
      description:
        'The collection of data elements describing the details of a radiation treatment completed by a donor.',
      meta: { parent: 'treatment' },
      fields: [
        {
          name: 'program_id',
          valueType: 'string',
          description: 'Unique identifier of the ARGO program.',
          meta: {
            primaryId: true,
            foreignKey: 'sample_registration.program_id',
          },
          restrictions: { required: true },
        },
      ],
    },
  ],
  _id: '5e2b5e9fddb15a002e11d9c4',
  name: 'ICGC-ARGO Data Dictionary',
  version: '0.2',
  createdAt: '2020-01-24T21:16:15.775Z',
  updatedAt: '2020-01-24T21:16:15.775Z',
  __v: 0,
};
