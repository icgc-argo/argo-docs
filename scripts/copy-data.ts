import sh from 'shelljs';

const websiteDir = '../website/static/data';

/**
 * copy generated data into website dir for static build
 */
const copyData = () => {
  const isDev = process.env.IS_DEV;
  sh.rm('-r', `${websiteDir}/*`);
  sh.cp('-R', `./data/${isDev ? 'test' : 'prod'}/*`, websiteDir);
};

copyData();
