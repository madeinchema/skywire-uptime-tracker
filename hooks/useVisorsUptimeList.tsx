import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { VisorUptime } from '../interfaces';
import { saveVisorsUptimeData } from '../state/slices/visorsUptimeSlice';
import { getVisorsList } from '../utils/functions/getVisorsList';

const useVisorsUptimeList = () => {
  const [visorsUptimeList, setVisorsUptimeList] = useState<
    VisorUptime[] | undefined
  >(undefined);
  const visorsUptimeListFromStore = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  );
  const dispatch = useDispatch();
  const USE_FAKE_DATA = true;

  useEffect(() => {
    if (visorsUptimeListFromStore.length < 1) {
      getVisorsList(USE_FAKE_DATA).then((data) =>
        dispatch(saveVisorsUptimeData(data))
      );
    }
  }, []);

  useEffect(() => {
    setVisorsUptimeList(visorsUptimeListFromStore);
  }, [visorsUptimeListFromStore]);

  const handlers = React.useMemo(
    () => ({
      handleVisorsUptimeList: (): void => console.log('handleVisorsUptimeList'),
    }),
    []
  );

  return { visorsUptimeList, handlers };
};

export default useVisorsUptimeList;
