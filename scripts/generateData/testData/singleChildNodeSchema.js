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

module.exports = {
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
  ],
  _id: '5e2b5e9fddb15a002e11d9c4',
  name: 'ICGC-ARGO Data Dictionary',
  version: '0.2',
  createdAt: '2020-01-24T21:16:15.775Z',
  updatedAt: '2020-01-24T21:16:15.775Z',
  __v: 0,
};
