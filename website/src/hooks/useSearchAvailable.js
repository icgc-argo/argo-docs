const useSearchAvailable = () =>
  !process.env.ALGOLIA_API_KEY || !process.env.ALGOLIA_INDEX ? false : true;

export default useSearchAvailable;
