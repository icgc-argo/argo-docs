module.exports = {
  name: 'sample_registration',
  required: true,
  fields: [{ name: 'program_id', required: true }],
  parentName: '',
  children: [
    {
      name: 'specimen',
      fields: [{ name: 'specimen_submitter_id', required: true }],
      parentName: 'sample_registration',
      required: false,
      children: [
        {
          name: 'donor',
          required: true,
          parentName: 'specimen',
          fields: [{ name: 'donor_submitter_id', required: true }],
          children: [],
        },
      ],
    },
  ],
};
