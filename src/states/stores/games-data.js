import { apiBaseUrl, fetchApi } from "@/utils/fetchApi";
import useStore from "swr-global-state";
import localStoragePersistor from '../persistors/local-storage';

const KEY = "@app/games";

function useGamesData() {
  const [loading, setLoading] = useStore({
    key: `${KEY}-loading`,
    initial: true
  });
  const [zipcode, setZipcode] = useStore({
    key: `${KEY}-zipcode`,
    initial: 0,
    persistor: localStoragePersistor
  });
  const [games, setGames, swrDefaultResponse] = useStore(
    {
      key: KEY,
      initial: null,
      persistor: {
        onSet: localStoragePersistor.onSet,
        onGet: async(key) => {
            try {
                if (window.navigator.onLine && zipcode) {
                    const remoteGames = await fetchApi({url : `${apiBaseUrl}/games/${zipcode}/1/24`, method : 'GET'});
                    if (remoteGames && remoteGames.data?.games != null && remoteGames.data?.games != '') {
                      localStoragePersistor.onSet(key, remoteGames.data.games);
                      return remoteGames.data.games;
                    }
                    remoteGames.data.message = remoteGames?.message;
                    return remoteGames.data;
                }
                const cachedGames = localStoragePersistor.onGet(key);
                setLoading(false);
                return cachedGames;
            } catch (err) {
                if (window.navigator.onLine) {
                  if (err?.status !== 401) {
                    console.log('An error occured, returned cached data');
                    console.log(err)
                  } else {
                    throw err;
                  }
                }
                const cachedGames = localStoragePersistor.onGet(key);
                return cachedGames;
              } finally {
                setLoading(false);
            }
        }
      }
    },
    {
      /**
       * set another SWR config here
       * revalidateOnFocus: false
       * revalidateOnReconnect: false
       * refreshWhenHidden: false
       * refreshWhenOffline: false
       */
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );

  /**
   * Destructuring response from SWR Default response
   */
  const { mutate, error } = swrDefaultResponse;

  const destroyGamesData = async () => {
    setLoading(true);
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(`${KEY}-zipcode`);
    // use default `mutate` from SWR to avoid `onSet` callback in `persistor`
    mutate(null);
    setLoading(false);
  };

  const updateGamesData = async (newZipcode, result) => {
    setLoading(true);
    const newGamesData = await fetchApi({url : `${apiBaseUrl}/games/${newZipcode}/1/24`, method : 'GET'});
    if (newGamesData && newGamesData.data?.games != null && newGamesData.data?.games != '') {
      setGames(newGamesData.data.games)
      localStoragePersistor.onSet(KEY, newGamesData.data.games);
      setLoading(false);
      result(null,newGamesData)
    }
    else{
      const cachedGames = localStoragePersistor.onGet(KEY)
      cachedGames && cachedGames.affiliate ? setZipcode(Number(cachedGames.affiliate.zipcode)) : setZipcode(0)
      setLoading(false);
      result(newGamesData,null)
    }
  };

  // custom mutator/dispatcher

  return {
    loading,
    error,
    zipcode,
    setZipcode,
    games,
    destroyGamesData,
    updateGamesData
  };
}

export default useGamesData;