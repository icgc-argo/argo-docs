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
  docs: [
    {
      type: 'category',
      label: 'Submission',
      collapsed: true,
      items: [
        'submission/submission-overview',
        'submission/dictionary-overview',
        'submission/registering-samples',
        'submission/clinical-data-validation-rules',
        'submission/submitting-clinical-data',
        'submission/viewing-clinical-data',
        'submission/molecular-data-prep',
        'submission/submitting-molecular-data',
        'submission/submitted-data',
        'submission/managing-program-access',
        'submission/faq',
      ],
    },
    {
      type: 'category',
      label: 'Data Access',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'ICGC DACO',
          collapsed: false,
          items: [
            'data-access/daco/applying',
            'data-access/daco/lay-summary-guide',
            'data-access/daco/approval',
            'data-access/daco/renew-close',
            'data-access/daco/daco-faq',
          ],
        },
        {
          type: 'category',
          label: 'ICGC ARGO',
          collapsed: false,
          items: [
            'data-access/data-download',
            'data-access/user-profile-and-api-token',
            'data-access/programmatic-apis',
            'data-access/publication-guidelines',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Analysis Pipelines',
      collapsed: true,
      items: [
        {
          type: 'doc',
          label: 'Overview',
          id: 'analysis-workflows/analysis-overview',
        },
        {
          type: 'category',
          label: 'DNA-Seq Analysis',
          collapsed: false,
          items: [
            'analysis-workflows/dna-alignment',
            'analysis-workflows/dna-sanger-wgs-vc',
            'analysis-workflows/dna-sanger-wxs-vc',
            'analysis-workflows/dna-gatk-mutect2-vc',
            'analysis-workflows/dna-open-access-filtering',
          ],
        },
        {
          type: 'category',
          label: 'RNA-Seq Analysis',
          collapsed: false,
          items: ['analysis-workflows/rna-alignment'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Data and File Types',
      collapsed: true,
      items: [
        'data/reads',
        'data/variant-calls',
        'data/qc-metrics',
        'data/transcriptome-profiling',
      ],
    },
    {
      type: 'category',
      label: 'Release Notes',
      collapsed: true,
      items: [
        'release-notes/data-releases',
        'release-notes/software-releases',
        'release-notes/dictionary-releases',
      ],
    },
  ],
};
