module.exports = {
  name: 'sample_registration',
  required: true,
  fields: [{ name: 'program_id', required: true }],
  children: [
    {
      name: 'specimen',
      fields: [{ name: 'specimen_submitter_id', required: true }],
      children: [
        {
          name: 'donor',
          required: true,
          fields: [{ name: 'donor_submitter_id', required: true }],
          children: [
            {
              name: 'treatment',
              required: true,
              fields: [{ name: 'donor_submitter_id', required: true }],
              children: [
                {
                  name: 'hormone_therapy',
                  required: true,
                  fields: [{ name: 'program_id', required: true }],
                  children: [],
                },
                {
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
