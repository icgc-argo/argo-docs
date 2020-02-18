module.exports = {
  name: 'sample_registration',
  required: true,
  fields: [{ name: 'program_id', required: true }],
  children: [
    {
      name: 'specimen',
      required: true,
      fields: [{ name: 'specimen_submitter_id', required: true }],
    },
  ],
};
