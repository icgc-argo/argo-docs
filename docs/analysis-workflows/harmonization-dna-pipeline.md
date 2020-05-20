---
id: dna-pipeline
title: DNA-Seq Analysis Pipeline
---

The DNA-Seq analysis pipeline identifies various somatic variant types within Whole Exome Sequencing (WXS) and Whole Genome Sequencing (WGS) data. The pipeline starts with a reference alignment step followed by co-cleaning to increase the alignment quality. DNA-Seq analysis is implemented across two main procedures:

- Sequence Alignment
- Variant Calling

In the future, these procedures will be extended to include:

- Variant Masking
- Variant Annotation
- Concensus Calling

## Alignment

Before genomes can be compared for variant analysis, they must be aligned to a reference genome. In addition to alignment, this step includes some data cleanup operations that correct for technical biases and makes the data suitable for analysis.

The alignment step uses:

- **[BWA-MEM version 0.7.17-r1188](http://bio-bwa.sourceforge.net/)** as its main aligner
- **[Biobambam version xxx](https://www.sanger.ac.uk/science/tools/biobambam)** to mark duplicates.
- **[GRCh38 HL7](need link)** as the reference genome

//INSERT ALIGNMENT DIAGRAM//

The latest version of the ARGO alignment workflow can be found [here](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).

## Variant Calling

The ARGO DNA Seq pipeline has adoptd the Sanger Variant Calling docker.

//INSERT Variant Calling DIAGRAM//

The latest version of the ARGO Variant Calling workflow can be found [here](https://github.com/icgc-argo/dna-seq-processing-wfs/releases).
