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
      children: [],
      parentName: 'sample_registration',
      required: false,
    },
  ],
};
