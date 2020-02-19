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
          parentName: 'specimen',
          required: true,
          fields: [{ name: 'donor_submitter_id', required: true }],
          children: [
            {
              name: 'treatment',
              parentName: 'donor',
              required: true,
              fields: [{ name: 'donor_submitter_id', required: true }],
              children: [
                {
                  parentName: 'treatment',
                  name: 'hormone_therapy',
                  required: true,
                  fields: [{ name: 'program_id', required: true }],
                  children: [],
                },
                {
                  required: false,
                  parentName: 'treatment',
                  name: 'radiation',
                  fields: [{ name: 'program_id', required: true }],
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
