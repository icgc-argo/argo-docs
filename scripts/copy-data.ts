import sh from 'shelljs';

const websiteDir = '../website/static/data';

/**
 * copy generated data into website dir for static build
 */
const copyData = () => {
  sh.rm('-r', `${websiteDir}/*`);
  sh.cp('-R', `./data/`, websiteDir);
};

copyData();
