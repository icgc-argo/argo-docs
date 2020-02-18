module.exports = {
  dictionary: {
    schemas: [
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
    ],
    _id: '5e2b5e9fddb15a002e11d9c4',
    name: 'ICGC-ARGO Data Dictionary',
    version: '0.2',
    createdAt: '2020-01-24T21:16:15.775Z',
    updatedAt: '2020-01-24T21:16:15.775Z',
    __v: 0,
  },
  versions: ['0.2'],
  currentVersion: '0.2',
};
