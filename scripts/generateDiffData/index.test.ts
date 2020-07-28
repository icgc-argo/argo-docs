/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */

import * as chai from 'chai';
import diff from './testdata/diff.json';
import generateDiffChanges from '.';
import * as fse from 'fs-extra';

const expect = chai.expect;

const expectedResult = {
  sample_registration: {
    deleted: [
      {
        program_id: {
          name: 'program_id',
          valueType: 'string',
          description: 'Unique identifier of the ARGO program.',
          meta: {
            validationDependency: true,
            primaryId: true,
            examples: 'TEST-CA',
            notes:
              'This is the unique id that is assigned to your program.  If you have logged into the platform, this is the Program Id that you see in the Program Services area. For example, TEST-CA is a Program ID.',
            displayName: 'Program ID',
          },
          restrictions: {
            required: true,
          },
        },
      },
      {
        submitter_donor_id: {
          name: 'submitter_donor_id',
          valueType: 'string',
          description: 'Unique identifier of the donor, assigned by the data provider.',
          meta: {
            validationDependency: true,
            primaryId: true,
            examples: '90234,BLD_donor_89,AML-90',
            displayName: 'Submitter Donor ID',
            notes:
              'To prevent data collisions, submitter_id cannot begin with any of the ARGO ID prefixes.  The restricted prefixes include: `DO`, `SP`, `SA`,`TR`,`FU`, `PD`.',
          },
          restrictions: {
            required: true,
            regex:
              '\\b(?!([Dd][Oo])|([Ss][Pp])|([Ss][Aa])|([Tt][Rr])|([pP][Dd])|([Ff][Uu]))\\b^[A-Za-z0-9\\-\\._]{1,64}',
          },
        },
      },
    ],
    created: [
      {
        updated_submitter_donor_id: {
          name: 'updated_submitter_donor_id',
          valueType: 'string',
          description: 'better Unique identifier of the donor, assigned by the data provider.',
          meta: {
            validationDependency: false,
            primaryId: false,
            examples: 'good dexamples 90234,BLD_donor_89,AML-90',
            displayName: 'Submitter Donor ID Display',
            notes:
              'Edited this, To prevent data collisions, submitter_id cannot begin with any of the ARGO ID prefixes.  The restricted prefixes include: `DO`, `SP`, `SA`,`TR`,`FU`, `PD`.',
          },
          restrictions: {
            required: false,
            regex:
              '\\b(?!([Ss][Pp])|([Ss][Aa])|([Tt][Rr])|([pP][Dd])|([Ff][Uu]))\\b^[A-Za-z0-9\\-\\._]{1,64}',
          },
        },
      },
    ],
    updated: {
      gender: {
        description: {
          left:
            'Description of the donor self-reported gender. Gender is described as the assemblage of properties that distinguish people on the basis of their societal roles.',
          right: 'needs to be here ',
        },
      },
      specimen_tissue_source: {},
      tumour_normal_designation: {},
      specimen_type: {},
      submitter_sample_id: {},
      sample_type: {},
    },
  },
  donor: {
    created: [],
    deleted: [
      {
        program_id: {
          name: 'program_id',
          valueType: 'string',
          description: 'Unique identifier of the ARGO program.',
          meta: {
            validationDependency: true,
            primaryId: true,
            foreignKey: 'sample_registration.program_id',
            displayName: 'Program ID',
          },
          restrictions: {
            required: true,
          },
        },
      },
      {
        submitter_donor_id: {
          description: 'Unique identifier of the donor, assigned by the data provider.',
          name: 'submitter_donor_id',
          valueType: 'string',
          meta: {
            validationDependency: true,
            primaryId: true,
            foreignKey: 'sample_registration.submitter_donor_id',
            displayName: 'Submitter Donor ID',
            notes:
              'To prevent data collisions, submitter_id cannot begin with any of the ARGO ID prefixes.  The restricted prefixes include: `DO`, `SP`, `SA`,`TR`,`FU`, `PD`.',
          },
          restrictions: {
            required: true,
            regex:
              '\\b(?!([Dd][Oo])|([Ss][Pp])|([Ss][Aa])|([Tt][Rr])|([pP][Dd])|([Ff][Uu]))\\b^[A-Za-z0-9\\-\\._]{1,64}',
          },
        },
      },
      {
        vital_status: {
          description: "Donor's last known state of living or deceased.",
          name: 'vital_status',
          restrictions: {
            codeList: ['Alive', 'Deceased', 'Unknown'],
            required: true,
          },
          valueType: 'string',
          meta: {
            validationDependency: true,
            core: true,
            displayName: 'Vital Status',
          },
        },
      },
      {
        cause_of_death: {
          description: "Indicate the cause of a donor's death.",
          name: 'cause_of_death',
          restrictions: {
            codeList: ['Died of cancer', 'Died of other reasons', 'Unknown'],
            script: [
              '(function validate() {\n        let result = {valid: true, message: "Ok"};\n        const currField = typeof($field) === \'string\' ? $field.trim().toLowerCase() : $field;\n        const vitalStatus = $row.vital_status.trim().toLowerCase();\n    \n        if (!currField && vitalStatus === "deceased"){\n            result = {valid: false, message: `${$name} must be provided when the donor\'s vital_status is deceased.`}\n        }\n        else if (currField && vitalStatus != "deceased"){\n            result = {valid: false, message: `${$name} cannot be provided if the donor\'s vital_status is not deceased.`}\n        }\n        return result;\n    })()',
            ],
          },
          valueType: 'string',
          meta: {
            core: true,
            dependsOn: 'donor.vital_status',
            notes:
              "Cause of death is only required to be submitted if the donor's vital_status is Deceased.",
            displayName: 'Cause of Death',
          },
        },
      },
      {
        survival_time: {
          description:
            'Interval of how long the donor has survived since primary diagnosis, in days.',
          name: 'survival_time',
          valueType: 'integer',
          meta: {
            dependsOn: 'donor.vital_status',
            notes:
              "Survival_time is only required to be submitted if the donor's vital_status is Deceased.",
            validationDependency: true,
            units: 'days',
            core: 'true',
            displayName: 'Survival Time',
          },
          restrictions: {
            script: [
              '(function validate() {\n        let result = {valid: true, message: "Ok"};\n        const currField = typeof($field) === \'string\' ? $field.trim().toLowerCase() : $field;\n        const vitalStatus = $row.vital_status.trim().toLowerCase();\n    \n        if (!currField && vitalStatus === "deceased"){\n            result = {valid: false, message: `${$name} must be provided when the donor\'s vital_status is deceased.`}\n        }\n        else if (currField && vitalStatus != "deceased"){\n            result = {valid: false, message: `${$name} cannot be provided if the donor\'s vital_status is not deceased.`}\n        }\n        return result;\n    })()',
            ],
          },
        },
      },
      {
        primary_site: {
          name: 'primary_site',
          valueType: 'string',
          description:
            "The text term used to describe the primary site of disease, as categorized by the World Health Organization's (WHO) International Classification of Diseases for Oncology (ICD-O). This categorization groups cases into general categories.",
          meta: {
            displayName: 'Primary Site',
            core: true,
          },
          restrictions: {
            required: true,
            codeList: ['Accessory sinuses', 'Adrenal gland', 'Vulva', 'Unknown'],
          },
        },
      },
      {
        prior_malignancy: {
          description: 'Prior malignancy affecting donor.',
          name: 'prior_malignancy',
          restrictions: {
            codeList: ['Yes', 'No', 'Unknown'],
          },
          valueType: 'string',
          meta: {
            displayName: 'Prior Malignancy',
            examples: 'C41.1, C16.9, C00.5, D46.9',
          },
        },
      },
      {
        cancer_type_prior_malignancy: {
          description:
            'The code to represent the cancer type of a prior malignancy using the WHO ICD-10 code (https://icd.who.int/browse10/2019/en) classification.',
          name: 'cancer_type_prior_malignancy',
          restrictions: {
            regex: '^[C|D][0-9]{2}(.[0-9]{1,3}[A-Z]{0,1})?$',
          },
          valueType: 'string',
          meta: {
            displayName: 'Cancer Type Prior Malignancy',
          },
        },
      },
      {
        age_at_prior_malignancy: {
          description:
            'If donor has history of prior malignancy, indicate age at previous diagnosis, in years.',
          name: 'age_at_prior_malignancy',
          valueType: 'integer',
          meta: {
            displayName: 'Age at Prior Malignancy',
          },
        },
      },
      {
        laterality_of_prior_malignancy: {
          description:
            'If donor has history of prior malignancy, indicate laterality of previous diagnosis. (Codelist reference: NCI CDE: 4122391)',
          name: 'laterality_of_prior_malignancy',
          valueType: 'string',
          restrictions: {
            codeList: ['Bilateral', 'Left', 'Unknown'],
          },
          meta: {
            displayName: 'Laterality at Prior Malignancy',
          },
        },
      },
      {
        height: {
          description: "Indicate the donor's height, in centimeters (cm).",
          name: 'height',
          valueType: 'integer',
          meta: {
            displayName: 'Height',
          },
        },
      },
      {
        weight: {
          description: "Indicate the donor's weight, in kilograms (kg).",
          name: 'weight',
          valueType: 'integer',
          meta: {
            displayName: 'Weight',
          },
        },
      },
      {
        bmi: {
          description: "Indicate the donor's Body Mass Index (BMI) in kg/m².",
          name: 'bmi',
          valueType: 'integer',
          meta: {
            displayName: 'BMI',
          },
        },
      },
      {
        menopause_status: {
          description:
            "Indicate the donor's menopause status at the time of primary diagnosis. (Codelist reference: NCI CDE ID: 2434914)",
          name: 'menopause_status',
          restrictions: {
            codeList: [
              'Indeterminate or unknown',
              'Not applicable',
              'Perimenopausal',
              'Postmenopausal',
              'Premenopausal',
            ],
          },
          valueType: 'string',
          meta: {
            displayName: 'Menopause Status',
          },
        },
      },
      {
        age_at_menarche: {
          description:
            "Indicate the donor's age of menarche, the first occurrence of menstruation.",
          name: 'age_at_menarche',
          valueType: 'integer',
          meta: {
            displayName: 'Age at Menarche',
          },
        },
      },
      {
        number_of_pregnancies: {
          description: 'Indicate the number of pregnancies a donor has had.',
          name: 'number_of_pregnancies',
          valueType: 'integer',
          meta: {
            displayName: 'Number of Pregnancies',
          },
        },
      },
      {
        number_of_children: {
          description: 'Indicate the number of children the donor has birthed.',
          name: 'number_of_children',
          valueType: 'integer',
          meta: {
            displayName: 'Number of Children',
          },
        },
      },
    ],

    updated: {},
  },
};

// write own diff change because js-lectern-client has too many steps, generating one object just to dismantle
describe('Diff data', () => {
  it('should generate change object for a schema diff', () => {
    const result = generateDiffChanges(diff);
    fse.writeJSONSync('./test.json', result);
    expect(result).to.deep.eq(expectedResult);
  });

  /*  it('should generate diff mapping for documentation display', () => {
    const result = x(schemaDiff);
    fse.writeJSONSync('./changes.json', result);
    expect(true);
  }); */
});
